import { ActionIcon, Anchor, createTheme, TextInput } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'navy-blue',
  colors: {
    'navy-blue': [
      "#ebf4ff",
      "#d4e5fa",
      "#a3c8f7",
      "#71aaf6",
      "#4b91f5",
      "#3781f5",
      "#2d79f6",
      "#2368dc",
      "#195cc5",
      "#004fad"
    ],
  },
  components: {
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        color: 'var(--color-on-surface-variant)'
      }
    }),
    Anchor: Anchor.extend({
      defaultProps: {
        color: 'var(--color-on-surface-variant)',
      }
    })
  }
});
