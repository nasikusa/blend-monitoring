import React, { useState } from 'react';
import { css } from '@emotion/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Icon from '../../atoms/Icon';

import CollectionsContainer from '../../../container/CollectionsContainer';

type Props = {
  editPanelUpperMargin: string;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auto-tabpanel-${index}`}
      aria-labelledby={`auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `auto-tab-${index}`,
    'aria-controls': `タブアイテム${index}`,
  };
}

/**
 * editパーツのコンポーネント
 */
export default (props: any) => {
  const [value, setValue] = useState(0);

  const { editPanelUpperMargin } = props;

  const tabPanelStyle = css`
    height: calc(100vh - ${editPanelUpperMargin});
  `;

  const muiTabItemStyle = css`
    .MuiTab-labelIcon {
      min-height: 0px !important;
    }
  `;

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box style={{ height: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="タブパネル"
        css={muiTabItemStyle}
      >
        <Tab
          icon={<Icon type="layer" />}
          label="シーンコレクション"
          {...a11yProps(0)}
        />
        {/* <Tab icon={<BuildIcon />} label="設定" {...a11yProps(1)} /> */}
      </Tabs>
      <TabPanel css={tabPanelStyle} value={value} index={0}>
        <CollectionsContainer />
      </TabPanel>
      {/* <TabPanel css={tabPanelStyle} value={value} index={1}>
        Item Two
      </TabPanel> */}
    </Box>
  );
};