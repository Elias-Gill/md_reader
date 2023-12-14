import { invoke } from "@tauri-apps/api/tauri";
import { readTextFile } from "@tauri-apps/api/fs";
import { getMatches } from "@tauri-apps/api/cli";
import { exit } from "@tauri-apps/api/process";
import { homeDir } from "@tauri-apps/api/path";

type tauriArguments = {
    path: string;
    file: string;
};

const ISFILE = 1;
const ISPATH = 2;
const NOTEXISTS = 3;

function resolvePath(path: string): number {
    invoke("resolve_path", { path: path })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error(error);
        });

    return NOTEXISTS;
}

export function listFilesInPath(path: string): string[] {
    invoke("files_in_path", { path: path })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error(error);
        });

    return ["no file"];
}

export function openFile(file: string): string {
    try {
        readTextFile(file).then((value) => {
            return value;
        });
    } catch (error) {
        console.error("Cannot open file: " + error);
    }
    return "";
}

export function getHomeDir(): string {
    homeDir().then((value) => {
        return value;
    });

    return "";
}

// It matches theh app arguments. Exits with code 1 if cannot parse succesfully.
export function parseArguments(): tauriArguments {
    try {
        getMatches().then((matches) => {
            const path = matches.args.file_directory.value;
            const status = resolvePath(path as string);

            switch (status) {
                case NOTEXISTS:
                    exit(1);
                    return;

                default:
                    break;
            }

            return {};
        });
    } catch {
        exit(1);
    }

    // NOTE: unrecheable code
    return {
        path: "",
        file: ""
    };
}
