import React from 'react';
import GlItem from '../../molecules/GlItem';
import Box from '@material-ui/core/Box';

const items = () => {
    const itemsArray = [];
    for( let i = 0 ; i < 5 ; i++ ){
        itemsArray.push(<GlItem key={i} itemKey={i} />);
    }
    return itemsArray;
}

export default function(){
    return(
        <Box display="flex" flexWrap="wrap">
            {items()}
        </Box>
    );
}