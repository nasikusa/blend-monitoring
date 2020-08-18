import React, { useRef, useEffect, useState } from 'react';
import EventListener from 'react-event-listener';
import { RemoveScroll } from 'react-remove-scroll';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import GlEditContainer from '../../../container/GlEditContainer';
import PageTemplateContainer from '../../../container/PageTemplateContainer';
import GlBoxContainer from '../../../container/GlBoxContainer';
import Doc from '../../organisms/Doc';

export type Props = {
  updateSingleItemSize: any;
  isShowDocArea: boolean;
  editAreaHeightvalue: string;
};

type PanelWidthType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * Editページコンポーネント
 * @param props
 */
const Edit = (props: Props) => {
  const { updateSingleItemSize, isShowDocArea, editAreaHeightvalue } = props;
  const useStyles = makeStyles(() => ({
    scrollable: {
      overflowY: `scroll`,
      overflowX: 'hidden',
      height: editAreaHeightvalue,
      maxHeight: editAreaHeightvalue,
    },
    heightSetting: {
      maxHeight: editAreaHeightvalue,
    },
  }));
  const classes = useStyles();
  const containerRef = useRef<HTMLDivElement>(null);
  const [docPanelWidth] = useState<PanelWidthType>(3);
  const [editPanelWidth] = useState<PanelWidthType>(3);
  const [viewPanelWidth] = useState<PanelWidthType>(isShowDocArea ? 6 : 9);
  const handleResize = (ref: typeof containerRef) => {
    updateSingleItemSize({
      glBoxClientWidth: ref.current?.clientWidth,
    });
  };

  useEffect(() => {
    updateSingleItemSize({
      glBoxClientWidth: containerRef.current?.clientWidth,
    });
  }, [containerRef, updateSingleItemSize]);

  const pageBody = (
    <RemoveScroll>
      <Box className={classes.heightSetting}>
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
            xs={12}
            sm={7}
            md={8}
            lg={viewPanelWidth}
            className={classes.scrollable}
          >
            <GlBoxContainer />
            <Divider orientation="vertical" absolute />
          </Grid>
          <Grid item xs={12} sm={5} md={4} lg={editPanelWidth}>
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
