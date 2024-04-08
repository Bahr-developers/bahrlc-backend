import {
    ConflictException,
    Injectable,
    UnprocessableEntityException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model, isValidObjectId } from 'mongoose';
  import { Translate, TranslateService } from '../translate';
  import { CreateCareerInterface, UpdateInterfaceRequest } from './interfaces';
  import { Career } from './schema';
  
  @Injectable()
  export class CareerService {
    constructor(
      @InjectModel(Career.name) private readonly careerModel: Model<Career>,
      @InjectModel(Translate.name) private readonly translateModel: Model<Translate>,
      private readonly service: TranslateService
    ) {}
  
    async createCareer(payload: CreateCareerInterface): Promise<void> {
      await this.#_checkExistingCareer(payload.name);
      await this.checkTranslate(payload.name)
      await this.checkTranslate(payload.description)
  
      const newCareer = await this.  careerModel
.create({
        name: payload.name,
        description: payload.description
      });
  
      await this.translateModel.findByIdAndUpdate(
        {
          _id: payload.name,
        },
        {
          status: 'active',
        },
      )
      await this.translateModel.findByIdAndUpdate(
        {
          _id: payload.description,
        },
        {
          status: 'active',
        },
      );
  
      newCareer.save();
    }
  
    async getCareerList(languageCode:string): Promise<Career[]> {
      const data =  await this.  careerModel

        .find()
        .select('description name')
        .exec();
  
      let result = []
      for(let x of data){
        
        const name_request = {
          translateId:x.name.toString(),
          languageCode:languageCode
        }
  
        const description_request = {
          translateId:x.description.toString(),
          languageCode:languageCode
        }
        
        const translated_name = await this.service.getSingleTranslate(name_request)
        const translated_description = await this.service.getSingleTranslate(description_request)
  
        result.push({id:x._id, name:translated_name.value, description:translated_description.value})
      }
       return result
    }
  
  
    async updateCareer(payload: UpdateInterfaceRequest): Promise<void> {
      await this.checkCareer(payload.id);
  
      await this.  careerModel
.findByIdAndUpdate(
        {
          _id: payload.id,
        },
        {
          name: payload.name,
          description: payload.description
        },
      );
    }
  
    async deleteCareer(id: string): Promise<void> {
      await this.checkCareer(id);
  
      await this.  careerModel
.findByIdAndDelete({ _id: id });
    }
  
    
  
    async #_checkExistingCareer(name: string): Promise<void> {
      const exisitingname = await this.  careerModel
.findOne({
      name,
      })}
  
  
    async checkCareer(id: string): Promise<void> {
      await this.#_checkId(id);
      const service = await this.  careerModel
.findById(id);
  
      if (!service) {
        throw new ConflictException(`Service with ${id} is not exists`);
      }
    }
  
    async checkTranslate(id: string): Promise<void> {
      await this.#_checkId(id);
      const translate = await this.translateModel.findById(id);
  
      if (!translate) {
        throw new ConflictException(`Translate with ${id} is not exists`);
      }
    }
  
    async #_checkId(id: string): Promise<void> {
      const isValid = isValidObjectId(id);
      if (!isValid) {
        throw new UnprocessableEntityException(`Invalid ${id} Object ID`);
      }
    }
  }