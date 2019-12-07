import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@webdev/ui';
import { Injector } from '@angular/core';

/**
 * Decorator para dialog de confirmação
 * @param message
 */
export function Confirmador(message: string) {
  /**
   * @param target é a classe, no nosso claso o componente ListaComponent
   * @param key é o método qual o decorator está interceptando
   * @param descriptor pode ser usado para observar, modificar ou substituir as definições de um acessador
   */
  return function(
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;

    descriptor.value = function(...args: any[]) {
      const injector = Injector.create({
        providers: [{ provide: MatDialog, deps: [] }]
      });

      target.dialog = injector.get(MatDialog);

      const ref = this.dialog.open(ConfirmDialogComponent, {
        data: message.replace('{item}', args[1].nome)
      });

      ref.afterClosed().subscribe(result => {
        if (result) {
          console.log('result: ', result);
          return original.apply(this, args);
        }
        return null;
      });
    };

    return descriptor;
  };
}
