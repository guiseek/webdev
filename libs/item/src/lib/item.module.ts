import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { UiModule } from '@webdev/ui';
import { FormComponent } from './form/form.component';
import { ListaComponent } from './lista/lista.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    UiModule,
  ],
  declarations: [FormComponent, ListaComponent],
  exports: [FormComponent, ListaComponent],
})
export class ItemModule {}
