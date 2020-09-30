import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, Theme } from '@material-ui/core/styles';

/**
 * カスタマイズされたツールチップコンポーネント
 */
const CustomTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    boxShadow: theme.shadows[1],
    fontSize: 12,
  },
}))(Tooltip);

export default CustomTooltip;
