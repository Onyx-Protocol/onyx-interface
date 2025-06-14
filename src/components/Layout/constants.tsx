import Path from 'constants/path';

import { MenuItem } from './types';

/**
 * Updated by ozdav
 * Just commented to hide some menu links
 */
export const menuItems: MenuItem[] = [
  {
    href: Path.ROOT,
    // Translation key: do not remove this comment
    // t('layout.menuItems.staking')
    i18nKey: 'layout.menuItems.stake',
    i18nTitleKey: 'layout.menuItems.stake',
    icon: 'stake',
  },
  // {
  //   href: Path.ROOT,
  //   // Translation key: do not remove this comment
  //   // t('layout.menuItems.dashboard')
  //   i18nKey: 'layout.menuItems.dashboard',
  //   i18nTitleKey: 'layout.menuItems.dashboard',
  //   icon: 'dashboard',
  // },
  // {
  //   href: Path.MARKETS,
  //   // Translation key: do not remove this comment
  //   // t('layout.menuItems.markets')
  //   i18nKey: 'layout.menuItems.markets',
  //   i18nTitleKey: 'layout.menuItems.markets',
  //   icon: 'market',
  // },
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
    // isNew: true,
  },
  {
    href: Path.FARM,
    // Translation key: do not remove this comment
    // t('layout.menuItems.farm')
    i18nKey: 'layout.menuItems.farm',
    i18nTitleKey: 'layout.menuItems.farm',
    icon: 'farm',
    // isNew: true,
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
    href: Path.AIAGENT,
    // Translation key: do not remove this comment
    // t('layout.menuItems.governance')
    i18nKey: 'layout.menuItems.aiagent',
    i18nTitleKey: 'layout.menuItems.aiagent',
    icon: 'aiagent',
    isNew: true,
  },
  // {
  //   href: Path.XCN,
  //   // Translation key: do not remove this comment
  //   // t('layout.menuItems.xcn')
  //   i18nKey: 'layout.menuItems.xcn',
  //   i18nTitleKey: 'layout.menuItems.xcn',
  //   icon: 'xcnOutlined',
  // },
  // {
  //   href: Path.LIQUIDATE,
  //   // Translation key: do not remove this comment
  //   // t('layout.menuItems.xcn')
  //   i18nKey: 'layout.menuItems.liquidate',
  //   i18nTitleKey: 'layout.menuItems.liquidate',
  //   icon: 'liquidate',
  // },
  // {
  //   href: Path.WPUNKS,
  //   // Translation key: do not remove this comment
  //   // t('layout.menuItems.xcn')
  //   i18nKey: 'layout.menuItems.fpunk',
  //   i18nTitleKey: 'layout.menuItems.fpunk',
  //   icon: 'wpunksOutlined',
  // },
  // TO BE ACTIVATED ONCE CALCULATOR IS READY
  {
    href: Path.GOVERNANCE_LEADER_BOARD,
    // Translation key: do not remove this comment
    // t('layout.menuItems.xcn')
    i18nKey: 'layout.menuItems.leaderboard',
    i18nTitleKey: 'layout.menuItems.leaderboard',
    isNew: true,
    icon: 'xcnOutlined',
  },
  {
    href: Path.POINTS,
    // Translation key: do not remove this comment
    // t('layout.menuItems.points')
    i18nKey: 'layout.menuItems.points',
    i18nTitleKey: 'layout.menuItems.points',
    icon: 'gem',
    isNew: true,
    subMenu: [
      {
        href: Path.POINTS,
        // Translation key: do not remove this comment
        // t('layout.menuItems.pointsDashboard')
        i18nKey: 'layout.menuItems.pointsDashboard',
        i18nTitleKey: 'layout.menuItems.pointsDashboard',
        icon: 'dashboard',
      },
      {
        href: Path.POINTS_LEADERBOARD,
        // Translation key: do not remove this comment
        // t('layout.menuItems.pointsLeaderboard')
        i18nKey: 'layout.menuItems.pointsLeaderboard',
        i18nTitleKey: 'layout.menuItems.pointsLeaderboard',
        icon: 'person',
      },
    ],
  },
];
