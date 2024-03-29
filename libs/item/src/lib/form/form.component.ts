import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from '@webdev/api-interfaces';

@Component({
  selector: 'webdev-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Output() onAdded = new EventEmitter<Item>();
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      desc: [],
      preco: [0],
    });
  }

  ngOnInit() {}
  addItem() {
    this.onAdded.emit(this.form.value);
  }
}
