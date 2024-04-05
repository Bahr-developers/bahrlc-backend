import { CreateProjectInterface, UpdateProjectRequest } from '../interfaces';
import { IsObject, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum type {
  mobile = 'mobile',
  crm = 'crm',
  website = 'website',
  erp = 'erp'
}

export class UpdateProjectDto {
  @ApiProperty({
    example: '660d5290e49538271705501e',
    required: true,
  })
  @IsString()
  name?: string;

  @ApiProperty({
    example: "dachivgorax.uz",
    required: true,
  })
  @IsString()
  url?: string;

  @ApiProperty({
    examples: ['crm', 'mobile', 'website', 'erp'],
    required: true,
  })
  @IsEnum(type)
  @IsString()
  type?: 'crm' | 'mobile' | 'website' | 'erp';
}
