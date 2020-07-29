import React from 'react';

import ImageIcon from '@material-ui/icons/Image';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import BrushIcon from '@material-ui/icons/Brush';
import BarChartIcon from '@material-ui/icons/BarChart';

import { CollectionType } from '../../../types/CollectionData';

interface PropsInterface {
    collectionType: CollectionType
};

export default (props: PropsInterface) => {
    const { collectionType } = props;
    switch( collectionType ){
        case `singleImage`:
        case `singleImageMultiBlend`:
            return(<ImageIcon />);
        case `multiImage`:
            return(<PermMediaIcon />);
        case `singleColor`:
        case `singleColorMultiBlend`:
            return(<ColorLensIcon />);
        case `multiColor`:
            return(<BrushIcon />);
        case `adjust`:
            return(<BarChartIcon />);
    }
}