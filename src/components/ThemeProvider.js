import React, { useEffect } from 'react';
import { themes as THEMES } from 'Constants';
import { useSharedState } from 'Utils/Hooks';
import { storeData, getData } from 'Services/Storage';

// const theme = themes[0];

// export { themes, theme };

const ThemeContext = React.createContext();

type PropTypes = {
  children: React.Node,
};

export const ThemeContextProvider = ({ children }: PropTypes) => {
  const [themeID, setThemeID] = useSharedState('theme', THEMES[0].key);
  const theme = THEMES.find(theme => theme.key === themeID);
  return (
    <ThemeContext.Provider value={{ theme, setThemeID }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function withTheme(Component) {
  // eslint-disable-next-line react/display-name
  return props => {
    const { theme, setThemeID } = React.useContext(ThemeContext);
    return (
      <Component
        {...props}
        themes={THEMES}
        theme={theme}
        setTheme={themeId => {
          setThemeID(themeId);
          storeData('theme_id', themeId);
        }}
      />
    );
  };
}
