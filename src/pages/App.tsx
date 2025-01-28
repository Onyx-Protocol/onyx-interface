import { Layout, ResetScrollOnRouteChange } from 'components';
import React from 'react';
import { QueryClientProvider } from 'react-query';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'assets/styles/App.scss';
import { queryClient } from 'clients/api';
import { Web3Wrapper } from 'clients/web3';
import Path from 'constants/path';
import { AuthProvider } from 'context/AuthContext';
import { DisableLunaUstWarningProvider } from 'context/DisableLunaUstWarning';
import { SuccessfulTransactionModalProvider } from 'context/SuccessfulTransactionModalContext';
import { ThemeProvider } from 'context/ThemeContext';
// import Dashboard from 'pages/Dashboard';
import History from 'pages/History';
// import Liquidate from 'pages/Liquidate';
import LiquidateDetail from 'pages/Liquidate/Detail';
// import Markets from 'pages/Market';
// import MarketDetails from 'pages/MarketDetails';
import Proposal from 'pages/Proposal';
import Stake from 'pages/Stake';
import Vote from 'pages/Vote';
import VoterDetails from 'pages/VoterDetails';
import VoterLeaderboard from 'pages/VoterLeaderboard';
// import Wpunks from 'pages/Wpunks';
import Xcn from 'pages/Xcn';
import { MuiThemeProvider } from 'theme/MuiThemeProvider';

import FarmPage from './Farm';
import SwapPage from './Swap';

/**
 * Updated by ozdav
 * Just commented to hide some menu links
 */
const App = () => (
  <Web3Wrapper>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MuiThemeProvider>
          <AuthProvider>
            <SuccessfulTransactionModalProvider>
              <DisableLunaUstWarningProvider>
                <HashRouter>
                  <ToastContainer />
                  <Layout>
                    <ResetScrollOnRouteChange />

                    <Switch>
                      {/* <Route exact path={Path.ROOT} component={Dashboard} /> */}

                      {/* <Route exact path={Path.MARKETS} component={Markets} /> */}
                      {/* <Route exact path={Path.MARKET_DETAILS} component={MarketDetails} /> */}

                      <Route exact path={Path.HISTORY} component={History} />

                      <Route exact path={Path.STAKE} component={Stake} />

                      <Route exact path={Path.GOVERNANCE} component={Vote} />
                      <Route
                        exact
                        path={Path.GOVERNANCE_LEADER_BOARD}
                        component={VoterLeaderboard}
                      />
                      <Route exact path={Path.GOVERNANCE_ADDRESS} component={VoterDetails} />
                      <Route exact path={Path.GOVERNANCE_PROPOSAL_DETAILS} component={Proposal} />

                      <Route exact path={Path.XCN} component={Xcn} />

                      {/* <Route exact path={Path.WPUNKS} component={Wpunks} /> */}

                      {/* <Route exact path={Path.LIQUIDATE} component={Liquidate} /> */}

                      <Route exact path={Path.LIQUIDATE_DETAIL} component={LiquidateDetail} />

                      <Route exact path={Path.SWAP} component={SwapPage} />

                      <Route exact path={Path.FARM} component={FarmPage} />

                      <Redirect to={Path.ROOT} />
                    </Switch>
                  </Layout>
                </HashRouter>
              </DisableLunaUstWarningProvider>
            </SuccessfulTransactionModalProvider>
          </AuthProvider>
        </MuiThemeProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </Web3Wrapper>
);

export default App;
