import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';

import { AppService } from './app.service';
import { Item } from '@webdev/api-interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('itens')
  getItens() {
    return this.appService.getItens()
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
