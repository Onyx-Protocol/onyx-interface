import Path from 'constants/path';

import { MenuItem } from './types';

export const menuItems: MenuItem[] = [
  {
    href: Path.ROOT,
    // Translation key: do not remove this comment
    // t('layout.menuItems.dashboard')
    i18nKey: 'layout.menuItems.dashboard',
    i18nTitleKey: 'layout.menuItems.dashboard',
    icon: 'dashboard',
  },
  {
    href: Path.MARKETS,
    // Translation key: do not remove this comment
    // t('layout.menuItems.markets')
    i18nKey: 'layout.menuItems.markets',
    i18nTitleKey: 'layout.menuItems.markets',
    icon: 'market',
  },
  {
    href: Path.HISTORY,
    // Translation key: do not remove this comment
    // t('layout.menuItems.history')
    i18nKey: 'layout.menuItems.history',
    i18nTitleKey: 'layout.menuItems.history',
    icon: 'history',
  },
  {
    href: Path.SWAP,
    // Translation key: do not remove this comment
    // t('layout.menuItems.swap')
    i18nKey: 'layout.menuItems.swap',
    i18nTitleKey: 'layout.menuItems.swap',
    icon: 'convert',
    isNew: true,
  },
  {
    href: Path.STAKE,
    // Translation key: do not remove this comment
    // t('layout.menuItems.staking')
    i18nKey: 'layout.menuItems.stake',
    i18nTitleKey: 'layout.menuItems.stake',
    icon: 'stake',
  },
  {
    href: Path.GOVERNANCE,
    // Translation key: do not remove this comment
    // t('layout.menuItems.governance')
    i18nKey: 'layout.menuItems.governance',
    i18nTitleKey: 'layout.menuItems.governance',
    icon: 'vote',
  },
  {
    href: Path.XCN,
    // Translation key: do not remove this comment
    // t('layout.menuItems.xcn')
    i18nKey: 'layout.menuItems.xcn',
    i18nTitleKey: 'layout.menuItems.xcn',
    icon: 'xcnOutlined',
  },
  {
    href: Path.LIQUIDATE,
    // Translation key: do not remove this comment
    // t('layout.menuItems.xcn')
    i18nKey: 'layout.menuItems.liquidate',
    i18nTitleKey: 'layout.menuItems.liquidate',
    icon: 'liquidate',
  },
  {
    href: Path.WPUNKS,
    // Translation key: do not remove this comment
    // t('layout.menuItems.xcn')
    i18nKey: 'layout.menuItems.fpunk',
    i18nTitleKey: 'layout.menuItems.fpunk',
    icon: 'wpunksOutlined',
  },
];
