import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Item } from '@webdev/api-interfaces';
import { ComTaxa, Confirmador } from '@webdev/utils';

@Component({
  selector: 'webdev-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  @Input() lista: Item[];
  @Output() onRemove = new EventEmitter<number>();

  @ViewChild('removeDialog', { static: true })
  removeDialog: TemplateRef<HTMLElement>
  constructor(
    private dialog: MatDialog
  ) { }

  @ComTaxa(0.15)
  get total() {
    return this.lista.reduce((prev, cur) => (prev + cur.preco), 0)
  }
  ngOnInit() {
  }
  @Confirmador('Tem certeza que deseja remover {item} ?')
  remove(index: number, item: Item) {
    console.log(index)
    this.onRemove.emit(index)
    // const ref = this.dialog.open(
    //   this.removeDialog, {
    //     data: item
    //   }
    // )
    // ref.afterClosed().subscribe((result) => {
    //   console.log('result: ', result)
    //   if (result) {
    //     this.onRemove.emit(index)
    //   }
    // })
    // this.onRemove.emit(index);
  }
}
