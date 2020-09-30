/* eslint no-nested-ternary: 0 */
import React from 'react';
import deepEqual from 'fast-deep-equal';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { TooltipProps } from '@material-ui/core/Tooltip';
import { css } from '@emotion/core';
import { useTheme } from '@material-ui/core/styles';
import Icon, { IconTypeTypes } from '../../atoms/Icon';
import CustomTooltip from '../../atoms/CustomTooltip';

type Props = Partial<{
  type: IconTypeTypes;
  buttonType: 'iconButton' | 'buttonWithIcon';
  labelTitle: string;
  disable: boolean;
  active: boolean;
  danger: boolean;
  disableTooltip: boolean;
  iconProps: SvgIconProps;
  iconButtonProps: IconButtonProps;
  onClick: any;
  buttonProps: ButtonProps;
  buttonGeneralProps: IconButtonProps & ButtonProps;
  tooltipProps: Omit<TooltipProps, 'children'>;
  children: React.ReactText;
}>;

const CustomIconButton: React.FC<Props> = (props) => {
  const {
    type = 'functionHelp',
    buttonType = 'iconButton',
    iconProps,
    iconButtonProps,
    buttonProps,
    buttonGeneralProps,
    tooltipProps,
    children,
    disableTooltip = false,
    disable,
    active,
    danger,
    labelTitle,
    onClick,
  } = props;

  const theme = useTheme();

  const styles = {
    toolTipInnerWrapper: css({
      display: 'inline-flex',
    }),
    iconButtonStyle: css({
      padding: `${theme.spacing(2)}px`,
    }),
    buttonStyle: css`
      margin-top: 1px;
      margin-bottom: 1px;
      margin-left: ${theme.spacing(1)}px;
      margin-right: ${theme.spacing(1)}px;
    `,
  };

  /**
   * アイコンボタンコンポーネント
   */
  const IconButtonElement = () => {
    return (
      <IconButton
        disabled={disable}
        css={styles.iconButtonStyle}
        onClick={onClick}
        {...iconButtonProps}
        {...buttonGeneralProps}
      >
        <Icon
          // @ts-ignore
          type={type}
          color={
            danger
              ? 'error'
              : !disable
              ? active
                ? 'secondary'
                : 'inherit'
              : 'disabled'
          }
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
        css={styles.buttonStyle}
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
        onClick={onClick}
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
      PopperProps={{
        disablePortal: true,
      }}
      {...tooltipProps}
    >
      <div css={styles.toolTipInnerWrapper}>
        <ContentElement />
      </div>
    </CustomTooltip>
  );
};

export default React.memo(CustomIconButton, (prevProps, nextProps) =>
  deepEqual(prevProps, nextProps)
);
