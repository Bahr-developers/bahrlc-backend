import {
    Body,
    Controller,
    Post,
    Get,
    Patch,
    Param,
    Delete,
    Headers
  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateServiceDto, UpdateServiceDto } from './dtos';
import { Service } from './schemas';
import { ServiceService } from './service.service';
  
  @ApiTags('Service')
  @Controller({
    path: 'service',
    version: '1.0',
  })
  export class ServiceController {
    #_serviceService: ServiceService;
  
    constructor(service: ServiceService) {
      this.#_serviceService = service;
    }
  
    @Post('add')
    async createService(@Body() payload: CreateServiceDto): Promise<void> {
      await this.#_serviceService.createService(payload);
    }

    @Get('find/all')
    async getServiceList(
      @Headers('accept-language') languageCode: string
      ): Promise<Service[]> {
        return await this.#_serviceService.getServiceList(languageCode);
    }

    @Patch('edit/:id')
    async updateService(
      @Param('id') translateId: string,
      @Body() payload: UpdateServiceDto,
    ): Promise<void> {
      await this.#_serviceService.updateService({ ...payload, id: translateId });
    }
  
    @Delete('delete/:id')
    async deleteService(@Param('id') serviceId: string): Promise<void> {
      await this.#_serviceService.deleteService(serviceId);
    }
}