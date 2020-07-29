import React from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import CollectionContainer from '../../../container/CollectionContainer';

export default (props: any) => {
  const { collectionData } = props;

  /**
   * コレクションの配列。操作上の理由から最後に反転させていることに注意してください。
   */
  const collectionItems = collectionData
    .map((collectionDataItem: any, currentIndex: number) => {
      return <CollectionContainer itemKey={currentIndex} />;
    })
    .reverse();

  return (
    <div>
      <List>
        <Divider />
        <ListSubheader component="div" id="nested-list-subheader">
          レイヤー
        </ListSubheader>
        {collectionItems}
      </List>
    </div>
  );
};
