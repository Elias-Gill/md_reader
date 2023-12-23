import { invoke } from "@tauri-apps/api/tauri";
import { readTextFile } from "@tauri-apps/api/fs";
import { homeDir } from "@tauri-apps/api/path";
import { getMatches } from "@tauri-apps/api/cli";

import snarkdown from "snarkdown";
import hljs from "highlight.js";
import "highlight.js/styles/monokai.css";

export type tauriArguments = {
    path: string;
    file: string;
};

async function listFilesInPath(path: string): Promise<string[]> {
    return invoke("files_in_path", { path: path });
}

async function getTimeStamp(file: string, baseDir: string): Promise<number> {
    try {
        return invoke("get_file_timestamp", { path: baseDir + file });
    } catch {
        return 0;
    }
}

function higlightCode(doc: Document) {
    const elements = doc.querySelectorAll(".code");
    for (let i = 0; i < elements.length; i++) {
        let language = elements[0].classList[1];
        if (language == undefined) {
            language = "text";
        }
        const aux = elements[i].children[0].innerHTML;

        elements[i].children[0].innerHTML = hljs.highlight(aux, {
            language: language
        }).value;
    }
}

function markdownToHtml(text: string): string {
    const html = snarkdown(text);

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    higlightCode(doc);

    return doc.body.innerHTML;
}

async function openFile(file: string, baseDir: string): Promise<string> {
    try {
        console.log("oppening file: ", baseDir + file);
        const content = await readTextFile(baseDir + file);
        return markdownToHtml(content);
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

export { parseArguments, openFile, listFilesInPath, getTimeStamp };
