/** @jsxImportSource @emotion/react */
// import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';
// import { Toggle, ToggleProps } from 'components';
import React, { useMemo } from 'react';
// import { Link } from 'react-router-dom';
import { Asset } from 'types';

import { useGetUserMarketInfo } from 'clients/api';
// import { Icon } from 'components/Icon';
import { AuthContext } from 'context/AuthContext';

import Apy from './Apy';
import Markets from './Markets';
import MyAccount from './MyAccount';
import { useStyles } from './styles';

interface DashboardUiProps {
  accountAddress: string;
  userTotalBorrowLimitCents: BigNumber;
  userTotalBorrowBalanceCents: BigNumber;
  userTotalSupplyBalanceCents: BigNumber;
  assets: Asset[];
}

const DashboardUi: React.FC<DashboardUiProps> = ({
  accountAddress,
  assets,
  userTotalBorrowLimitCents,
  userTotalBorrowBalanceCents,
  userTotalSupplyBalanceCents,
}) => {
  const styles = useStyles();
  const [isXcnEnabled, setIsXcnEnabled] = React.useState(true);
  // const [isInUsdEnabled, setIsInUsdEnabled] = React.useState(true);

  const { suppliedAssets, supplyMarketAssets, borrowingAssets, borrowMarketAssets } =
    useMemo(() => {
      const sortedAssets = assets.reduce(
        (acc, curr) => {
          if (curr.supplyBalance.isGreaterThan(0)) {
            acc.suppliedAssets.push(curr);
          } else {
            acc.supplyMarketAssets.push(curr);
          }

          if (curr.borrowBalance.isGreaterThan(0)) {
            acc.borrowingAssets.push(curr);
          } else {
            acc.borrowMarketAssets.push(curr);
          }
          return acc;
        },
        {
          suppliedAssets: [] as Asset[],
          supplyMarketAssets: [] as Asset[],
          borrowingAssets: [] as Asset[],
          borrowMarketAssets: [] as Asset[],
        },
      );
      return sortedAssets;
    }, [JSON.stringify(assets)]);

  // const handleInUsdToggleChange: ToggleProps['onChange'] = (_event, checked) => {
  //   setIsInUsdEnabled(checked);
  // };

  return (
    <>
      <div css={styles.row}>
        <MyAccount
          assets={assets}
          setIsXcnEnabled={setIsXcnEnabled}
          isXcnEnabled={isXcnEnabled}
          css={styles.column}
          userTotalBorrowLimitCents={userTotalBorrowLimitCents}
          userTotalBorrowBalanceCents={userTotalBorrowBalanceCents}
          userTotalSupplyBalanceCents={userTotalSupplyBalanceCents}
        />

        <Apy
          assets={assets}
          css={styles.column}
          userTotalBorrowLimitCents={userTotalBorrowLimitCents}
          userTotalBorrowBalanceCents={userTotalBorrowBalanceCents}
        />
      </div>

      {/* <div css={styles.rowWithPadding}>
        <div>
          <Link css={styles.link} to="/liquidate">
            Loan Positions
            <Icon name="arrowRight" css={styles.mobileArrow} />
          </Link>
        </div>
      </div> */}

      <Markets
        isXcnEnabled={isXcnEnabled}
        accountAddress={accountAddress}
        userTotalBorrowLimitCents={userTotalBorrowLimitCents}
        suppliedAssets={suppliedAssets}
        supplyMarketAssets={supplyMarketAssets}
        borrowingAssets={borrowingAssets}
        borrowMarketAssets={borrowMarketAssets}
      />
    </>
  );
};

const Dashboard: React.FC = () => {
  const { account } = React.useContext(AuthContext);
  const accountAddress = account?.address || '';
  // TODO: handle loading state (see https://app.clickup.com/t/2d4rcee)
  const {
    data: {
      assets,
      userTotalBorrowLimitCents,
      userTotalBorrowBalanceCents,
      userTotalSupplyBalanceCents,
    },
  } = useGetUserMarketInfo({
    accountAddress,
  });

  return (
    <DashboardUi
      accountAddress={accountAddress}
      assets={assets}
      userTotalBorrowLimitCents={userTotalBorrowLimitCents}
      userTotalBorrowBalanceCents={userTotalBorrowBalanceCents}
      userTotalSupplyBalanceCents={userTotalSupplyBalanceCents}
    />
  );
};

export default Dashboard;
