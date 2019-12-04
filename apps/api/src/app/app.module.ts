import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoURI } from './../environments/environment';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot(getMongoURI)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
