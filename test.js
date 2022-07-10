const db = require("./db/connection");

const dep = () => {
    var sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
      if (err) {
        return;
      }
      console.table(rows);
    });
  };

dep();