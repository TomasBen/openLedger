use serde::{Deserialize, Serialize};
use serde_json::to_string_pretty;
use std::fs;
use std::path::PathBuf;
use std::sync::{Mutex, MutexGuard};
use tauri::{Error, State, Theme};

pub use tauri::webview::Webview;
pub use tauri::window::Window;

#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
#[serde(rename_all = "PascalCase")]
pub enum Language {
    English,
    Spanish,
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
pub struct UserPreferences {
    #[serde(rename = "Language")]
    pub language: Language,
    #[serde(rename = "Theme")]
    pub theme: Option<Theme>,
    #[serde(rename = "ScaleFactor")]
    pub scale_factor: f64,
    #[serde(rename = "Fullscreem")]
    pub fullscreen: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum PreferenceUpdate {
    Full(UserPreferences),
    Language(Language),
    Theme(Theme),
    ScaleFactor(f64),
    Fullscreen(bool),
}

#[derive(Debug, Clone, Serialize)]
pub struct AppState {
    pub user_preferences: UserPreferences,
    pub app_config_path: PathBuf,
}

impl Default for UserPreferences {
    fn default() -> Self {
        UserPreferences {
            language: Language::English,
            theme: Some(Theme::Light),
            scale_factor: 1.0,
            fullscreen: true,
        }
    }
}

impl Default for AppState {
    fn default() -> Self {
        AppState {
            user_preferences: UserPreferences::default(),
            app_config_path: PathBuf::from("undefined"),
        }
    }
}

impl UserPreferences {
    fn update(&mut self, update: PreferenceUpdate) -> Result<(), Error> {
        match update {
            PreferenceUpdate::Full(prefs) => *self = prefs,
            PreferenceUpdate::Language(language) => self.language = language,
            PreferenceUpdate::Theme(theme) => self.theme = Some(theme),
            PreferenceUpdate::ScaleFactor(scale_factor) => self.scale_factor = scale_factor,
            PreferenceUpdate::Fullscreen(fullscreen) => self.fullscreen = fullscreen,
        }

        println!("{:?}", &self);

        Ok(())
    }

    /* Consider using tokio for async I/O operations in the future */

    fn save_to_file(self: &Self, mut path: PathBuf) -> Result<(), Error> {
        // conver the UserPreferences struct to a pretty printed json
        let json = to_string_pretty(self).map_err(|e| {
            std::io::Error::new(
                std::io::ErrorKind::Other,
                format!("JSON serialization error: {}", e),
            )
        })?;

        path.push("preferences.json");

        println!(
            "Saving preferences to the following path: {:?} \n \n {}",
            path, &json
        );

        fs::write(path, json).map_err(|e| {
            std::io::Error::new(
                std::io::ErrorKind::Other,
                format!("Failed to write preferences file: {}", e),
            )
        })?;

        Ok(())
    }

    pub fn load_from_file(
        self: &Self,
        app_state: &MutexGuard<'_, AppState>,
    ) -> Result<UserPreferences, Error> {
        let mut path = app_state.app_config_path.clone();
        path.push("preferences.json");

        match fs::read_to_string(&path) {
            Ok(content) => {
                println!("reading preferences from path: {:?}", path);

                match serde_json::from_str::<UserPreferences>(&content) {
                    Ok(preferences) => {
                        println!("successfully loaded preferences!");
                        Ok(preferences)
                    }
                    Err(e) => {
                        println!("Failed to parse preferences JSON: {:?}, using defaults", e);
                        Ok(UserPreferences::default())
                    }
                }
            }
            Err(e) => {
                println!("Failed to read preferences file: {:?}, using defaults", e);
                Ok(UserPreferences::default())
            }
        }
    }
}

#[tauri::command]
pub async fn update_preferences(
    new_preferences: PreferenceUpdate,
    state: State<'_, Mutex<AppState>>,
) -> Result<(), Error> {
    let mut app_state = state.lock().unwrap();

    match app_state.user_preferences.update(new_preferences) {
        Ok(()) => {
            println!("[Rust::update_preferences] preferences updated successfully!");
            Ok(())
        }
        Err(e) => {
            println!(
                "[Rust::update_preferences] there was an error while updating preferences!: {}",
                e
            );
            Ok(())
        }
    }
}

#[tauri::command]
pub async fn get_preferences(state: State<'_, Mutex<AppState>>) -> Result<UserPreferences, Error> {
    let app_state = state.lock().unwrap();

    let preferences = &app_state.user_preferences;

    Ok(preferences.clone())
}

#[tauri::command]
pub async fn save_preferences(state: State<'_, Mutex<AppState>>) -> Result<String, Error> {
    let app_state = state.lock().unwrap();

    // need to handle errors in all async functions here

    match app_state
        .user_preferences
        .save_to_file(app_state.app_config_path.clone())
    {
        Ok(()) => Ok("[Rust::save_preferences]preferences successfully saved".to_string()),
        Err(e) => Ok(format!(
            "[Rust::save_preferences]failed to save preferences: {}",
            e
        )),
    }
}

#[tauri::command]
pub async fn set_to_fullscreen(window: Window) -> Result<String, Error> {
    match window.set_fullscreen(true) {
        Ok(()) => Ok("window set to fullscreen succesfully".to_string()),
        Err(e) => Ok(format!(
            "error when trying to set the window to fullscreen: {}",
            e
        )),
    }
}
