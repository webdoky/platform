const labels = {
  properties: 'Властивості',
  methods: 'Методи',
};

const inheritanceData = {
  Math: ['Object'],
  Date: ['Object'],
  Function: ['Object'],
  Object: [],
  JSON: ['Object'],
  Intl: ['Object'],
  arguments: [],
  Reflect: ['Object'],
  Proxy: [],
  Atomics: ['Object'],
  WebAssembly: ['Object'],
  default: ['Object', 'Function'],
};

const groupData = {
  Error: [
    'Error',
    'EvalError',
    'InternalError',
    'RangeError',
    'ReferenceError',
    'SyntaxError',
    'TypeError',
    'URIError',
  ],
  Intl: [
    'Intl',
    'Collator',
    'DateTimeFormat',
    'ListFormat',
    'NumberFormat',
    'PluralRules',
    'RelativeTimeFormat',
  ],
  TypedArray: [
    'TypedArray',
    'Int8Array',
    'Uint8Array',
    'Uint8ClampedArray',
    'Int16Array',
    'Uint16Array',
    'Int32Array',
    'Uint32Array',
    'Float32Array',
    'Float64Array',
    'BigInt64Array',
    'BigUint64Array',
  ],
  Proxy: ['Proxy', 'handler'],
  WebAssembly: [
    'WebAssembly',
    'WebAssembly.Module',
    'WebAssembly.Global',
    'WebAssembly.Instance',
    'WebAssembly.Memory',
    'WebAssembly.Table',
    'WebAssembly.CompileError',
    'WebAssembly.LinkError',
    'WebAssembly.RuntimeError',
  ],
};

module.exports.navLabels = labels;
module.exports.inheritanceData = inheritanceData;
module.exports.groupData = groupData;
module.exports.default = () => '';
