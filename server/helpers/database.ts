import { Database } from "sqlite3";

const getDatabase = (db: Database, sql: string):  Promise<{ err: Error | null, row: any }> => {
    return new Promise((resolve) => {
        db.get(sql, function (err, row) {
            resolve({ err, row });
        });
    });
}

const getAllDatabase = (db: Database, sql: string):  Promise<{ err: Error | null, row: any }> => {
    return new Promise((resolve) => {
        db.all(sql, function (err, row) {
            resolve({ err, row });
        });
    });
}

const writeDatabase = (db: Database, sql: string, params: any[]):  Promise<boolean> => {
    return new Promise((resolve) => {
        db.run(sql, params, function(this, err) {
            resolve(!!err);
        });
    });
}

export { getDatabase, getAllDatabase, writeDatabase };