import { collectionValueColorValueType } from '../../stores/collection/collectionValueColor';
import { collectionValueVisibilityType } from '../../stores/collection/collectionValueVisibility';
import { collectionValueBlendModeType } from '../../stores/collection/collectionValueBlendMode';
import { collectionValueOpacityType } from '../../stores/collection/collectionValueOpacity';
import { collectionValueImageType } from '../../stores/collection/collectionValueImage';

export type collectionValueTypeType =
  | 'color'
  | 'visibility'
  | 'opacity'
  | 'blendMode'
  | 'image';

export type collectionValueValueUnionType =
  | collectionValueColorValueType
  | collectionValueVisibilityType
  | collectionValueBlendModeType
  | collectionValueOpacityType
  | collectionValueImageType;

export type baseCollectionValueType = {
  readonly id: string;
  readonly type: collectionValueTypeType;
};

export type {
  collectionValueColorValueType,
  collectionValueVisibilityType,
  collectionValueBlendModeType,
  collectionValueOpacityType,
  collectionValueImageType,
};
