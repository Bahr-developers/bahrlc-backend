import { UpdateTranslateRequest } from '../interfaces';
import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum status {
  active = 'active',
  inactive = 'inactive',
}

export class UpdateTranslateDto implements Omit<UpdateTranslateRequest, 'id'> {
  @ApiProperty({
    enum: ['active', 'inactive'],
    required: true,
  })
  @IsEnum(status)
  status: 'active' | 'inactive';
}
