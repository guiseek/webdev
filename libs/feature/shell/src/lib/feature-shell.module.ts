import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ItemModule } from '@webdev/item';
import { ShellComponent } from './shell/shell.component';

@NgModule({
  imports: [
    CommonModule,
    ItemModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ShellComponent }
    ])
  ],
  declarations: [ShellComponent]
})
export class FeatureShellModule {}
