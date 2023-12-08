
import { renameSync } from "fs";
import path from "path";

const filename = path.join("src", "autocomplete-input");
try {
    renameSync(`${filename}.jsx`, `${filename}.tsx`);
} catch (expected) {}
