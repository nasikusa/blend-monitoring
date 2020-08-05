import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, Theme } from '@material-ui/core/styles';

const CustomTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

export default CustomTooltip;
