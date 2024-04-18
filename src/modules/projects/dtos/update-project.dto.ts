import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum type {
  mobile = 'mobile',
  crm = 'crm',
  website = 'website',
  erp = 'erp',
}

export class UpdateProjectDto {
  @ApiProperty({
    example: '660d5290e49538271705501e',
    required: true,
  })
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'dachivgorax.uz',
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

  @ApiProperty({
    type: 'array',
    required: false,
    items: {
      type: 'string',
      format: 'binary',
    },
  })
  @IsOptional()
  images: any;
}
