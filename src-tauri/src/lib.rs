use std::sync::Mutex;
use tauri::Manager;
use tauri_plugin_sql::{Migration, MigrationKind};
use user_preferences::UserPreferences;

pub mod user_preferences;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![Migration {
        version: 1,
        description: "initial database creation",
        sql: include_str!("../migrations/0001_client_representative_table.sql"),
        kind: MigrationKind::Up,
    }];

    tauri::Builder::default()
        .setup(|app| {
            app.manage(Mutex::new(UserPreferences::default()));

            Ok(())
        })
        .plugin(
            tauri_plugin_sql::Builder::new()
                .add_migrations("sqlite:accsw.db", migrations)
                .build(),
        )
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            user_preferences::update_preferences,
            user_preferences::get_preferences
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
