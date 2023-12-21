// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use std::path::Path;
mod main_test;

#[tauri::command]
fn path_is_file(path: String) -> bool {
    return Path::new(&path).is_file();
}

#[tauri::command]
fn get_parent_dir(path: String) -> String {
    let path = Path::new(&path).parent().unwrap().to_str().unwrap();
    return path.to_string();
}

// List all markdown files in a path that are not hidden files
#[tauri::command]
fn files_in_path(path: String) -> Vec<String> {
    let mut files = Vec::new();

    match fs::read_dir(path.clone()) {
        Ok(entries) => {
            for entry in entries {
                match entry {
                    Ok(entry) => {
                        let file_name = entry.file_name().to_str().unwrap().to_string();
                        if !file_name.starts_with(".") && file_name.ends_with(".md") {
                            files.push(file_name);
                        }
                    }
                    Err(err) => println!("{}", err),
                }
            }
        }

        Err(err) => println!("Error al listar archivos en '{}': {}", path, err),
    }

    return files;
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            files_in_path,
            get_parent_dir,
            path_is_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
