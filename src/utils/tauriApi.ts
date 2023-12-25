import { invoke } from "@tauri-apps/api/tauri";
import { readTextFile } from "@tauri-apps/api/fs";
import { homeDir, basename, resolve } from "@tauri-apps/api/path";
import { getMatches } from "@tauri-apps/api/cli";

export type tauriArguments = {
    path: string;
    file: string;
};

async function listFilesInPath(path: string): Promise<string[]> {
    return invoke("files_in_path", { path: path });
}

async function getTimeStamp(file: string, baseDir: string): Promise<number> {
    try {
        return invoke("get_file_timestamp", { path: baseDir + "/" + file });
    } catch {
        return 0;
    }
}

async function getParentDir(file: string): Promise<string> {
    return invoke("get_parent_dir", { path: file });
}

async function openFile(file: string, baseDir: string): Promise<string> {
    try {
        console.log("oppening file: ", baseDir + "/" + file);
        const content = await readTextFile(baseDir + "/" + file);
        return content;
    } catch (err) {
        console.log("Cannot open file: ", err);
        return "";
    }
}

// It matches theh app arguments. Exits with code 1 if cannot parse succesfully.
async function parseArguments(): Promise<tauriArguments> {
    let path: string;
    const matches = await getMatches();
    let file = matches.args.file.value as string;

    // determine the parent dir
    if (matches.args.path.occurrences != 0) {
        path = matches.args.path.value as string;
    } else if (matches.args.file.occurrences != 0) {
        path = await getParentDir(file);
        file = await basename(file);
    } else {
        path = await resolve(".");
    }

    return {
        file: file,
        path: path
    };
}

export { parseArguments, openFile, getParentDir, listFilesInPath, getTimeStamp };
