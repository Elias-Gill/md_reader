import { invoke } from "@tauri-apps/api/tauri";
import { readTextFile } from "@tauri-apps/api/fs";
import { basename, resolve, sep, normalize } from "@tauri-apps/api/path";
import { getMatches } from "@tauri-apps/api/cli";

export type tauriArguments = {
    path: string;
    file: string;
};

async function listFilesInPath(path: string): Promise<string[]> {
    return invoke("files_in_path", { path: path });
}

async function printTauri(msg: string) {
    invoke("print_tauri", { msg: msg });
}

async function getTimeStamp(file: string, baseDir: string): Promise<number> {
    try {
        return invoke("get_file_timestamp", { path: baseDir + sep + file });
    } catch {
        return 0;
    }
}

async function getParentDir(file: string): Promise<string> {
    return invoke("get_parent_dir", { path: file });
}

async function openFile(file: string, baseDir: string): Promise<string> {
    try {
        console.log("Oppening file: ", baseDir  + sep + file);
        const f = await resolve(baseDir, file);
        const content = await readTextFile(f);
        return content;
    } catch (err) {
        console.log("Cannot open file: ", err);
        return "";
    }
}

async function parseArguments(): Promise<tauriArguments> {
    const matches = await getMatches();
    let path: string | boolean = matches.args.path.value as string | boolean;
    let file: string | boolean = matches.args.file.value as string | boolean;

    // If a file is passed, ignore the -p flag
    if (matches.args.file.occurrences > 0) {
        path = await getParentDir(file as string);
        file = await basename(file as string);
    } else if (matches.args.path.occurrences > 0) {
        path = await normalize(path as string);
        path = await resolve(".", path);
        file = "";
    } else {
        path = await resolve(".");
        file = "";
    }

    printTauri(`Current path is ${path} and \nCurrent file is ${file}`);

    return {
        file: file as string,
        path: path
    };
}

export { parseArguments, openFile, getParentDir, listFilesInPath, getTimeStamp };
