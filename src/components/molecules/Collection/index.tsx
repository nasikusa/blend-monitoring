import React from 'react';
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

const useStyles = makeStyles((theme) => ({
    nested: {
      paddingLeft: theme.spacing(4),
      backgroundColor: `transparent`,
      "&:hover": {
        backgroundColor: `transparent`,
      },
      cursor: `default`,
    },
    collapse: {
        backgroundColor: `#484848`,
    }
}));

export default (props:any) => {

    const { itemKey, collectionData } = props;
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    
    const handleClick = () => {
        setOpen(!open);
    };
    
    return(
        <>
            <ListItem button disableRipple onClick={handleClick}>
                <ListItemIcon>
                    <CollectionMainIcon collectionType={collectionData[itemKey].type} />
                </ListItemIcon>
                <ListItemText primary={GetCollectionsName(collectionData[itemKey].type)} />
            </ListItem>
            <Collapse in={open} timeout="auto" className={classes.collapse}>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested} disableRipple>
                        <OpacitySlider itemKey={itemKey} />
                    </ListItem>
                    <Divider />
                    <ListItem button className={classes.nested} disableRipple>
                        <BlendModalContainer itemKey={itemKey} />
                    </ListItem>
                    <Divider />
                </List>
            </Collapse>
            <Divider />
        </>
    );
};