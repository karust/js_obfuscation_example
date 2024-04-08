// Имя функции, вызываемой для получения свойств и строк
let functionName = "Up";
// Скопированная из обфусцированного кода функция
function getData_copy(data_index) {
  let data = [
    "Y3JlYXRlRWxlbWVudA==",
    "Y2FudmFz",
    "Z2V0Q29udGV4dA==",
    "d2ViZ2w=",
    "dG9EYXRhVVJM",
    "Y2FudmFz",
    "cGx1Z2lucw==",
    "bmF2aWdhdG9y",
    "bGVuZ3Ro",
    "cHVzaA==",
    "bmFtZQ==",
    "Y2FudmFz",
    "cGx1Z2lucw==",
    "bG9n",
    "c3RyaW5naWZ5",
  ];
  return atob(data[data_index]);
}
function transformCode(babel) {
  const { types: t } = babel;
  return {
    name: "deobf-str-props",
    visitor: {
      // 1. Удаляем функцию `getData` из кода
      FunctionDeclaration(path) {
        if (path.node.id.name !== functionName) return;
        path.remove();
      },
      // 2. Проходимся по всем вызовам с названием `getData`
      // Вызываем скопированную функцию с текущим аргументом
      // Заменяем вызов на полученный результат
      CallExpression(path) {
        if (path.node.callee.name !== functionName) return;
        let index = path.node.arguments[0].value;
        let str = t.stringLiteral(getData_copy(index));
        path.replaceWith(str);
      },
    },
  };
}
module.exports = transformCode;
