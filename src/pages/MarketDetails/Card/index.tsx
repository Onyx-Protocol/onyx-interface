/* eslint-disable no-nested-ternary */

/** @jsxImportSource @emotion/react */
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';

import { Stat } from '../types';
import { useStyles } from './styles';

export interface Legend {
  label: string;
  color: string;
}

export interface CardProps {
  title: string;
  legends?: Legend[];
  stats?: Stat[];
  className?: string;
  testId?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  legends = [],
  stats = [],
  className,
  testId,
}) => {
  const styles = useStyles();

  return (
    <Paper className={className} data-testid={testId}>
      <div css={styles.header}>
        <h4 css={styles.title}>{title}</h4>

        {legends.length > 0 && (
          <div css={styles.row}>
            {legends.map(legend => (
              <div css={styles.legend} key={`card-${title}-legend-${legend.label}`}>
                <div css={styles.getLegendColorIndicator({ color: legend.color })} />

                <Typography css={styles.legendLabel} variant="small2">
                  {legend.label}
                </Typography>
              </div>
            ))}
          </div>
        )}
      </div>

      {stats.length > 0 && (
        <div css={styles.row}>
          {stats.map((stat, index) => (
            <div css={styles.stat} key={`card-${title}-legend-${stat.label}`}>
              <Typography variant="small2" component="div" css={styles.statLabel}>
                {stat.label}
              </Typography>

              <Typography
                variant="h4"
                css={styles.statValue}
                style={{
                  color:
                    index === 0
                      ? 'white'
                      : title === 'Supply info'
                      ? '#18DF8B'
                      : index === 1
                      ? '#E93D44'
                      : index === 2
                      ? '#18DF8B'
                      : 'white',
                }}
              >
                {stat.value}
              </Typography>
            </div>
          ))}
        </div>
      )}

      {children}
    </Paper>
  );
};

export default Card;
