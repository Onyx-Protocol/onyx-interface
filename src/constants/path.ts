enum Path {
  ROOT = '/',
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
}

export default Path;
