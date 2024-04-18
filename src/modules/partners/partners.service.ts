import { CreatePartnerInterface, UpdatePartnerRequest } from './interfaces';
import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Partners } from './schemas';
import { Model, isValidObjectId } from 'mongoose';
import { Translate, TranslateService } from '../translate';
import { FilesService } from '../file/file.service';

@Injectable()
export class PartnerService {
  constructor(
    @InjectModel(Partners.name) private readonly partnersModel: Model<Partners>,
    private fileService: FilesService,
  ) {}

  async createPartners(payload: CreatePartnerInterface): Promise<void> {

    const file = await this.fileService.createFile(payload.image[0]);

    const newPartner = await this.partnersModel.create({
      image_url:file,
    });

    newPartner.save();
  }

  async getPartnersList(): Promise<Partners[]> {
    const data =  await this.partnersModel
      .find()
      .select('image_url')
      .exec();
     return data
  }

  async updatePartner(payload: UpdatePartnerRequest): Promise<void> {
    await this.#_checkPartner(payload.id);

    const deleteImageFile = await this.partnersModel.findById(payload.id)

    await this.fileService.deleteImage(deleteImageFile.image_url)    

    const file = await this.fileService.createFile(payload.image[0]);
    await this.partnersModel.findByIdAndUpdate(
      {_id:payload.id},
      {
      image_url:file,
    });
  }

  async deletePartner(id: string): Promise<void> {
    await this.#_checkPartner(id);
    const deleteImageFile = await this.partnersModel.findById(id)
    console.log(deleteImageFile.image_url);
      await this.fileService.deleteImage(deleteImageFile.image_url)

    await this.partnersModel.findByIdAndDelete({ _id: id });
  }


  async #_checkPartner(id: string): Promise<void> {
    await this.#_checkId(id);
    const project = await this.partnersModel.findById(id);

    if (!project) {
      throw new ConflictException(`Project with ${id} is not exists`);
    }
  }

  async #_checkId(id: string): Promise<void> {
    const isValid = isValidObjectId(id);
    if (!isValid) {
      throw new UnprocessableEntityException(`Invalid ${id} Object ID`);
    }
  }
}
