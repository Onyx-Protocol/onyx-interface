/** @jsxImportSource @emotion/react */
import { Select as MuiSelect } from '@mui/material';
import { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import React, { useMemo, useState } from 'react';

import { useIsSmDown } from 'hooks/responsive';

import { TextButton } from '../Button';
import { Icon } from '../Icon';
import { SELECTED_MENU_ITEM_CLASSNAME, useStyles } from './styles';

interface Option {
  value: string;
  label: string;
  image?: string;
}

export interface SelectProps {
  className?: string;
  options: Option[];
  value: string | undefined;
  onChange: (e: SelectChangeEvent) => void;
  ariaLabel: string;
  title: string;
  buttonVariant?: boolean;
  showOnlyImage?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  className,
  options,
  value,
  onChange,
  ariaLabel,
  title,
  buttonVariant = false,
  showOnlyImage = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const styles = useStyles();
  const isSmDown = useIsSmDown();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const renderValue = (selected: string) => {
    const option = options.find(opt => opt.value === selected);
    if (!option) return title;

    if (showOnlyImage && option.image) {
      return <img src={option.image} alt={option.label} css={styles.image} />;
    }

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {option.image && <img src={option.image} alt={option.label} css={styles.image} />}
        {option.label}
      </div>
    );
  };

  const menuProps = useMemo(() => {
    const mobileStyles: Partial<MenuProps> = {
      transformOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      anchorReference: 'none',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
    };
    return {
      PaperProps: {
        sx: styles.menuWrapper,
      },
      ...(isSmDown ? mobileStyles : {}),
    };
  }, [isSmDown]);

  return (
    <MuiSelect
      open={isOpen}
      onClose={handleClose}
      onOpen={handleOpen}
      className={className}
      css={styles.root({ isOpen, buttonVariant, showOnlyImage })}
      value={value}
      onChange={onChange}
      displayEmpty
      inputProps={{ 'aria-label': ariaLabel }}
      renderValue={buttonVariant ? renderValue : undefined}
      IconComponent={() =>
        buttonVariant ? null : (
          <Icon css={styles.getArrowIcon({ isMenuOpened: isOpen })} name="arrowUp" />
        )
      }
      MenuProps={menuProps}
      autoWidth={isSmDown}
    >
      <div css={styles.mobileHeader}>
        <Typography variant="h4">{title}</Typography>

        <TextButton css={styles.closeMenuButton} onClick={handleClose}>
          <Icon name="close" />
        </TextButton>
      </div>
      {options.map(({ value: v, label, image }) => (
        <MenuItem
          disableRipple
          css={styles.menuItem}
          key={v}
          classes={{ selected: SELECTED_MENU_ITEM_CLASSNAME }}
          value={v}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {image && <img src={image} alt={label} css={styles.image} />}
            {label}
          </div>
        </MenuItem>
      ))}
    </MuiSelect>
  );
};
