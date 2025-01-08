use std::sync::Mutex;
use tauri::Manager;
use tauri_plugin_sql::{Migration, MigrationKind};
use user_preferences::AppState;

pub use tauri::window::Window;

pub mod user_preferences;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![Migration {
        version: 1,
        description: "initial database creation",
        sql: include_str!("../migrations/0001_initial_tables.sql"),
        kind: MigrationKind::Up,
    }];

    tauri::Builder::default()
        .manage(Mutex::new(AppState::default()))
        .setup(|app| {
            // get the app's config dir
            let app_config_dir = app.handle().path().app_config_dir()?;
            let state = app.state::<Mutex<AppState>>();

            // get the AppState struct previously initialized
            let mut app_state = state.lock().unwrap();

            // set the app_config_path to the previously retrieved AppData dir. Platform agnostic.
            app_state.app_config_path = app_config_dir;

            let user_preferences = app_state.user_preferences;

            app_state.user_preferences = user_preferences.load_from_file(&app_state).unwrap();
            app.set_theme(app_state.user_preferences.theme);

            Ok(())
        })
        .plugin(
            tauri_plugin_log::Builder::new()
                .timezone_strategy(tauri_plugin_log::TimezoneStrategy::UseLocal)
                .level(log::LevelFilter::Info)
                .build(),
        )
        .plugin(
            tauri_plugin_sql::Builder::new()
                .add_migrations("sqlite:accsw.db", migrations)
                .build(),
        )
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            user_preferences::update_preferences,
            user_preferences::get_preferences,
            user_preferences::set_to_fullscreen
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
