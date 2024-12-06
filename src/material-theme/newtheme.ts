import { createSystem, defineConfig } from '@chakra-ui/react';

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {},
    },
  },
});

export const system = createSystem(customConfig);
