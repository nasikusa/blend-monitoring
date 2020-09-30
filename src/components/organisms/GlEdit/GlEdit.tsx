import React, { useState } from 'react';
import { css } from '@emotion/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

/* eslint-disable import/no-unresolved */
import CollectionsContainer from 'containers/CollectionListContainer';
/* eslint-enable import/no-unresolved */
import Icon from '../../atoms/Icon';

type Props = {
  editPanelUpperMargin: string;
};

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
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
const GlEdit: React.FC<Props> = (props) => {
  const [tabValue, setTabValue] = useState(0);

  const { editPanelUpperMargin } = props;

  const tabPanelStyle = css`
    height: calc(100vh - ${editPanelUpperMargin});
  `;

  const muiTabItemStyle = css`
    .MuiTab-labelIcon {
      min-height: 0px !important;
    }
  `;

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box style={{ height: '100%' }}>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
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
      </Tabs>
      <TabPanel css={tabPanelStyle} value={tabValue} index={0}>
        <CollectionsContainer />
      </TabPanel>
    </Box>
  );
};

export default GlEdit;
