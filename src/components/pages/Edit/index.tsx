import React, { useRef, useEffect, useState } from 'react';
import EventListener from 'react-event-listener';
import { RemoveScroll } from 'react-remove-scroll';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import GlEditContainer from '../../../container/GlEditContainer';
import PageTemplateContainer from '../../../container/PageTemplateContainer';
import GlBoxContainer from '../../../container/GlBoxContainer';
import Doc from '../../organisms/Doc';

import { ThemeSettingsType } from '../../../stores/themeSettings';

export type Props = {
  themeSettings: ThemeSettingsType;
  updateSingleItemSize: any;
  isShowDocArea: boolean;
};

type PanelWidthType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * Editページコンポーネント
 * @param props
 */
const Edit = (props: Props) => {
  const { themeSettings, updateSingleItemSize, isShowDocArea } = props;
  const useStyles = makeStyles(() => ({
    scrollable: {
      overflowY: `scroll`,
      maxHeight: `calc(100vh - ${themeSettings.header.appBarHeight})`,
    },
  }));
  const classes = useStyles();
  const containerRef = useRef(null);
  const [docPanelWidth] = useState<PanelWidthType>(3);
  const [editPanelWidth] = useState<PanelWidthType>(3);
  const [viewPanelWidth] = useState<PanelWidthType>(isShowDocArea ? 6 : 9);
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
      <Box>
        <Grid container>
          {isShowDocArea ? (
            <Grid item xs={docPanelWidth}>
              <Doc />
            </Grid>
          ) : (
            ''
          )}
          <Grid
            item
            ref={containerRef}
            xs={viewPanelWidth}
            className={classes.scrollable}
          >
            <GlBoxContainer />
          </Grid>
          <Grid item xs={editPanelWidth}>
            <GlEditContainer />
          </Grid>
          <EventListener
            target="window"
            onResize={() => {
              handleResize(containerRef);
            }}
          />
        </Grid>
      </Box>
    </RemoveScroll>
  );

  return <PageTemplateContainer body={pageBody} />;
};

export default Edit;
