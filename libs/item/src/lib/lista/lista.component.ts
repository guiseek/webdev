import { Component, OnInit, Input } from '@angular/core';
import { Item } from '@webdev/api-interfaces';

@Component({
  selector: 'webdev-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  @Input() lista: Item[];
  constructor() { }

  ngOnInit() {
  }

}
