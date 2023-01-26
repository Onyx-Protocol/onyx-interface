/** @jsxImportSource @emotion/react */
import BigNumber from 'bignumber.js';
import { LiquidateAccordion } from 'components';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { formatCentsToReadableValue, generateEthScanUrl, truncateAddress } from 'utilities';

import copyImg from 'assets/img/copy.svg';
import linkImg from 'assets/img/link.svg';
import useCopyToClipboard from 'hooks/useCopyToClipboard';

import { useStyles } from './styles';

const CardList = ({ markets = [], users = [], isFetching, loadFinished }: any) => {
  const styles = useStyles();
  const getTokenPrice = (token: any) =>
    (markets || []).find((market: any) => market.address === token.market.id)?.tokenPrice ||
    new BigNumber(0);

  const { t } = useTranslation();

  const copyWalletAddress = useCopyToClipboard(t('interactive.copy.walletAddress'));

  const [expandedIdx, setExpanded] = React.useState<number | undefined>(0);

  return (
    <div css={styles.cardList}>
      <div css={styles.userList}>
        {users.length === 0 && loadFinished && <div className="noUsers">No Users</div>}
        {users
          .sort((a: any, b: any) => b.borrowPercent - a.borrowPercent)
          .map((user: any, idx: number) => {
            let barBg = 'rgba(30, 185, 166, 1)';

            if (user.borrowPercent >= 100) {
              barBg = '#f37056';
            }

            const key = `action-item${idx}`;

            return (
              <>
                <div className="userCard" key={user.id}>
                  <div className="userInfo">
                    <div className="action">
                      <span onClick={() => copyWalletAddress(user.id)}>
                        <img src={copyImg} alt="copy" />
                      </span>

                      <a
                        href={generateEthScanUrl(user.id, 'address')}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={linkImg} alt="link" />
                      </a>
                    </div>
                    <div className="info">
                      <div
                        className="percent"
                        style={{
                          color: `${barBg}`,
                        }}
                      >
                        {user.borrowPercent.toFixed(2)}%
                      </div>
                      <div className="address">{truncateAddress(user.id)}</div>
                    </div>
                  </div>
                  <div className="tokenList">
                    {user.tokens
                      .filter(
                        (token: any) =>
                          !new BigNumber(token.cTokenBalance).isZero() ||
                          !new BigNumber(token.storedBorrowBalance).isZero(),
                      )
                      .map((token: any) => (
                        <div className="tokenItem" key={token.id}>
                          <div className="tokenName">
                            {(markets || []).find((price: any) => price.address === token.market.id)
                              ?.underlyingSymbol || ''}
                          </div>
                          <div className="supplyAmount">
                            Supply:{' '}
                            {token.market.underlyingDecimals === 0 &&
                              new BigNumber(token.cTokenBalance)
                                .times(token.market.exchangeRate)
                                .dp(2, 1)
                                .toString(10)}{' '}
                            {token.market.underlyingDecimals === 0 && '('}
                            {formatCentsToReadableValue({
                              value: new BigNumber(token.cTokenBalance)
                                .multipliedBy(getTokenPrice(token))
                                .times(token.market.exchangeRate)
                                .multipliedBy(100),
                              shortenLargeValue: true,
                            })}
                            {token.market.underlyingDecimals === 0 && ')'}
                          </div>
                          {token.market.underlyingDecimals !== 0 ? (
                            <div className="borrowAmount">
                              Borrow:
                              {formatCentsToReadableValue({
                                value: new BigNumber(token.storedBorrowBalance)
                                  .multipliedBy(getTokenPrice(token))
                                  .multipliedBy(100),
                                shortenLargeValue: true,
                              })}
                            </div>
                          ) : (
                            <div className="borrowAmount" />
                          )}
                        </div>
                      ))}
                  </div>
                  <div css={styles.btnWrapper}>
                    <Link to={`/liquidate/${user.id}`}>
                      <div className="button">
                        {user.borrowPercent >= 100 ? 'Liquidate' : 'View'}
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="userMobileCard" key={user.id}>
                  <LiquidateAccordion
                    key={key}
                    id={idx}
                    expanded={expandedIdx === idx}
                    onChange={setExpanded}
                    account={user.id}
                    borrowPercent={user.borrowPercent}
                  >
                    <div className="tokenList mobile">
                      {user.tokens
                        .filter(
                          (token: any) =>
                            !new BigNumber(token.cTokenBalance).isZero() ||
                            !new BigNumber(token.storedBorrowBalance).isZero(),
                        )
                        .map((token: any) => (
                          <div className="tokenItem" key={token.id}>
                            <div className="tokenName">
                              {(markets || []).find(
                                (price: any) => price.address === token.market.id,
                              )?.underlyingSymbol || ''}
                            </div>
                            <div className="supplyAmount">
                              Supply:{' '}
                              {token.market.underlyingDecimals === 0 &&
                                new BigNumber(token.cTokenBalance)
                                  .times(token.market.exchangeRate)
                                  .dp(2, 1)
                                  .toString(10)}{' '}
                              {token.market.underlyingDecimals === 0 && '('}
                              {formatCentsToReadableValue({
                                value: new BigNumber(token.cTokenBalance)
                                  .multipliedBy(getTokenPrice(token))
                                  .times(token.market.exchangeRate)
                                  .multipliedBy(100),
                                shortenLargeValue: true,
                              })}
                              {token.market.underlyingDecimals === 0 && ')'}
                            </div>
                            {token.market.underlyingDecimals !== 0 ? (
                              <div className="borrowAmount">
                                Borrow:
                                {formatCentsToReadableValue({
                                  value: new BigNumber(token.storedBorrowBalance)
                                    .multipliedBy(getTokenPrice(token))
                                    .multipliedBy(100),
                                  shortenLargeValue: true,
                                })}
                              </div>
                            ) : (
                              <div className="borrowAmount" />
                            )}
                          </div>
                        ))}
                    </div>
                  </LiquidateAccordion>
                </div>
              </>
            );
          })}
      </div>
      {isFetching && <div css={styles.center}>Loading...</div>}
    </div>
  );
};

export default CardList;
