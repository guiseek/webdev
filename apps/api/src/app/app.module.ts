import { Module } from '@nestjs/common';
import { ApiAuthModule } from '@webdev/api/auth';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ApiAuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
