/** @jsxImportSource @emotion/react */
import React from 'react';

import MoonIcon from 'assets/img/moon.png';
import SunIcon from 'assets/img/sun.png';
import { ThemeContext } from 'context/ThemeContext';

import { useStyles } from './styles';

const ThemeSwitch: React.FC = () => {
  const styles = useStyles();
  const { mode, updateThemeMode } = React.useContext(ThemeContext);

  return (
    <div css={styles.switchArea}>
      {mode === 'dark' ? (
        <img src={MoonIcon} css={styles.icon} alt="moon" onClick={() => updateThemeMode('light')} />
      ) : (
        <img
          src={SunIcon}
          css={styles.iconRight}
          alt="sun"
          onClick={() => updateThemeMode('dark')}
        />
      )}
    </div>
  );
};
export default ThemeSwitch;
