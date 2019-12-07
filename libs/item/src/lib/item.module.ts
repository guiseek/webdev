import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule } from '@angular/material';
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
    UiModule
  ],
  declarations: [FormComponent, ListaComponent],
  exports: [FormComponent, ListaComponent]
})
export class ItemModule {}
