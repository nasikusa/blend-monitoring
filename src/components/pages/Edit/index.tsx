import React, { useRef, useEffect } from 'react';
import { css } from '@emotion/core';
import EventListener from 'react-event-listener';
import { RemoveScroll } from 'react-remove-scroll';
import styled from '@emotion/styled';
import { GlobalHotKeys } from 'react-hotkeys';

// import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import GlEditContainer from '../../../container/GlEditContainer';
import PageTemplateContainer from '../../../container/PageTemplateContainer';
import GlBoxContainer from '../../../container/GlBoxContainer';
import Doc from '../../organisms/Doc';
import GeneralFunctionsListContainer from '../../../container/GeneralFunctionsListContainer';

export type Props = {
  updateSingleItemSize: any;
  updateRowCount: any;
  isShowDocArea: boolean;
  editAreaHeightvalue: string;
};

type PanelWidthType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

const CustomEmotionBox = styled(Box)``;

/**
 * Editページコンポーネント
 * @param props
 */
const Edit = (props: Props) => {
  const {
    updateSingleItemSize,
    updateRowCount,
    isShowDocArea,
    editAreaHeightvalue,
  } = props;
  const containerRef = useRef(null);
  const theme = useTheme();
  const HotkeyMap = {
    FUNCTION_KEY_1: '1',
    FUNCTION_KEY_2: '2',
    FUNCTION_KEY_3: '3',
    FUNCTION_KEY_4: '4',
    FUNCTION_KEY_5: '5',
    FUNCTION_KEY_6: '6',
  };

  const HotKeyhandlers = {
    FUNCTION_KEY_1: () => {
      updateRowCount({ newRowCountValue: 1 });
      updateSingleItemSize({
        // @ts-ignore
        glBoxClientWidth: containerRef.current?.clientWidth,
      });
    },
    FUNCTION_KEY_2: () => {
      updateRowCount({ newRowCountValue: 2 });
      updateSingleItemSize({
        // @ts-ignore
        glBoxClientWidth: containerRef.current?.clientWidth,
      });
    },
    FUNCTION_KEY_3: () => {
      updateRowCount({ newRowCountValue: 3 });
      updateSingleItemSize({
        // @ts-ignore
        glBoxClientWidth: containerRef.current?.clientWidth,
      });
    },
    FUNCTION_KEY_4: () => {
      updateRowCount({ newRowCountValue: 4 });
      updateSingleItemSize({
        // @ts-ignore
        glBoxClientWidth: containerRef.current?.clientWidth,
      });
    },
    FUNCTION_KEY_5: () => {
      updateRowCount({ newRowCountValue: 5 });
      updateSingleItemSize({
        // @ts-ignore
        glBoxClientWidth: containerRef.current?.clientWidth,
      });
    },
    FUNCTION_KEY_6: () => {
      updateRowCount({ newRowCountValue: 6 });
      updateSingleItemSize({
        // @ts-ignore
        glBoxClientWidth: containerRef.current?.clientWidth,
      });
    },
  };

  const useStyles = makeStyles(() => ({
    scrollable: {
      overflowY: `scroll`,
      overflowX: 'hidden',
      height: editAreaHeightvalue,
      maxHeight: editAreaHeightvalue,
    },
    heightSetting: {
      height: editAreaHeightvalue,
      maxHeight: editAreaHeightvalue,
    },
  }));
  const heightSettingStyle = css`
    height: ${editAreaHeightvalue};
    max-height: ${editAreaHeightvalue};
  `;
  const classes = useStyles();

  const handleResize = (ref: typeof containerRef) => {
    updateSingleItemSize({
      // @ts-ignore
      glBoxClientWidth: ref.current?.clientWidth,
    });
  };

  useEffect(() => {
    updateSingleItemSize({
      // @ts-ignore
      glBoxClientWidth: containerRef.current?.clientWidth,
    });
  }, [containerRef, updateSingleItemSize]);

  const pageBody = (
    <RemoveScroll>
      <GlobalHotKeys keyMap={HotkeyMap} handlers={HotKeyhandlers} />
      <Box width={1.0} className={classes.heightSetting}>
        <Box width={1.0} display="flex">
          {isShowDocArea ? (
            <Box>
              <Doc />
            </Box>
          ) : (
            ''
          )}
          <Box
            width="0.075"
            className={classes.heightSetting}
            style={{ backgroundColor: theme.palette.background.paper }}
          >
            <GeneralFunctionsListContainer css={heightSettingStyle} />
          </Box>
          <CustomEmotionBox
            width="0.675"
            ref={containerRef}
            className={classes.scrollable}
          >
            <GlBoxContainer />
          </CustomEmotionBox>
          <Box
            width="0.25"
            className={classes.heightSetting}
            style={{ borderLeft: '1px solid rgba(255,255,255,0.2)' }}
          >
            <GlEditContainer css={heightSettingStyle} />
          </Box>
          <EventListener
            target="window"
            onResize={() => {
              handleResize(containerRef);
            }}
          />
        </Box>
      </Box>
    </RemoveScroll>
  );

  return <PageTemplateContainer body={pageBody} />;
};

export default Edit;
