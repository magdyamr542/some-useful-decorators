type OnceArgument = ((...args: any[]) => any) | null;
function onceHelper(func: OnceArgument) {
  return (...args: any[]) => {
    if (!func) return;
    const result = func(...args);
    func = null;
    return result;
  };
}

export function once() {
  return (_: any, __: any, propDisc: TypedPropertyDescriptor<any>) => {
    const originalMethod = propDisc.value;
    propDisc.value = onceHelper(originalMethod);
    return propDisc;
  };
}
