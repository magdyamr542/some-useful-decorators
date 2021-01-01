export function throttle(throttleTime: number) {
  return (_: any, __: any, propDisc: TypedPropertyDescriptor<any>) => {
    const originalMethod = propDisc.value;
    propDisc.value = function (...args: any[]) {
      setTimeout(() => {
        originalMethod.apply(this, args);
      }, throttleTime);
    };
    return propDisc;
  };
}
