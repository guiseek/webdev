import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { Item } from '@webdev/api-interfaces';
import { MatDialog } from '@angular/material';

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

  ngOnInit() {
  }
  remove(index: number, item: Item) {
    console.log(index)
    const ref = this.dialog.open(
      this.removeDialog, {
        data: item
      }
    )
    ref.afterClosed().subscribe((result) => {
      console.log('result: ', result)
      if (result) {
        this.onRemove.emit(index)
      }
    })
    // this.onRemove.emit(index);
  }
}
