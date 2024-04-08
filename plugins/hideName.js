// Хранилище с использованными названиями идентификаторов
const usedIdentifiers = new Set();
// Генерирует случайную строку из алфавита `characters` длиной до 3 символов
// Сгенерированная строка должна быть уникальной (не использована ранее идентификаиторами)
function generateRndName() {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomIdentifier = "";
  do {
    const length = Math.floor(Math.random() * 3);
    for (let i = 0; i <= length; i++) {
      randomIdentifier += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
  } while (usedIdentifiers.has(randomIdentifier));
  usedIdentifiers.add(randomIdentifier);
  return randomIdentifier;
}
// Проходимся по всем нодам типа `Identifier`
// Изменяем их названия на случайные вместе со всеми ссылками
function transformCode() {
  return {
    name: "hide-names",
    visitor: {
      Identifier(path) {
        path.scope.rename(path.node.name, generateRndName());
      },
    },
  };
}
module.exports = transformCode;
