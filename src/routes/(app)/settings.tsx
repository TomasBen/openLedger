import { usePreferencesStore } from '@/stores/UserPreferencesStore';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/settings')({
  component: Settings,
});

function Settings() {
  const { preferences } = usePreferencesStore();

  return (
    <div>
      this is the preferences page
      {preferences.Theme}
    </div>
  );
}
