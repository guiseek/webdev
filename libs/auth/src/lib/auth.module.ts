import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSnackBarModule,
} from '@angular/material';
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
