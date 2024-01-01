// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use std::path::Path;
mod main_test;
use filetime::FileTime;

#[tauri::command]
fn path_is_file(path: String) -> bool {
    return Path::new(&path).is_file();
}

#[tauri::command]
fn open_file(path: String) -> String {
    // unsafe auto CURRENT_OPENED_FILE = path;
    match fs::read_to_string(path.clone()) {
        Ok(content) => return content,
        Err(err) => {
            return String::from("Cannot open the file: ".to_string() + err.to_string().as_str())
        }
    }
}

#[tauri::command]
fn get_file_timestamp(path: String) -> i64 {
    match fs::metadata(path) {
        Ok(metadata) => return FileTime::from_last_modification_time(&metadata).seconds(),
        Err(_err) => {
            return 0;
        }
    }
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

#[tauri::command]
fn print_tauri(msg: String) {
    println!("{}", msg);
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            files_in_path,
            get_parent_dir,
            path_is_file,
            open_file,
            get_file_timestamp,
            print_tauri,
        ])
        .run(tauri::generate_context!())
        .expect("Error while running tauri application");
}
