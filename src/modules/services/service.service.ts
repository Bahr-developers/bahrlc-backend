import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { GetSingleTranslateRequest, Translate, TranslateService } from '../translate';
import { CreateServiceInterface, UpdateInterfaceRequest } from './interfaces';
import { Service } from './schemas';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service.name) private readonly serviceModel: Model<Service>,
    @InjectModel(Translate.name) private readonly translateModel: Model<Translate>,
    private readonly service: TranslateService
  ) {}

  async createService(payload: CreateServiceInterface): Promise<void> {
    await this.#_checkExistingService(payload.name);
    await this.checkTranslate(payload.name)
    await this.checkTranslate(payload.description)

    const newService = await this.serviceModel.create({
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

    newService.save();
  }

  async getServiceList(languageCode:string): Promise<Service[]> {
    const data =  await this.serviceModel
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


  async updateService(payload: UpdateInterfaceRequest): Promise<void> {
    await this.checkService(payload.id);

    await this.serviceModel.findByIdAndUpdate(
      {
        _id: payload.id,
      },
      {
        name: payload.name,
        description: payload.description
      },
    );
  }

  async deleteService(id: string): Promise<void> {
    await this.checkService(id);

    await this.serviceModel.findByIdAndDelete({ _id: id });
  }

  

  async #_checkExistingService(name: string): Promise<void> {
    const exisitingname = await this.serviceModel.findOne({
    name,
    })}


  async checkService(id: string): Promise<void> {
    await this.#_checkId(id);
    const service = await this.serviceModel.findById(id);

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
