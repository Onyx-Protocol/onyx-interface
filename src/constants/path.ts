/**
 * Updated by ozdav
 * Just Updated ROOT path for changing default path
 */
enum Path {
  // ROOT = '/',
  ROOT = '/stake',
  XCN = '/xcn',
  WPUNKS = '/wpunks',
  MARKETS = '/markets',
  MARKET_DETAILS = '/market/:oTokenId',
  HISTORY = '/history',
  STAKE = '/stake',
  GOVERNANCE = '/governance',
  GOVERNANCE_LEADER_BOARD = '/governance/leaderboard',
  GOVERNANCE_PROPOSAL_DETAILS = '/governance/proposal/:id',
  GOVERNANCE_ADDRESS = '/governance/address/:address',
  LIQUIDATE = '/liquidate',
  LIQUIDATE_DETAIL = '/liquidate/:userId',
  SWAP = '/swap',
  FARM = '/farm',
  AIAGENT = 'https://ai.onyx.org/',
  POINTS = '/points-dashboard',
  POINTS_LEADERBOARD = '/points-leaderboard',
}

export default Path;
