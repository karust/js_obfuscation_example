function transformCode(babel) {
  const { types: t } = babel;
  // Все наши свойства\строки, заменяемые в коде будут тут
  let data = [];
  return {
    name: "hide-props-strings",
    visitor: {
      //1. Находим корневую ноду `Program`
      // И вставляем в начало кода функцию, возвращающую свойства\строки по индексу
      Program(path) {
        // Тело создаваемой функции
        let funcBody = t.blockStatement([
          // Обьявляем переменную, хранящую свойства\строки
          // let data = [...]
          t.variableDeclaration("let", [
            t.variableDeclarator(t.identifier("data"), t.arrayExpression(data)),
          ]),
          // Возвращаем данные перед этим декодируя их из base64
          // return atob(data[data_index])
          t.returnStatement(
            t.callExpression(t.identifier("atob"), [
              t.memberExpression(
                t.identifier("data"),
                t.identifier("data_index"),
                true
              ),
            ])
          ),
        ]);
        // Создаём функцию `getData` с 1 аргументом `data_index`
        let func = t.functionDeclaration(
          t.identifier("getData"),
          [t.identifier("data_index")],
          funcBody
        );
        // Вставляем функцию в начало
        path.node.body.unshift(func);
      },
      // 2. Обходим ноды типа `MemberExpression`. Заменяем свойства на вызовы `getData`
      // Например `document.createElement` будет `document[getData(0)]
      MemberExpression({ node }) {
        // Избегаем уже "вычесленных" нод и где имеется свойство `data_index`, дабы не затронуть новую функцию `getData`
        let prop = node.property.name;
        if (node.computed) return;
        if (prop == "data_index") return;
        // Заносим данное свойство в "хранилище" в `getData`
        data.push(t.stringLiteral(btoa(prop)));
        // Заменяем свойство на вызов функции `getData` с соответствующим индексом
        node.property = t.callExpression(t.identifier("getData"), [
          t.numericLiteral(data.length - 1),
        ]);
        // Делаем свойство вычисляемым
        node.computed = true;
      },
      // 3. Обходим ноды типа `StringLiteral`. Заменяя строки на вызовы `getData`
      StringLiteral(path) {
        // Заносим строку в "хранилище" в `getData`
        data.push(t.stringLiteral(btoa(path.node.value)));
        // Создаём вызов функции `getData` с соответствующим индексом
        const c = t.callExpression(t.identifier("getData"), [
          t.numericLiteral(data.length - 1),
        ]);
        // Заменяем данную ноду на новосозданную
        path.replaceWith(c);
      },
    },
  };
}
module.exports = transformCode;
