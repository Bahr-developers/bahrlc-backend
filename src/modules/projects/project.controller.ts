import {
    Body,
    Controller,
    Post,
    Get,
    Patch,
    Param,
    Delete,
    Headers,
    UseInterceptors,
    UploadedFiles
  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProjectDto, UpdateProjectDto } from './dtos';
import { Project } from './schemas';
import { ProjectService } from './project.service';
import { FilesInterceptor } from '@nestjs/platform-express';
  
  @ApiTags('Project')
  @Controller({
    path: 'project',
    version: '1.0',
  })
  export class ProjectController {
    #_projectService: ProjectService;
  
    constructor(project: ProjectService) {
      this.#_projectService = project;
    }
  
    @Post('add')
    @UseInterceptors(FilesInterceptor('images'))
    createProject(
      @Body() payload: CreateProjectDto,
      @UploadedFiles() images: any[]
    ): Promise<void> {
      return this.#_projectService.createProject({...payload, images});
    }

    @Get('find/all')
    async getServiceList(
      @Headers('accept-language') languageCode: string
      ): Promise<Project[]> {
        return await this.#_projectService.getProjectList(languageCode);
    }

    @Patch('edit/:id')
    @UseInterceptors(FilesInterceptor('images'))
    async updateProject(
      @Param('id') projectId: string,
      @Body() payload: UpdateProjectDto,
      @UploadedFiles() images: any[]
    ): Promise<void> {
      await this.#_projectService.updateProject({ ...payload, id: projectId, images });
    }
  
    @Delete('delete/:id')
    async deleteProject(@Param('id') projectId: string): Promise<void> {
      await this.#_projectService.deleteProject(projectId);
    }
}