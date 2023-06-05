const stringField = (field, min = 3, max = 30) => ({
  type: String,
  ...(min && { minlength: [min, `${field} должен быть не короче ${min} символов`] }),
  ...(max && { maxlength: [max, `${field} не должен быть длиннее ${max} символов`] }),
  required: [true, `${field} не может быть пустым`],
});

const aaa = { ...stringField('test'), trim: false };
const bbb = { ...stringField('test', 2, 33) };
console.log(aaa);
console.log(bbb);
