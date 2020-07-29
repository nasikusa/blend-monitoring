import React, { useRef } from 'react';
import EventListener from 'react-event-listener';
import { RemoveScroll } from 'react-remove-scroll';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import GlBox from '../../organisms/GlBox';
import GlEdit from '../../organisms/GlEdit';
import PageTemplateContainer from '../../../container/PageTemplateContainer';

const handleResize = (containerRef: any, updateSingleItemSize: any) => {
  updateSingleItemSize({ glBoxClientWidth: containerRef.current.clientWidth });
};

const Edit = (props: any) => {
  const { themeSettings, updateSingleItemSize } = props;
  const useStyles = makeStyles(() => ({
    scrollable: {
      overflowY: `scroll`,
      maxHeight: `calc(100vh - ${themeSettings.header.appBarHeight})`,
    },
  }));
  const classes = useStyles();
  const containerRef = useRef(null);

  const pageBody = (
    <RemoveScroll>
      <Box display="flex">
        <Grid ref={containerRef} xs={9} className={classes.scrollable}>
          <GlBox />
        </Grid>
        <Grid xs={3}>
          <GlEdit />
        </Grid>
        <EventListener
          target="window"
          onResize={() => {
            handleResize(containerRef, updateSingleItemSize);
          }}
        />
      </Box>
    </RemoveScroll>
  );

  return <PageTemplateContainer body={pageBody} />;
};

export default Edit;
