import cp from "recursive-copy";
import path from "path";

const options = {
  overwrite: true
};

// restoreFiles:: _ => Promise<any>
const restoreFiles = () =>
  cp(
    path.join(__dirname, "../config/backup/"),
    path.join(__dirname, "../config/tested/"),
    options
  );
export default restoreFiles;
