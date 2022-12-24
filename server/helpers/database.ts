const getDatabase = (db: any, sql: any) => {
    return new Promise((resolve) => {
        db.get(sql, function (err: any, row: any) {
            resolve({ err, row });
        });
    });
}

const getAllDatabase = (db: any, sql: any) => {
    return new Promise((resolve) => {
        db.all(sql, function (err: any, row: any) {
            resolve({ err, row });
        });
    });
}

const writeDatabase = (db: any, sql: any, params: any) => {
    return new Promise((resolve) => {
        db.run(sql, params, function(this: any, err: any) {
            // @ts-expect-error TS(2554): Expected 1 arguments, but got 2.
            resolve(!!err, this);
        });
    });
}

export { getDatabase, getAllDatabase, writeDatabase };