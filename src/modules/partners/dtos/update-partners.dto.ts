import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdatePartnerRequest } from '../interfaces';

export class UpdatePartnerDto implements Omit<UpdatePartnerRequest, 'id'> {
  @ApiProperty({
    maxItems: 8,
    type: 'array',
    items: {
      format: 'binary',
      type: 'string',
    },
    required: false,
  })
  @IsOptional()
  image?: any;
}
