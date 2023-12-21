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
        if (baseDir === "" || file === "") {
            return "";
        }
        return readTextFile(baseDir + file);
    } catch {
        return "";
    }
}

async function pathIsFile(path: string): Promise<boolean> {
    if (path !== "") {
        return invoke("path_is_file", { path: path });
    }
    return false;
}

async function getParentDir(path: string): Promise<string> {
    if (path !== "") {
        return invoke("get_parent_dir", { path: path });
    }

    const home = await homeDir();
    return home;
}

// It matches theh app arguments. Exits with code 1 if cannot parse succesfully.
async function parseArguments(): Promise<tauriArguments> {
    const home = await homeDir();
    const matches = await getMatches();
    const dir = matches.args.file_directory.value as string;

    return {
        file: "",
        path: home
    };
}

export { parseArguments, openFile, listFilesInPath, getParentDir };
