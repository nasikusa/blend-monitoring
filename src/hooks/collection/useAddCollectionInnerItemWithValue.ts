import { useCallback } from 'react';
import { useDispatch, batch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

/* eslint-disable import/no-unresolved */
import useRawCollection from 'hooks/collection/useRawCollection';
import { addCollectionInnerItem } from 'stores/collection/collection';
import { addValue as addCollectionValueBlendMode } from 'stores/collection/collectionValueBlendMode';
import { addValue as addCollectionValueColor } from 'stores/collection/collectionValueColor';
import { addValue as addCollectionValueImage } from 'stores/collection/collectionValueImage';
import { addItem as addCollectionItem } from 'stores/collection/collectionItem';
/* eslint-enable import/no-unresolved */

/**
 * collectionItemを追加し、新しい値を適用させるためのhook
 * *useRawCollectionが正常に動くケースでのみ動くため注意してください。*
 * @todo: 現状、rawCollectionDataに依存しているので、もしかしたら問題になるかも...
 */
const useAddCollectionInnerItemWithValue = () => {
  const dispatch = useDispatch();
  const rawCollectionData = useRawCollection();

  const storeAddCollectionValueBlendMode = useCallback(
    (payload) => {
      dispatch(addCollectionValueBlendMode(payload));
    },
    [dispatch]
  );

  const storeAddCollectionValueColor = useCallback(
    (payload) => {
      dispatch(addCollectionValueColor(payload));
    },
    [dispatch]
  );

  const storeAddCollectionValueImage = useCallback(
    (payload) => {
      dispatch(addCollectionValueImage(payload));
    },
    [dispatch]
  );

  const storeAddCollectionItem = useCallback(
    (payload) => {
      dispatch(addCollectionItem(payload));
    },
    [dispatch]
  );

  const storeAddCollectionInnerItem = useCallback(
    (payload) => {
      dispatch(addCollectionInnerItem(payload));
    },
    [dispatch]
  );

  const targetCollectionItemId = uuidv4();
  const targetCollectionValueId = uuidv4();

  // TODO: targetIndexの型を入れたい
  // TODO: optionsのtargetIndexが index であった場合に、追加でoptionsが必要です
  return (
    targetValue: string | number | boolean,
    options = {
      targetIndex: 'first',
    }
  ) => {
    batch(() => {
      if (rawCollectionData.type === 'singleColorMultiBlends') {
        storeAddCollectionValueBlendMode({
          targetId: targetCollectionValueId,
          targetNewValue: targetValue,
        });
        storeAddCollectionItem({
          targetId: targetCollectionItemId,
          targetType: rawCollectionData.roughType,
          targetBlendModeId: targetCollectionValueId,
          targetOpacityId: rawCollectionData.defaultOpacityId,
          targetVisibilityId: rawCollectionData.defaultVisibilityId,
          targetColorId: rawCollectionData.defaultColorId,
        });
      }
      if (rawCollectionData.type === 'singleImageMultiBlends') {
        storeAddCollectionValueBlendMode({
          targetId: targetCollectionValueId,
          targetNewValue: targetValue,
        });
        storeAddCollectionItem({
          targetId: targetCollectionItemId,
          targetType: rawCollectionData.roughType,
          targetBlendModeId: targetCollectionValueId,
          targetOpacityId: rawCollectionData.defaultOpacityId,
          targetVisibilityId: rawCollectionData.defaultVisibilityId,
          targetImageId: rawCollectionData.defaultImageId,
        });
      }
      if (rawCollectionData.type === 'multiColors') {
        storeAddCollectionValueColor({
          targetId: targetCollectionValueId,
          targetNewValue: targetValue,
        });
        storeAddCollectionItem({
          targetId: targetCollectionItemId,
          targetType: rawCollectionData.roughType,
          targetBlendModeId: rawCollectionData.defaultBlendModeId,
          targetOpacityId: rawCollectionData.defaultOpacityId,
          targetVisibilityId: rawCollectionData.defaultVisibilityId,
          targetColorId: targetCollectionValueId,
        });
      }
      if (rawCollectionData.type === 'multiImages') {
        storeAddCollectionValueImage({
          targetId: targetCollectionValueId,
          targetIdNewValue: targetValue,
        });
        storeAddCollectionItem({
          targetId: targetCollectionItemId,
          targetType: rawCollectionData.roughType,
          targetBlendModeId: rawCollectionData.defaultBlendModeId,
          targetOpacityId: rawCollectionData.defaultOpacityId,
          targetVisibilityId: rawCollectionData.defaultVisibilityId,
          targetImageId: targetCollectionValueId,
        });
      }
      storeAddCollectionInnerItem({
        addIndexType: options.targetIndex,
        targetInnerItemId: targetCollectionItemId,
        targetId: rawCollectionData.id,
      });
    });
  };
};

export default useAddCollectionInnerItemWithValue;
