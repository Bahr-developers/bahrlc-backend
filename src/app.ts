import { LanguageModule, TranslateModule } from '@modules';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/bahrtech'),
    LanguageModule,
    TranslateModule,
  ],
})
export class AppModule {}
