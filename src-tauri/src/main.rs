// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::fs;
use std::path::Path;
use std::path::Path;


// returns whether a path is a file (1), a directory (2) or it does not exists (3)
#[tauri::command]
fn resolve_path(path: String) -> Int8 {
   let path = Path::new(path);

   if path.is_file() {
       return 1
   } else if path.is_dir() {
       return 2
   } else {
       return 3
   }
}

// list all files in a path
#[tauri::command]
fn files_in_path(path: String) -> Vec<String> {
    let mut paths: Vec<String> = Vec::new();

    let dir = Path::new(&path);
    if !std::path::Path::is_dir(dir) {
        println!("The proporcioned path is not a directory or does not exists");
        return paths;
    };

    for item in fs::read_dir(path).unwrap() {
        match item {
            Ok(dirty_file) => match dirty_file.file_type() {
                // add to the list if the item is a file
                Ok(file) => {
                    if !file.is_file() {
                        println!("is not a file");
                        continue;
                    }

                    paths.push(
                        dirty_file.file_name().
                        into_string().
                        unwrap());
                }

                Err(_) => println!("Ignored path"),
            },

            Err(_) => println!("Cannot open the path"),
        }
    }

    return paths;
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![files_in_path, resolve_path])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
