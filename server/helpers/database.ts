import { Database, RunResult } from "sqlite3";

const getDatabase = (db: Database, sql: string, params: any[] = []):  Promise<{ err: Error | null, row: any }> => {
    return new Promise((resolve) => {
        db.get(sql, params, function (err, row) {
            resolve({ err, row });
        });
    });
}

const getAllDatabase = (db: Database, sql: string, params: any[] = []):  Promise<{ err: Error | null, row: any }> => {
    return new Promise((resolve) => {
        db.all(sql, params, function (err, row) {
            resolve({ err, row });
        });
    });
}

const writeDatabase = (db: Database, sql: string, params: any[]):  Promise<{ err: Error | null, result: RunResult }> => {
    return new Promise((resolve) => {
        db.run(sql, params, function(result: RunResult, err: Error | null) {
            resolve({ err, result });
        });
    });
}

export { getDatabase, getAllDatabase, writeDatabase };