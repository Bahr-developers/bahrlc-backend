import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePartnerInterface } from '../interfaces';

export class CreatePartnerDto implements CreatePartnerInterface {
  @ApiProperty({
    maxItems: 8,
    type: 'array',
    items: {
      format: 'binary',
      type: 'string',
    },
  })
  image: any;
}
