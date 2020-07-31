import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';

import OpacitySlider from '../OpacitySlider';
import BlendModalContainer from '../../../container/BlendModalContainer';
import CollectionMainIcon from '../../atoms/CollectionMainIcon';
import GetCollectionsName from '../../../utils/GetCollectionsName';
import { GlCollectionOrderContext } from '../Collections';

import { GlCollectionInterfaceArray } from '../../../stores/collectionData';

export type Props = {
  collectionData: GlCollectionInterfaceArray;
};

/**
 * Material UIのスタイル
 */
const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
    backgroundColor: `transparent`,
    '&:hover': {
      backgroundColor: `transparent`,
    },
    cursor: `default`,
  },
  collapse: {
    backgroundColor: `#484848`,
  },
}));

/**
 * 単一のコレクションコンポーネント
 */
export default (props: Props) => {
  const { collectionData } = props;
  const classes = useStyles();
  const glCollectionOrderKey = useContext(GlCollectionOrderContext);
  const [open, setOpen] = React.useState(true);

  /**
   * MaterialUIのCollapseコンポーネントの開閉stateを変更する関数
   */
  const handleClick = (): void => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem button disableRipple onClick={handleClick}>
        <ListItemIcon>
          <CollectionMainIcon
            collectionType={collectionData[glCollectionOrderKey].type}
          />
        </ListItemIcon>
        <ListItemText
          primary={GetCollectionsName(
            collectionData[glCollectionOrderKey].type
          )}
        />
      </ListItem>
      <Collapse in={open} timeout="auto" className={classes.collapse}>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} disableRipple>
            <OpacitySlider />
          </ListItem>
          <Divider />
          <ListItem button className={classes.nested} disableRipple>
            <BlendModalContainer />
          </ListItem>
          <Divider />
        </List>
      </Collapse>
      <Divider />
    </>
  );
};
