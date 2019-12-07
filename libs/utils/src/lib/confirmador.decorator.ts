import { Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@webdev/ui';

/**
 *
 * @param message
 */
export function Confirmador(message: string) {
  /**
   * @param target é a classe, no nosso claso o componente ListaComponent
   * @param key é o método qual o decorator está interceptando
   * @param descriptor pode ser usado para observar, modificar ou substituir as definições de um acessador
  */
  return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    const injector = Injector.create({ providers: [{ provide: MatDialog, deps: [] }] });
    const dialog: MatDialog = injector.get(MatDialog);

    descriptor.value = function (...args: any[]) {

      const ref = this.dialog.open(ConfirmDialogComponent, {
        data: message.replace('{item}', args[1].nome)
      })
      ref.afterClosed().subscribe(
        (result) => {
          if (result) return original.apply(this, args)
          return null
        }
      )
    };

    return descriptor;
  };
}
