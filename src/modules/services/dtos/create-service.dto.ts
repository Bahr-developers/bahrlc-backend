import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsObject, IsEnum} from 'class-validator';
import { CreateServiceInterface } from '../interfaces';


export class CreateServiceDto implements CreateServiceInterface {
    @ApiProperty({
        example: '660a95c6c8ce9168ce85e957',
        required: true,
      })
      @IsString()
      name: string;


      @ApiProperty({
        example:"660a95c6c8ce9168ce85e957",
        required: true,
      })
      @IsString()
      description: string
}
