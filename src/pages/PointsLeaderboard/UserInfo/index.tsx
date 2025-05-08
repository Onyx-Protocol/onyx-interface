/** @jsxImportSource @emotion/react */
import { Box, Link as MuiLink } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { ReactNode } from 'react';

import SvgOpenTab from 'components/Icon/icons/openTab';
import { getUniqNumberUserAddress } from 'utilities/getUniqNumberUserAddress';
import { shortenUserAddress } from 'utilities/shortenUserAddress';

import { useStyles } from './style';

const Avatar = styled(Box)<{ gradient: string }>`
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background: ${({ gradient }) => gradient};
`;

const gradients = [
  'linear-gradient(to right, #4C51BF, #6366F1, #818CF8)',
  'linear-gradient(to right, #10B981, #34D399, #6EE7B7)',
  'linear-gradient(to right, #EC4899, #F472B6, #F9A8D4)',
  'linear-gradient(to right, #F97316, #FB923C, #FDBA74)',
  'linear-gradient(to right, #FBBF24, #FCD34D, #FEF08A)',
  'linear-gradient(to right, #14B8A6, #2DD4BF, #67E8F9)',
  'linear-gradient(to right, #4A148C, #6A1B9A, #9333EA)',
  'linear-gradient(to right, #16A34A, #22C55E, #4ADE80)',
  'linear-gradient(to right, #DC2626, #EF4444, #F87171)',
  'linear-gradient(to right, #3B82F6, #60A5FA, #93C5FD)',
];
interface UserInfoProps {
  userAddress: string;
  icon: ReactNode;
}

export const UserInfo: React.FC<UserInfoProps> = ({ userAddress, icon }: UserInfoProps) => {
  const styles = useStyles();
  const i = getUniqNumberUserAddress(userAddress);
  console.log(icon);
  return (
    <MuiLink
      href={`https://explorer.onyx.org/address/${userAddress}`}
      target="_blank"
      css={styles.link}
      id={`user-info-${i}`}
    >
      <Box css={styles.container}>
        <Avatar gradient={gradients[i]} />
        <Box css={styles.address}>{shortenUserAddress(userAddress)}</Box>
        <SvgOpenTab size={14} color="#1db9a6" />
        {icon}
      </Box>
    </MuiLink>
  );
};
