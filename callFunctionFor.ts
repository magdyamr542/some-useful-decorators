import "reflect-metadata";

// Calling a function for certain amount of times
// helpful when we want to call a function for x Number of times inside a function which is being called over and over again.

function callFunctionFor(callFor: number) {
  return (
    target: any,
    funcName: string,
    propDisc: TypedPropertyDescriptor<any>
  ) => {
    const originalMethod = propDisc.value;
    let numTimesBeingCalled: number;
    propDisc.value = function (...args: any[]) {
      // check if not the first time
      const wasCalledBefore = Reflect.hasMetadata(
        "calledFor",
        target,
        funcName
      );
      if (!wasCalledBefore) {
        Reflect.defineMetadata("calledFor", 1, target, funcName); // call for the first time
      } else {
        numTimesBeingCalled = Reflect.getMetadata(
          "calledFor",
          target,
          funcName
        );
        Reflect.defineMetadata(
          "calledFor",
          numTimesBeingCalled + 1,
          target,
          funcName
        );
      }
      if (numTimesBeingCalled >= callFor) {
        return;
      }
      // call and return the result
      const result = originalMethod.apply(this, args);
      return result;
    };
  };
}

class SomeClass {
  @callFunctionFor(4)
  printName() {
    console.log("some name");
  }
}

const inst = new SomeClass();
for (let i = 0; i < 10; i++) {
  inst.printName(); // will be called only 4 times
}


