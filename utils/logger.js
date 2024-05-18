const { isEmpty } = require(".");

exports.logTable = (tableName, obj) => {
  if (!isEmpty(obj)) {
    console.log(`\n ${tableName}`);
    console.table(obj);
  }
};
