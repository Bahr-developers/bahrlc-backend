import { LanguageModule, TranslateModule } from '@modules';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CareerModule } from './modules/career/career.module';
import { PartnersModule } from './modules/partners/partners.module';
import { ProjectModule } from './modules/projects/project.module';
import { ServiceModule } from './modules/services/service.module';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/bahrtech'),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads/',
    }),
    LanguageModule,
    TranslateModule,
    ServiceModule,
    CareerModule,
    ProjectModule,
    PartnersModule,
  ],
})
export class AppModule {}
