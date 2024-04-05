import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Language, LanguageSchema } from '../language';
import { Definition, DefinitionSchema, Translate, TranslateSchema, TranslateService } from '../translate';
import { Service, ServiceSchema } from './schemas';
import { ServiceService } from './service.service';
import { ServiceController } from './sevice.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Service.name, schema: ServiceSchema },
      { name: Translate.name, schema: TranslateSchema },
      { name: Definition.name, schema: DefinitionSchema },
      { name: Language.name, schema: LanguageSchema }
    ]),
  ],
  controllers: [ServiceController],
  providers: [ServiceService, TranslateService],
})
export class ServiceModule {}
