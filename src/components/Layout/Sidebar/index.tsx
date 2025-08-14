/** @jsxImportSource @emotion/react */
import { Box } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import { useWeb3React } from '@web3-react/core';
import { ONYX_CHAIN_ID } from 'config';
import React, { useState } from 'react';
import { useTranslation } from 'translation';

import { ReactComponent as LogoNoText } from 'assets/img/xcnLogoPure.svg';
import { ReactComponent as LogoNoTextB } from 'assets/img/xcnLogoPureB.svg';
import { ReactComponent as LogoDesktop } from 'assets/img/xcnLogoWithText.svg';
import { ReactComponent as LogoDesktopB } from 'assets/img/xcnLogoWithTextB.svg';
import { ThemeContext } from 'context/ThemeContext';

import { Icon } from '../../Icon';
import { AddNetworkButton } from '../AddNetworkButton';
import ClaimXcnRewardButton from '../ClaimXcnRewardButton';
import ConnectButton from '../ConnectButton';
import LanguageSwitch from '../Header/LanguageSwitch';
import { Toolbar } from '../Toolbar';
import { menuItems } from '../constants';
import Link from './Link';
import { useStyles } from './styles';

export const SidebarUi: React.FC = () => {
  const { mode } = React.useContext(ThemeContext);
  const { chainId, active: isConnected } = useWeb3React();

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [openSubMenuKey, setOpenSubMenuKey] = useState<string | null>(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();
  const styles = useStyles();

  const isOnOnyxChain = chainId === ONYX_CHAIN_ID;
  const shouldShowAddNetwork = isConnected && !isOnOnyxChain;

  const openMenu = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleSubMenuToggle = (key: string) => {
    setOpenSubMenuKey(prev => (prev === key ? null : key));
  };

  const renderMenuItem = (menuItem: typeof menuItems[0], isMobile = false) => {
    const hasSubMenu = menuItem.subMenu && menuItem.subMenu.length > 0;
    const isOpen = openSubMenuKey === menuItem.i18nKey;

    let handleClick;
    if (hasSubMenu) {
      handleClick = () => handleSubMenuToggle(menuItem.i18nKey);
    } else if (isMobile) {
      handleClick = closeMenu;
    } else {
      handleClick = undefined;
    }

    let content;
    if (hasSubMenu) {
      content = (
        <span className="menu-link-content" css={styles.menuLinkContent}>
          {/* <div className="left-border" /> */}
          <ListItemIcon css={styles.listItemIcon}>
            <Icon name={menuItem.icon} />
          </ListItemIcon>
          <Typography
            variant="body2"
            component="span"
            css={[styles.listItemText, isMobile && styles.mobileListItemText]}
          >
            {t(menuItem.i18nKey)}
          </Typography>
          {menuItem.isNew && (
            <div css={styles.listItemNewBadge}>
              <Typography variant="tiny" css={styles.listItemNewBadgeText}>
                {t('sidebar.newBadge')}
              </Typography>
            </div>
          )}
          <span css={styles.chevronIcon}>
            <Icon name={isOpen ? 'chevronUp' : 'chevronDown'} size="24" />
          </span>
        </span>
      );
    } else {
      content = (
        <Link href={menuItem.href} onClick={isMobile ? closeMenu : undefined}>
          {/* <div className="left-border" /> */}
          <ListItemIcon css={styles.listItemIcon}>
            <Icon name={menuItem.icon} />
          </ListItemIcon>
          <Typography
            variant="body2"
            component="span"
            css={[styles.listItemText, isMobile && styles.mobileListItemText]}
          >
            {t(menuItem.i18nKey)}
          </Typography>
          {menuItem.isNew && (
            <div css={styles.listItemNewBadge}>
              <Typography variant="tiny" css={styles.listItemNewBadgeText}>
                {t('sidebar.newBadge')}
              </Typography>
            </div>
          )}
          {isMobile && <Icon name="arrowRight" css={styles.mobileArrow} />}
        </Link>
      );
    }

    return (
      <React.Fragment key={menuItem.i18nKey}>
        <ListItemButton
          component="li"
          css={[styles.listItem, isMobile && styles.mobileListItem]}
          disableRipple
          onClick={handleClick}
        >
          {content}
        </ListItemButton>
        {hasSubMenu && isOpen && (
          <List component="div" disablePadding css={styles.subMenu}>
            {menuItem.subMenu?.map(subMenuItem => (
              <ListItemButton
                key={subMenuItem.i18nKey}
                component="li"
                css={[styles.listItem, styles.subMenuItem, isMobile && styles.mobileListItem]}
                disableRipple
                onClick={isMobile ? closeMenu : undefined}
              >
                <Link href={subMenuItem.href} onClick={isMobile ? closeMenu : undefined}>
                  <ListItemIcon css={styles.listItemIcon}>
                    <Icon name={subMenuItem.icon} />
                  </ListItemIcon>
                  <Typography
                    variant="body2"
                    component="span"
                    css={[styles.listItemText, isMobile && styles.mobileListItemText]}
                  >
                    {t(subMenuItem.i18nKey)}
                  </Typography>
                </Link>
              </ListItemButton>
            ))}
          </List>
        )}
      </React.Fragment>
    );
  };

  return (
    <>
      {/* Desktop and tablet menu */}
      <Drawer variant="permanent" css={styles.drawer}>
        <div css={styles.drawerContent}>
          <Toolbar css={styles.toolbar}>
            {mode === 'dark' ? (
              <>
                <LogoDesktop css={styles.logo} />
                <LogoNoText css={styles.logoClosed} />
              </>
            ) : (
              <>
                <LogoDesktopB css={styles.logo} />
                <LogoNoTextB css={styles.logoClosed} />
              </>
            )}
          </Toolbar>

          <List>{menuItems.map(menuItem => renderMenuItem(menuItem))}</List>
        </div>
        {shouldShowAddNetwork && (
          <Box css={styles.addNetworkContainer}>
            <p>{t('sidebar.addNetworkLabel')}</p>
            <AddNetworkButton css={styles.addNetworkButton} />
          </Box>
        )}
      </Drawer>

      {/* Mobile menu */}
      <div css={styles.mobileMenuBox}>
        <div css={styles.flexRow}>
          <Icon name="logoMobile" css={styles.mobileLogo} />

          <ConnectButton small fullWidth css={styles.mobileConnectButton} />

          <button type="button" onClick={openMenu} css={styles.actionButton}>
            <Icon name="burger" css={styles.burger} />
          </button>
        </div>

        <Menu
          css={styles.mobileMenu}
          className="mobile-menu"
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={closeMenu}
          transitionDuration={0}
          marginThreshold={0}
          TransitionProps={{ style: { transition: 'background 0.2s linear' } }}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 0, left: 0 }}
        >
          <div css={[styles.flexRow, styles.doublePadding]}>
            <Icon name="logoMobile" css={styles.mobileLogo} />
            <button type="button" onClick={closeMenu} css={styles.actionButton}>
              <Icon name="close" css={styles.burger} />
            </button>
          </div>

          <List>{menuItems.map(menuItem => renderMenuItem(menuItem, true))}</List>

          <ClaimXcnRewardButton css={styles.claimXcnRewardButton} />
          <div css={styles.mobileButtonsContainer}>
            {shouldShowAddNetwork && (
              <AddNetworkButton small fullWidth css={styles.menuMobileButton} />
            )}
            <ConnectButton small fullWidth css={styles.menuMobileButton} />
          </div>
          <LanguageSwitch />
        </Menu>
      </div>
    </>
  );
};

export default SidebarUi;
