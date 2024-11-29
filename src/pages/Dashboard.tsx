import { invoke } from "@tauri-apps/api/core";

type Language = "English" | "Spanish";
type Theme = "System" | "Light" | "Dark";

interface UserPreferences {
  language: Language;
  theme: Theme;
  scale_factor: number;
  fullscreen: boolean;
}

interface PreferenceUpdate {
  Full: UserPreferences;
  Language: { language: Language };
  Theme: { theme: Theme };
  ScaleFactor: { scale_factor: number };
  Fullscreen: { fullscreen: boolean };
}

export default function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>

      <button onClick={async () => await invoke("get_preferences")}>
        get user preferences
      </button>

      <button
        onClick={async () =>
          await invoke("update_preferences", {
            newPreferences: {
              Theme: { theme: "Dark" },
            } as PreferenceUpdate,
          })
        }
      >
        update preferences to dark mode
      </button>

      <button
        onClick={async () =>
          await invoke("update_preferences", {
            newPreferences: {
              Full: {
                language: "English",
                theme: "Light",
                scale_factor: 1.5,
                fullscreen: true,
              },
            } as PreferenceUpdate,
          })
        }
      >
        update entire preferences
      </button>
    </>
  );
}
