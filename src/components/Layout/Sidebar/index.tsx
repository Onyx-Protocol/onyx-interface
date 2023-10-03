/** @jsxImportSource @emotion/react */
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useTranslation } from 'translation';

import { ReactComponent as LogoNoText } from 'assets/img/xcnLogoPure.svg';
import { ReactComponent as LogoNoTextB } from 'assets/img/xcnLogoPureB.svg';
import { ReactComponent as LogoDesktop } from 'assets/img/xcnLogoWithText.svg';
import { ReactComponent as LogoDesktopB } from 'assets/img/xcnLogoWithTextB.svg';
import { ThemeContext } from 'context/ThemeContext';

import { Icon } from '../../Icon';
import ClaimXcnRewardButton from '../ClaimXcnRewardButton';
import ConnectButton from '../ConnectButton';
import { Toolbar } from '../Toolbar';
import { menuItems } from '../constants';
import Link from './Link';
import { useStyles } from './styles';

export const SidebarUi: React.FC = () => {
  const { mode } = React.useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();
  const styles = useStyles();

  const openMenu = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* Desktop and tablet menu */}
      <Drawer variant="permanent" css={styles.drawer}>
        <div css={styles.drawerContent}>
          <Toolbar css={styles.toolbar}>
            <Link href="/">
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
            </Link>
          </Toolbar>

          <List>
            {menuItems.map(menuItem => (
              <ListItemButton
                key={menuItem.i18nKey}
                component="li"
                css={styles.listItem}
                disableRipple
              >
                <Link href={menuItem.href}>
                  <div className="left-border" />

                  <ListItemIcon css={styles.listItemIcon}>
                    <Icon name={menuItem.icon} />
                  </ListItemIcon>

                  <Typography variant="body2" component="span" css={styles.listItemText}>
                    {t(menuItem.i18nKey)}
                  </Typography>

                  {menuItem.isNew && (
                    <div css={styles.listItemNewBadge}>
                      <Typography variant="tiny" css={styles.listItemNewBadgeText}>
                        {t('sidebar.newBadge')}
                      </Typography>
                    </div>
                  )}
                </Link>
              </ListItemButton>
            ))}
          </List>
        </div>
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

            <ConnectButton small fullWidth css={styles.mobileConnectButton} />

            <button type="button" onClick={closeMenu} css={styles.actionButton}>
              <Icon name="close" css={styles.burger} />
            </button>
          </div>

          <List>
            {menuItems.map(({ href, icon, i18nKey, isNew }) => (
              <ListItemButton
                key={i18nKey}
                component="li"
                css={[styles.listItem, styles.mobileListItem]}
                disableRipple
              >
                <Link onClick={closeMenu} href={href}>
                  <div css={styles.mobileLabel}>
                    <ListItemIcon css={styles.listItemIcon}>
                      <Icon name={icon} />
                    </ListItemIcon>

                    <Typography
                      variant="body2"
                      component="span"
                      css={[styles.listItemText, styles.mobileListItemText]}
                    >
                      {t(i18nKey)}
                    </Typography>

                    {isNew && (
                      <div css={styles.listItemNewBadge}>
                        <Typography variant="tiny" css={styles.listItemNewBadgeText}>
                          {t('sidebar.newBadge')}
                        </Typography>
                      </div>
                    )}
                  </div>

                  <Icon name="arrowRight" css={styles.mobileArrow} />
                </Link>
              </ListItemButton>
            ))}
          </List>

          <ClaimXcnRewardButton css={styles.claimXcnRewardButton} />
        </Menu>
      </div>
    </>
  );
};

export default SidebarUi;
