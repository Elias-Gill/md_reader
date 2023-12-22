import { invoke } from "@tauri-apps/api/tauri";
import { readTextFile } from "@tauri-apps/api/fs";
import { homeDir } from "@tauri-apps/api/path";
import { getMatches } from "@tauri-apps/api/cli";

export type tauriArguments = {
    path: string;
    file: string;
};

async function listFilesInPath(path: string): Promise<string[]> {
    return invoke("files_in_path", { path: path });
}

async function openFile(file: string, baseDir: string): Promise<string> {
    try {
        console.log("oppening file: ", baseDir + file);
        return readTextFile(baseDir + file);
    } catch {
        return "";
    }
}

// It matches theh app arguments. Exits with code 1 if cannot parse succesfully.
async function parseArguments(): Promise<tauriArguments> {
    let path: string = await homeDir();
    const matches = await getMatches();

    if (matches.args.path.occurrences != 0) {
        path = matches.args.path.value as string;
    }

    return {
        file: matches.args.file.value as string,
        path: path
    };
}

export { parseArguments, openFile, listFilesInPath };
