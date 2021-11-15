import {
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Item } from '@webdev/api-interfaces';
import { AuthService } from '@webdev/api/auth';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
    // return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('itens')
  getItens() {
    return this.appService.getItens();
  }

  @Post('itens')
  addItem(@Body() item: Item) {
    return this.appService.addItem(item);
  }

  @Delete('itens/:index')
  removeItem(@Param('index') index: number) {
    return this.appService.removeItem(index);
  }
}
