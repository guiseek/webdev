import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { ListaComponent } from './lista/lista.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [FormComponent, ListaComponent],
  exports: [FormComponent, ListaComponent]
})
export class ItemModule {}
