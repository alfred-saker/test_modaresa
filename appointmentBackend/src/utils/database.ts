import { promises as fs } from 'fs';
import path from 'path';

const dbPath = path.join(__dirname, '..', 'db.json');

export const readDb = async () => {
    try {
        const data = await fs.readFile(dbPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Could not read database file:", error);
        return null;
    }
};

export const writeDb = async (data: object) => {
    try {
        await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error("Could not write to database file:", error);
    }
};
