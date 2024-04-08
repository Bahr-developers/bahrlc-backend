import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from '../file/file.module';
import { PartnerController } from './partners.controller';
import { PartnerService } from './partners.service';
import { Partners } from './schemas';
import { PartnerSchema } from './schemas/create-partners.schema';

@Module({
  imports: [
  MongooseModule.forFeature([
      { name: Partners.name, schema: PartnerSchema },
    ]),
    FilesModule,
  ],
  controllers: [PartnerController],
  providers: [PartnerService],
})
export class PartnersModule {}
