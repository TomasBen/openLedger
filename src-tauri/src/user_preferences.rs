use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::{Error, State};

#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum Theme {
    System,
    Light,
    Dark,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UserPreferences {
    theme: Theme,
    scale_factor: f64,
}

impl Default for UserPreferences {
    fn default() -> Self {
        UserPreferences {
            theme: Theme::System,
            scale_factor: 1.0,
        }
    }
}

#[tauri::command]
pub async fn set_theme(
    theme: String,
    state: State<'_, Mutex<UserPreferences>>,
) -> Result<Theme, Error> {
    let mut user_preferences = state.lock().unwrap();

    let new_theme = match theme.as_str() {
        "system" => Theme::System,
        "light" => Theme::Light,
        "dark" => Theme::Dark,
        _ => Theme::System, // Default to system if invalid value passed
    };

    user_preferences.theme = new_theme.clone();

    Ok(new_theme)
}
