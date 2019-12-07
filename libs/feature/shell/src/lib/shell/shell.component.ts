import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Item } from '@webdev/api-interfaces';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
  itens: Item[] = [];
  form: FormGroup;
  user$: Observable<any>
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.user$ = this.http.get('/api/profile')

    this.form = this.fb.group({
      nome: ['', [
        Validators.required,
        Validators.minLength(2)
      ]]
    })
    this.fetch()
  }

  fetch() {
    this.http.get<Item[]>('/api/itens').subscribe(t => (this.itens = t))
  }
  addItem(data: Item) {
    this.http.post('/api/itens', data)
      .subscribe(() => this.fetch())
  }
  removeItem(item) {
    console.log(item)
    this.http.delete(`api/itens/${item}`)
      .subscribe(() => this.fetch())
  }

  logout() {
    localStorage.removeItem('access_token')
    this.router.navigateByUrl('/auth')
  }
}
