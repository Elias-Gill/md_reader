import { invoke } from "@tauri-apps/api/tauri";

export async function listFiles(path: string): string[] {
    invoke("files_in_path", { path: path })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error(error);
        });
}
