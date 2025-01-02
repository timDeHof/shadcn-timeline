import React from "react";
import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import { ThemeProvider } from "../src/components/providers/theme-provider";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
    layout: 'fullscreen',
    docs: {
      story: {
        inline: true,
      },
      container: ({ children, context }) => (
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="dark min-h-screen bg-background text-foreground">
            {children}
          </div>
        </ThemeProvider>
      ),
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <div className="dark min-h-screen bg-background">
          <div className="container mx-auto max-w-2xl py-10">
            <Story />
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;