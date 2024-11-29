use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::{Error, State};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum Language {
    English,
    Spanish,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum Theme {
    System,
    Light,
    Dark,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserPreferences {
    language: Language,
    theme: Theme,
    scale_factor: f64,
    fullscreen: bool,
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
            theme: Theme::System,
            scale_factor: 1.0,
            fullscreen: true,
        }
    }
}

impl UserPreferences {
    fn update(&mut self, update: PreferenceUpdate) -> Result<(), Error> {
        match update {
            PreferenceUpdate::Full(prefs) => *self = prefs,
            PreferenceUpdate::Language { language } => self.language = language,
            PreferenceUpdate::Theme { theme } => self.theme = theme,
            PreferenceUpdate::ScaleFactor { scale_factor } => self.scale_factor = scale_factor,
            PreferenceUpdate::Fullscreen { fullscreen } => self.fullscreen = fullscreen,
        }

        println!("{:?}", &self);

        Ok(())
    }
}

#[tauri::command]
pub async fn update_preferences(
    new_preferences: PreferenceUpdate,
    state: State<'_, Mutex<UserPreferences>>,
) -> Result<(), Error> {
    match new_preferences {
        _ => {
            println!("{:?}", new_preferences);

            let mut preferences = state.lock().unwrap();
            preferences.update(new_preferences)?;

            Ok(())
        }
    }
}

#[tauri::command]
pub async fn get_preferences(state: State<'_, Mutex<UserPreferences>>) -> Result<Theme, Error> {
    let prefs = state.lock().unwrap();

    println!("{:?}", &prefs);

    Ok(prefs.theme.clone())
}
