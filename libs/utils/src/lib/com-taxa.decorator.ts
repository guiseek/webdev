export function ComTaxa(rate: number) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.get;

    descriptor.get = function () {
      const result = original.apply(this);
      return (result * (1 + rate)).toFixed(2);
    };

    return descriptor;
  };
}
