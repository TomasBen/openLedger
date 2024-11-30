use serde::{Deserialize, Serialize};
use serde_json::to_string_pretty;
use std::fs;
use std::path::PathBuf;
use std::sync::{Mutex, MutexGuard};
use tauri::{Error, State, Theme};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum Language {
    English,
    Spanish,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserPreferences {
    pub language: Language,
    pub theme: Option<Theme>,
    pub scale_factor: f64,
    pub fullscreen: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum PreferenceUpdate {
    Full(UserPreferences),
    Language { language: Language },
    Theme { theme: Theme },
    ScaleFactor { scale_factor: f64 },
    Fullscreen { fullscreen: bool },
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

#[derive(Debug, Clone, Serialize)]
pub struct AppState {
    pub user_preferences: UserPreferences,
    pub app_config_path: PathBuf,
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
            PreferenceUpdate::Language { language } => self.language = language,
            PreferenceUpdate::Theme { theme } => self.theme = Some(theme),
            PreferenceUpdate::ScaleFactor { scale_factor } => self.scale_factor = scale_factor,
            PreferenceUpdate::Fullscreen { fullscreen } => self.fullscreen = fullscreen,
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

    app_state.user_preferences.update(new_preferences)?;

    Ok(())
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
        Ok(()) => Ok("preferences successfully saved".to_string()),
        Err(e) => Ok(format!("failed to save preferences: {}", e)),
    }
}
