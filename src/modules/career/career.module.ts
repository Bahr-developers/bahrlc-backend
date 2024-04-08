import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Language, LanguageSchema } from '../language';
import { Definition, DefinitionSchema, Translate, TranslateSchema, TranslateService } from '../translate';

import { Career, CareerSchema } from './schema';
import { CareerController } from './career.controller';
import { CareerService } from './career.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Career.name, schema: CareerSchema },
      { name: Translate.name, schema: TranslateSchema },
      { name: Definition.name, schema: DefinitionSchema },
      { name: Language.name, schema: LanguageSchema }
    ]),
  ],
  controllers: [CareerController],
  providers: [CareerService, TranslateService],
})
export class CareerModule {}
