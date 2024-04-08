import { LanguageModule, TranslateModule } from '@modules';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CareerModule } from './modules/career/career.module';
import { PartnersModule } from './modules/partners/partners.module';
import { ProjectModule } from './modules/projects/project.module';
import { ServiceModule } from './modules/services/service.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/bahrtech'),
    LanguageModule,
    TranslateModule,
    ServiceModule,
    CareerModule,
    ProjectModule,
    PartnersModule
  ],
})
export class AppModule {}
