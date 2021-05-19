import { createContext } from 'react';

const ThemeContext = createContext({
    theme: 'primary',
    onChange: () => {},
});

ThemeContext.displayName = 'ThemeContext'

export default ThemeContext;