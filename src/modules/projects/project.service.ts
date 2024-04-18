import { CreateProjectInterface, UpdateProjectRequest } from './interfaces';
import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas';
import { Model, isValidObjectId } from 'mongoose';
import { CreateProjectDto } from './dtos/create-project.dto';
import { Translate, TranslateService } from '../translate';
import { FilesService } from '../file/file.service';
import { log } from 'console';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private readonly projectModel: Model<Project>,
    @InjectModel(Translate.name) private readonly translateModel: Model<Translate>,
    private fileService: FilesService,
    private readonly service: TranslateService
  ) {}

  async createProject(payload: CreateProjectInterface): Promise<void> {
    await this.#_checkExistingProject(payload.name);
    await this.checkTranslate(payload.name)

    const files = await Promise.all(payload.images.map(photo => this.fileService.createFile(photo)));    

    const newProject = await this.projectModel.create({
      name: payload.name,
      url: payload.url,
      image_urls:files,
      type: payload.type
    });

    await this.translateModel.findByIdAndUpdate(
      {
        _id: payload.name,
      },
      {
        status: 'active',
      },
    )
    newProject.save();
  }

  async getProjectList(languageCode:string): Promise<Project[]> {
    const data =  await this.projectModel
      .find()
      .select('name url image_urls type')
      .exec();

    let result = []
    for(let x of data){
      const name_request = {
        translateId:x.name.toString(),
        languageCode:languageCode
      }
      
      const translated_name = await this.service.getSingleTranslate(name_request)            
      result.push({id:x._id, name:translated_name.value, url:x.url, image_urls:x.image_urls , type: x.type})
    }
     return result
  }

  async updateProject(payload: UpdateProjectRequest): Promise<void> {
    await this.#_checkProject(payload.id);
    await this.checkTranslate(payload.name)

    const deleteImageFile = await this.projectModel.findById(payload.id)

    for(let photo of deleteImageFile.image_urls){
      await this.fileService.deleteImage(photo).catch(undefined => undefined)
    }
    
    const files = await Promise.all(payload.images.map(photo => this.fileService.createFile(photo)));

    await this.translateModel.findByIdAndUpdate(
      {
        _id: payload.name,
      },
      {
        status: 'active',
      },
    )

    await this.projectModel.findByIdAndUpdate(
      {_id:payload.id},
      {
      name: payload.name,
      url: payload.url,
      image_urls:files,
      type: payload.type
    });
  }

  async deleteProject(id: string): Promise<void> {
    await this.#_checkProject(id);
    const deleteImageFile = await this.projectModel.findById(id)
    for(let photo of deleteImageFile.image_urls){
      await this.fileService.deleteImage(photo).catch(undefined => undefined)
    }

    await this.projectModel.findByIdAndDelete({ _id: id });
  }

  async #_checkExistingProject(name: string): Promise<void> {
    const project = await this.projectModel.findOne({
      name,
    });

    if (project) {
      throw new ConflictException(`${project.name} is already available`);
    }
  }

  async #_checkProject(id: string): Promise<void> {
    await this.#_checkId(id);
    const project = await this.projectModel.findById(id);

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

  async checkTranslate(id: string): Promise<void> {
    await this.#_checkId(id);
    const translate = await this.translateModel.findById(id);

    if (!translate) {
      throw new ConflictException(`Translate with ${id} is not exists`);
    }
  }
}
