import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from '@webdev/api-interfaces';

@Component({
  selector: 'webdev-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mobile';
  itens: Item[] = [];
  form: FormGroup;
  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
    });
    this.fetch();
  }

  fetch() {
    this.http.get<Item[]>('/api/itens').subscribe((t) => (this.itens = t));
  }
  addItem(data: Item) {
    this.http.post('/api/itens', data).subscribe(() => this.fetch());
  }
}
