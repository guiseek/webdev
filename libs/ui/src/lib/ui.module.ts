import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  declarations: [ConfirmDialogComponent],
  exports: [ConfirmDialogComponent],
  entryComponents: [ConfirmDialogComponent],
})
export class UiModule {}
