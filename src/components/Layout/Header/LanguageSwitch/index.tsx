/** @jsxImportSource @emotion/react */
import { MenuItem, Select, useTheme } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import { I18N_LOCALSTORAGE_KEY, useTranslation } from 'translation';

import { Icon } from '../../../Icon';
import { useStyles } from './styles';

const ThemeSwitch: React.FC = () => {
  const { t, i18n } = useTranslation();
  const styles = useStyles();
  const theme = useTheme();

  const changeLanguage = (e: SelectChangeEvent<string>) => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem(I18N_LOCALSTORAGE_KEY, e.target.value);
  };

  return (
    <div css={styles.select}>
      <Select
        onChange={changeLanguage}
        defaultValue={i18n.language}
        MenuProps={{
          sx: {
            '&& .Mui-selected': {
              backgroundColor: theme.palette.interactive.hover,
            },
          },
        }}
      >
        <MenuItem value="en">
          <div css={styles.item}>
            <Icon css={styles.itemIcon} name="uk" />
            {t('languageSwitch.english')}
          </div>
        </MenuItem>
        <MenuItem value="tr">
          <div css={styles.item}>
            <Icon css={styles.itemIcon} name="turkey" />
            {t('languageSwitch.turkish')}
          </div>
        </MenuItem>
      </Select>
    </div>
  );
};
export default ThemeSwitch;
