function debounceDecorator(debounceTimeMs: number) {
  let timeoutRef: number | null = null;
  return (_: any, __: any, propDisc: TypedPropertyDescriptor<any>) => {
    const originalMethod = propDisc.value;
    propDisc.value = function (...args: any[]) {
      clearTimeout(timeoutRef!); // clear the timeout when calling the function again
      timeoutRef = setTimeout(() => {
        originalMethod.apply(this, args);
      }, debounceTimeMs); // reset the timeout
    };
    return propDisc;
  };
}
