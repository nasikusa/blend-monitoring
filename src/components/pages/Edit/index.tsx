import React, { useRef } from 'react';
import EventListener from 'react-event-listener';
import { RemoveScroll } from 'react-remove-scroll';
// import { useSelector, useDispatch } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import GlEdit from '../../organisms/GlEdit';
import PageTemplateContainer from '../../../container/PageTemplateContainer';
import GlBoxContainer from '../../../container/GlBoxContainer';

// import updateSingleItemSize from '../../../stores/glSettings';

import { ThemeSettingsType } from '../../../stores/themeSettings';

export type Props = {
  themeSettings: ThemeSettingsType;
};

const Edit = (props: Props) => {
  const { themeSettings } = props;
  // const dispatch = useDispatch();
  const useStyles = makeStyles(() => ({
    scrollable: {
      overflowY: `scroll`,
      maxHeight: `calc(100vh - ${themeSettings.header.appBarHeight})`,
    },
  }));
  const classes = useStyles();
  const containerRef = useRef(null);
  // @ts-ignore
  // const glSettings = useSelector((state) => state.glSettings);

  // const handleResize = (ref: any) => {
  //   dispatch(
  //     updateSingleItemSize({
  //       type: 'updateSingleItemSize',
  //       glBoxClientWidth: ref.current.clientWidth,
  //     });
  //   );
  // };

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
          // onResize={() => {
          //   handleResize(containerRef);
          // }}
        />
      </Box>
    </RemoveScroll>
  );

  return <PageTemplateContainer body={pageBody} />;
};

export default Edit;
