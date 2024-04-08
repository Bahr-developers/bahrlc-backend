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
import { CreateCareerDto, UpdateCareerDto } from './dtos';
import { Career } from './schema';
import { CareerService } from './career.service';
  
  @ApiTags('Career')
  @Controller({
    path: 'career',
    version: '1.0',
  })
  export class CareerController {
    #_careerService: CareerService;
  
    constructor(career: CareerService) {
      this.#_careerService = career;
    }
  
    @Post('add')
    async createCareer(@Body() payload: CreateCareerDto): Promise<void> {
      await this.#_careerService.createCareer(payload);
    }

    @Get('find/all')
    async getCareerList(
      @Headers('accept-language') languageCode: string
      ): Promise<Career[]> {
        return await this.#_careerService.getCareerList(languageCode);
    }

    @Patch('edit/:id')
    async updateCareer(
      @Param('id') translateId: string,
      @Body() payload: UpdateCareerDto,
    ): Promise<void> {
      await this.#_careerService.updateCareer({ ...payload, id: translateId });
    }
  
    @Delete('delete/:id')
    async deleteCareer(@Param('id') serviceId: string): Promise<void> {
      await this.#_careerService.deleteCareer(serviceId);
    }
}