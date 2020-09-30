import React, { useRef, useEffect, useState } from 'react';
import { css } from '@emotion/core';
import EventListener from 'react-event-listener';
import { RemoveScroll } from 'react-remove-scroll';
import styled from '@emotion/styled';
// import { Resizable } from 're-resizable';
import { GlobalHotKeys } from 'react-hotkeys';

// import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import GlEditContainer from '../../../containers/GlEditContainer';
import PageTemplateContainer from '../../../containers/PageTemplateContainer';
import DrawBoxContainer from '../../../containers/DrawBoxContainer';
import Doc from '../../organisms/Doc/Doc';
import GeneralFunctionsListContainer from '../../../containers/GeneralFunctionsListContainer';

export type Props = Readonly<{
  updateSingleItemSize: any;
  updateRowCount: any;
  isShowDocArea: boolean;
  editAreaHeightvalue: string;
}>;

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
  const [generalFunctionListWidth] = useState(0);
  const [glBoxWidth] = useState(0.75);
  const [glEditWidth] = useState(0.25);
  const containerRef = useRef(null);
  const theme = useTheme();

  /**
   * ショートカットのキーマップオブジェクト
   */
  const HotkeyMap = {
    FUNCTION_KEY_1: '1',
    FUNCTION_KEY_2: '2',
    FUNCTION_KEY_3: '3',
    FUNCTION_KEY_4: '4',
    FUNCTION_KEY_5: '5',
    FUNCTION_KEY_6: '6',
  };

  /**
   * ショートカットのキーが押された際の挙動のオブジェクト
   */
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
          {/* TEMP */}
          {isShowDocArea ? (
            <Box>
              <Doc />
            </Box>
          ) : (
            ''
          )}
          {/* TEMP */}
          {false && (
            <Box
              width={generalFunctionListWidth}
              className={classes.heightSetting}
              style={{ backgroundColor: theme.palette.background.paper }}
            >
              <GeneralFunctionsListContainer css={heightSettingStyle} />
            </Box>
          )}
          <Box
            display="flex"
            width={window.innerWidth - generalFunctionListWidth}
          >
            <CustomEmotionBox
              width={glBoxWidth}
              ref={containerRef}
              className={classes.scrollable}
            >
              <DrawBoxContainer />
            </CustomEmotionBox>
            {/* <Resizable
              enable={{
                top: false,
                right: true,
                bottom: false,
                left: false,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false,
              }}
              defaultSize={{
                width:
                  (window.innerWidth - generalFunctionListWidth) * glEditWidth,
                height: Number(editAreaHeightvalue.slice(0, -2)),
              }}
            > */}
            <Box
              width={glEditWidth}
              className={classes.heightSetting}
              style={{ borderLeft: '1px solid rgba(255,255,255,0.2)' }}
            >
              <GlEditContainer css={heightSettingStyle} />
            </Box>
            {/* </Resizable> */}
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
