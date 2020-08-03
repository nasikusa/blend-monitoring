import React, { useRef, useEffect } from 'react';
import EventListener from 'react-event-listener';
import { RemoveScroll } from 'react-remove-scroll';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import GlEdit from '../../organisms/GlEdit';
import PageTemplateContainer from '../../../container/PageTemplateContainer';
import GlBoxContainer from '../../../container/GlBoxContainer';

import { ThemeSettingsType } from '../../../stores/themeSettings';

export type Props = {
  themeSettings: ThemeSettingsType;
  updateSingleItemSize: any;
};

const Edit = (props: Props) => {
  const { themeSettings, updateSingleItemSize } = props;
  const useStyles = makeStyles(() => ({
    scrollable: {
      overflowY: `scroll`,
      maxHeight: `calc(100vh - ${themeSettings.header.appBarHeight})`,
    },
  }));
  const classes = useStyles();
  const containerRef = useRef(null);
  const handleResize = (ref: any) => {
    updateSingleItemSize({
      glBoxClientWidth: ref.current.clientWidth,
    });
  };

  useEffect(() => {
    if (containerRef.current != null && containerRef != null) {
      updateSingleItemSize({
        // @ts-ignore
        glBoxClientWidth: containerRef.current.clientWidth,
      });
    }
  }, [containerRef, updateSingleItemSize]);

  const pageBody = (
    <RemoveScroll>
      <Box display="flex">
        <Grid ref={containerRef} xs={9} className={classes.scrollable}>
          <GlBoxContainer />
        </Grid>
        <Grid xs={3}>
          <GlEdit />
        </Grid>
        <EventListener
          target="window"
          onResize={() => {
            handleResize(containerRef);
          }}
        />
      </Box>
    </RemoveScroll>
  );

  return <PageTemplateContainer body={pageBody} />;
};

export default Edit;
