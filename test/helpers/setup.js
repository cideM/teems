import cp from "recursive-copy";
import path from "path";
import del from "del";

const options = {
  overwrite: true
};

// restoreFiles:: _ => Promise<any>
export const restoreFiles = () =>
  cp(
    path.join(__dirname, "../config/backup/"),
    path.join(__dirname, "../config/tested/"),
    options
  );

export const clearBackups = () => del([path.join(__dirname, "..", "backup")]);
