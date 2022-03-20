import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BblogController } from './bblog.controller';
import { BblogService } from './bblog.service';
import { ResponseObjClass } from '../shared/services/responseObject.service';
import { CollectionName, BlogSchema } from './schemas/blog.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: CollectionName, schema: BlogSchema }])],
    controllers: [BblogController],
    providers: [BblogService, ResponseObjClass],
	// exports: [BblogService]
})
export class BblogModule {}
