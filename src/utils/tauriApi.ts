import { invoke } from "@tauri-apps/api/tauri";
import { BaseDirectory, readTextFile } from "@tauri-apps/api/fs";
import { getMatches } from "@tauri-apps/api/cli";
import { exit } from "@tauri-apps/api/process";
import { homeDir } from "@tauri-apps/api/path";

export type tauriArguments = {
    path: string;
    file: string;
};

const ISFILE = 1;
const ISPATH = 2;
const NOTEXISTS = 3;

function listFilesInPath(path: string): string[] {
    invoke("files_in_path", { path: path })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error(error);
        });

    return ["no files"];
}

function openFile(file: string, baseDir: string): string {
    try {
        readTextFile(baseDir + file).then((value) => {
            return value;
        });
    } catch (error) {
        console.error("Cannot open file: " + error);
    }
    return "";
}

function getHomeDir(): string | void {
    homeDir().then((value) => {
        return value;
    });
}

function resolvePath(path: string): number | void {
    invoke("resolve_path", { path: path })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error(error);
        });

    return NOTEXISTS;
}

// It matches theh app arguments. Exits with code 1 if cannot parse succesfully.
function parseArguments(): tauriArguments | void {
    getMatches().then((matches) => {
        const dir = matches.args.file_directory.value;
        const status = resolvePath(dir as string) as number;

        switch (status) {
            case NOTEXISTS:
                exit(1);
                return;
            case ISFILE:
                return { path: dir, file: "" };
            case ISPATH:
                return { file: dir, path: BaseDirectory.App };
        }
    });
}

export { parseArguments, getHomeDir, openFile, listFilesInPath };
