import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { BblogModule } from './bblog/bblog.module';

@Module({
    imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(
			process.env.MONGO_URL,
			{ dbName: process.env.DB_NAME }
		),
		BblogModule
	],
	controllers: [AppController]
})
export class AppModule {}