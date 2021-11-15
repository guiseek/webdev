import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Route, RouterModule } from '@angular/router';
import { UiModule } from '@webdev/ui';
import { LoginComponent } from './login/login.component';

export const authRoutes: Route[] = [{ path: '', component: LoginComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatListModule,
    MatDialogModule,
    UiModule,
  ],
  declarations: [LoginComponent],
  providers: [],
})
export class AuthModule {}
