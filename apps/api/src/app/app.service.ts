import { Injectable } from '@nestjs/common';
import { Item } from '@webdev/api-interfaces';

@Injectable()
export class AppService {
  itens: Item[] = []

  getData(): { message: string } {
    return ({ message: 'Welcome to api!' });
  }
  getItens(): Item[] {
    return this.itens;
  }
  addItem(item: Item) {
    this.itens.push(item);
  }
  removeItem(index: number) {
    return this.itens.splice(index, 1);
  }
}
