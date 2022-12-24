const getDatabase = (db, sql) => {
    return new Promise((resolve) => {
        db.get(sql, function (err, row) {
            resolve({ err, row });
        });
    });
}

const getAllDatabase = (db, sql) => {
    return new Promise((resolve) => {
        db.all(sql, function (err, row) {
            resolve({ err, row });
        });
    });
}

const writeDatabase = (db, sql, params) => {
    return new Promise((resolve) => {
        db.run(sql, params, function (err) {
            resolve(!!err, this);
        });
    });
}

export { getDatabase, getAllDatabase, writeDatabase };