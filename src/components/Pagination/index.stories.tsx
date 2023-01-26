/** @jsxImportSource @emotion/react */
import { ComponentMeta, Story } from '@storybook/react';
import noop from 'noop-ts';
import React from 'react';

import { ThemeContext } from 'context/ThemeContext';
import { withCenterStory, withThemeProvider } from 'stories/decorators';
import { PALETTE } from 'theme/MuiThemeProvider/muiTheme';

import { Pagination } from '.';

const { mode: themeMode } = React.useContext(ThemeContext);

export default {
  title: 'Components/Pagination',
  component: Pagination,
  decorators: [withThemeProvider, withCenterStory({ width: 800 })],
  parameters: {
    backgrounds: {
      default: PALETTE[themeMode === 'dark' ? 0 : 1].background.default,
    },
  },
} as ComponentMeta<typeof Pagination>;

const PaginationTemplate: Story<{
  itemsCount: number;
  initialPageIndex?: number;
  itemsPerPageCount?: number;
}> = ({ initialPageIndex, itemsPerPageCount }) => (
  <Pagination
    itemsCount={25}
    onChange={noop}
    initialPageIndex={initialPageIndex}
    itemsPerPageCount={itemsPerPageCount}
  />
);

export const PaginationWithCustomContentPerPage = PaginationTemplate.bind({});
PaginationWithCustomContentPerPage.args = {
  itemsCount: 25,
  initialPageIndex: 0,
  itemsPerPageCount: 4,
};
