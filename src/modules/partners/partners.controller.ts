import {
    Controller,
    Post,
    Get,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    UploadedFiles
  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Partners } from './schemas';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PartnerService } from './partners.service';
  
  @ApiTags('Partners')
  @Controller({
    path: 'partners',
    version: '1.0',
  })
  export class PartnerController {
    #_partnerService: PartnerService;
  
    constructor(project: PartnerService) {
      this.#_partnerService = project;
    }
  
    @Post('add')
    @UseInterceptors(FilesInterceptor('image'))
    createProject(
      @UploadedFiles() image: any
    ): Promise<void> {
      return this.#_partnerService.createPartners(image);
    }

    @Get('find/all')
    async getServiceList(
      ): Promise<Partners[]> {
        return await this.#_partnerService.getPartnersList();
    }

    @Patch('edit/:id')
    @UseInterceptors(FilesInterceptor('image'))
    async updateProject(
      @Param('id') projectId: string,
      @UploadedFiles() image: any
    ): Promise<void> {
      await this.#_partnerService.updatePartner({id: projectId, image });
    }
  
    @Delete('delete/:id')
    async deleteProject(@Param('id') projectId: string): Promise<void> {
      await this.#_partnerService.deletePartner(projectId);
    }
}