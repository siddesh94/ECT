const sampleObj = {
  key1: 1,
  key2: "one",
  key3: true,
  key4: [1, 2, 3, 4],
  key5: {
    obj1: 1,
    obj2: "two",
  },
  key6: new Date(),
  key7: () => {
    console.log("inside sample object");
  },
  key8: null,
};

const deepCopy = (originalObj) => {
  if (originalObj === null || typeof originalObj !== "object") {
    return originalObj;
  }
  let cloneCopy;
  if (Array.isArray(originalObj)) {
    cloneCopy = [];
    originalObj.forEach((item, index) => {
      if (item !== Object(item) || new Date(item) != "Invalid Date") {
        cloneCopy.push(item);
      } else {
        cloneCopy.push(deepCopy(item));
      }
    });
  } else {
    cloneCopy = {};
    Object.keys(originalObj).forEach((item, index) => {
      if (
        originalObj[item] !== Object(originalObj[item]) ||
        new Date(originalObj[item] !== "Invalid Date")
      ) {
        cloneCopy[item] = originalObj[item];
      } else {
        cloneCopy[item] = deepCopy(originalObj[item]);
      }
    });
  }
  return cloneCopy;
};

console.log(sampleObj);
const copy1 = deepCopy(sampleObj);
console.log(copy1);


// ================== 2ND =======================
const check = (param1, param2) => {
  if (param1 === param2) {
    return true;
  }
  if (
    (param1 == null && param2 == null) ||
    (param1 == null && param2 == undefined) ||
    (param2 == null && param1 == undefined)
  ) {
    return true;
  }
  if (
    (param1 == null && param2 != null) ||
    (param2 == null && param1 != null)
  ) {
    return false;
  }
  if (
    Object.prototype.toString.call(param1) !==
    Object.prototype.toString.call(param2)
  )
    return false;

  if (param1 && param1 instanceof Date && param2 && param2 instanceof Date) {
    return param1.getTime() === param2.getTime();
  }
  if (Array.isArray(param1) && !Array.isArray(param2)) {
    return false;
  }
  let result = true;
  if (Array.isArray(param1) && Array.isArray(param2)) {
    if (param1.length !== param2.length) {
      return false;
    }
    param1.forEach((item, index) => {
      if (item !== Object(item)) {
        if (item !== param2[index]) {
          result = false;
        }
      } else if (item instanceof Date && new Date(item).getTime() !== NaN) {
        result = new Date(item).getTime() === new Date(param2[index]).getTime();
      } else {
        result = check(item, param2[index]);
      }
    });
    return result;
  }
  if (typeof param1 === "object" && typeof param2 === "object") {
    Object.keys(param1).forEach((item) => {
      if (param1[item] !== Object(param1[item])) {
        if (
          param2 &&
          param2.hasOwnProperty(item) &&
          param1[item] !== param2[item]
        ) {
          result = false;
        }
      } else if (
        param1[item] instanceof Date &&
        new Date(param1[item]).getTime() !== NaN
      ) {
        result =
          new Date(param1[item]).getTime() === new Date(param2[item]).getTime();
      } else {
        result = check(param1[item], param2[item]);
      }
    });
    return result;
  }
};

var data1 = { a: 17, b: { c: "Test", d: null } };
var data2 = { a: 17, b: { c: "Test" } };
var data3 = { a: 17, b: null };

console.log('----1', check(data1, data2));
console.log('----2', check(data1, data3));
console.log('----3', check(null, undefined));
console.log('----4', check({ a: 1, b: [2, 3] }, { a: 1, b: [2, 3] }));
console.log('----5', check(new Date(), new Date()));
console.log('----6', check({ x: 5, y: 6 }, { x: 5, y: 7 }));

// ================== 3RD =======================
const $math = {
  sum: (a, b) => {
    return a + b;
  },
  mul: (a, b) => {
    return a * b;
  },
};

const $logger = console.log;

const execute = (code, variables = {}) => {
  return new Function(
    "$math",
    "$logger",
    ...Object.keys(variables),
    `//# sourceURL=test.js\nreturn eval(${code});`
  )($math, $logger, ...Object.values(variables));
};

execute('$logger("Sum:", $math.sum(a, b))', { a: 17, b: 3 });
execute('$logger("Mul:", $math.mul(a, b))', { a: 17, b: 3 });
