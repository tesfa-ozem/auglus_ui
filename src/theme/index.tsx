import React, { createContext, useContext } from 'react';
import {
    ThemeProvider as MuiThemeProvider,
    createTheme,
} from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

import { components } from './components.js';
import palettes from './palettes.js';
import * as typography from './typography.js';
import '@fontsource/roboto/100.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/montserrat-alternates';

const ThemeContext = createContext<PaletteMode>('light');

export const ThemeProvider: React.FC = ({ children }) => {
    const theme = useTheme();

    return (
        <ThemeContext.Provider value={theme}>
            <MuiThemeProvider theme={createMuiTheme(theme)}>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = (): PaletteMode => useContext(ThemeContext);

const createMuiTheme = (mode: PaletteMode) => {
    const { palette } = createTheme({ palette: palettes[mode] });
    return createTheme(
        {
            palette,
            typography: typography.options,
            components: components(palette),
        },
        {
            typography: typography.overrides,
        }
    );
};
