import React, { useRef, useEffect, useState } from 'react';
import EventListener from 'react-event-listener';
import { RemoveScroll } from 'react-remove-scroll';
import { Helmet } from 'react-helmet';

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
      <Helmet>
        <meta charSet="utf-8" />
        <title>BlendMonitoring</title>
        <meta
          name="description"
          content="BlendMonitoringは色の組み合わせをモニタリングできるwebツールです。"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nakanasinokusa" />
        <meta property="og:url" content="https://blend.nasikusa.net/" />
        <meta property="og:title" content="BlendMonitoring" />
        <meta
          property="og:description"
          content="BlendMonitoringは色の組み合わせをモニタリングできるwebツールです。"
        />
        <meta
          property="og:image"
          content="https://blend.nasikusa.net/assets/image/ogp/ogp.png"
        />
        <meta property="og:title" content="BlendMonitoring" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blend.nasikusa.net/" />
        <meta
          property="og:image"
          content="https://blend.nasikusa.net/assets/image/ogp/ogp.png"
        />
        <meta property="og:site_name" content="BlendMonitoring" />
        <meta
          property="og:description"
          content="BlendMonitoringは色の組み合わせをモニタリングできるwebツールです。"
        />
      </Helmet>
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
            xs={12}
            sm={7}
            md={8}
            lg={viewPanelWidth}
            className={classes.scrollable}
          >
            <GlBoxContainer />
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
