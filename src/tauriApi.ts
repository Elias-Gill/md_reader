import { invoke } from "@tauri-apps/api/tauri";
import { BaseDirectory, readTextFile } from "@tauri-apps/api/fs";

export function listFiles(path: string): string[] {
    invoke("files_in_path", { path: path })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error(error);
        });

    return ["no file"];
}

export function openFile(file: string, baseDir: string): string {
    try {
        readTextFile(file, { dir: BaseDirectory.Home }).then((value) => {
            return value;
        });
    } catch (error) {
        console.error("Cannot open file: " + error);
    }
    return "";
}
