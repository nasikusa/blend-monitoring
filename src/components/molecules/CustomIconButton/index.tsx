/* eslint no-nested-ternary: 0 */
import React from 'react';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { TooltipProps } from '@material-ui/core/Tooltip';
import { css } from '@emotion/core';
import { useTheme } from '@material-ui/core/styles';
import Icon, { IconTypeTypes } from '../../atoms/Icon';
import CustomTooltip from '../../atoms/CustomTooltip';

type Props = {
  type?: IconTypeTypes;
  buttonType?: 'iconButton' | 'buttonWithIcon';
  labelTitle?: string;
  disable?: boolean;
  active?: boolean;
  disableTooltip?: boolean;
  iconProps?: SvgIconProps;
  iconButtonProps?: IconButtonProps;
  buttonProps?: ButtonProps;
  buttonGeneralProps?: IconButtonProps & ButtonProps;
  tooltipProps?: Omit<TooltipProps, 'children'>;
  children?: React.ReactElement | string;
};

const CustomIconButton = (props: Props) => {
  const {
    type,
    buttonType,
    iconProps,
    iconButtonProps,
    buttonProps,
    buttonGeneralProps,
    tooltipProps,
    children,
    disableTooltip,
    disable,
    active,
    labelTitle,
  } = props;

  const theme = useTheme();

  const styles = {
    toolTipInnerWrapper: css`
      display: inline-flex;
    `,
    iconButtonStyle: css`
    padding: ${theme.spacing(2)}px;
  `;

  const buttonStyle = css`
    margin: ${theme.spacing(1)}px;
  `;

  /**
   * アイコンボタンコンポーネント
   */
  const IconButtonElement = () => {
    return (
      <IconButton
        disabled={disable}
        css={collectionFunctionButtonStyle}
        {...iconButtonProps}
        {...buttonGeneralProps}
      >
        <Icon
          // @ts-ignore
          type={type != null ? type : 'functionHelp'}
          color={!disable ? (active ? 'secondary' : 'inherit') : 'disabled'}
          {...iconProps}
        />
      </IconButton>
    );
  };

  /**
   * ボタンコンポーネント
   */
  const ButtonElement = () => {
    return (
      <Button
        css={buttonStyle}
        startIcon={
          <Icon
            // @ts-ignore
            type={type != null ? type : 'functionHelp'}
            color="inherit"
            {...iconProps}
          />
        }
        color={active ? 'secondary' : 'default'}
        disabled={disable}
        {...buttonProps}
        {...buttonGeneralProps}
      >
        {children}
      </Button>
    );
  };

  const ContentElement = () => {
    return buttonType === 'iconButton' ? (
      <IconButtonElement />
    ) : (
      <ButtonElement />
    );
  };

  return disableTooltip ? (
    <ContentElement />
  ) : (
    <CustomTooltip
      title={labelTitle || 'ツールチップタイトル'}
      {...tooltipProps}
    >
      <div css={styles.toolTipInnerWrapper}>
      <ContentElement />
      </div>
    </CustomTooltip>
  );
};

CustomIconButton.defaultProps = {
  type: 'functionHelp',
  buttonType: 'iconButton',
  disableTooltip: false,
};

export default CustomIconButton;
