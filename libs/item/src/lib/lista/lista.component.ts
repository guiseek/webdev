import { Input, Output, Component, EventEmitter } from '@angular/core';
import { ComTaxa, Confirmador } from '@webdev/utils';
import { Item } from '@webdev/api-interfaces';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'webdev-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  providers: [MatDialog],
})
export class ListaComponent {
  @Input() lista: Item[];
  @Output() onRemove = new EventEmitter<number>();

  constructor(public dialog: MatDialog) {}

  @ComTaxa(0.15)
  get total() {
    return this.lista.reduce((prev, cur) => prev + cur.preco, 0);
  }

  /**
   * Decorator de confirmação
   *
   * @param {number} index
   * @param {Item} item Deve ser mantido, pois é usado no decorator
   * @memberof ListaComponent
   */
  @Confirmador('Tem certeza que deseja remover {item} ?')
  remove(index: number, item: Item) {
    this.onRemove.emit(index);
  }
}
