import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'webdev-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: [],
    });
  }

  ngOnInit() {}
  login() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.http.post('/api/auth/login', this.form.value).subscribe(
        (res: any) => this.onLogin(res),
        (err) => {
          console.log(err, err.message);
          this.showSnack(err.statusText);
        }
      );
    }
    // this.onAdded.emit(this.form.value);
  }
  onLogin({ access_token }) {
    localStorage.setItem('access_token', access_token);
    this.router.navigateByUrl('/');
    this.showSnack(`Sucesso! Token: ${access_token}`);
  }
  showSnack(message: string, duration = 4000) {
    this.snackBar.open(message, 'Fechar', { duration });
  }
}
