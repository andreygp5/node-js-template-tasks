import fs from 'fs';
import path from 'path';

export const logToFile = (fileName: string, logStr: string) => {
  const filePath = path.resolve(`logs/${fileName}.log`);
  fs.writeFile(
    filePath,
    logStr,
    { flag: 'a' },
    (err) => err,
  );
};

export const logToFileSync = (fileName: string, logStr: string) => {
  const filePath = path.resolve(`logs/${fileName}.log`);
  fs.writeFileSync(
    filePath,
    logStr,
    { flag: 'a' },
  );
};
