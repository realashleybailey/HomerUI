import fs from 'fs';

const readFile = (file: string): Promise<{ err: Error | null, data: string }> => {
    return new Promise((resolve) => {
        fs.readFile(file, { encoding: 'utf8' }, (err, data) => {
            resolve({ err, data });
        });
    });
};

export { readFile };