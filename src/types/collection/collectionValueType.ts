import {
  collectionValueColorValueType,
  collectionValueColorType,
  collectionValueColorDictionaryType,
} from '../../stores/collection/collectionValueColor';
import {
  collectionValueVisibilityValueType,
  collectionValueVisibilityType,
  collectionValueVisibilityDictionaryType,
} from '../../stores/collection/collectionValueVisibility';
import {
  collectionValueBlendModeValueType,
  collectionValueBlendModeType,
  collectionValueBlendModeDictionaryType,
} from '../../stores/collection/collectionValueBlendMode';
import {
  collectionValueOpacityValueType,
  collectionValueOpacityType,
  collectionValueOpacityDictionaryType,
} from '../../stores/collection/collectionValueOpacity';
import {
  collectionValueImageValueType,
  collectionValueImageType,
  collectionValueImageDictionaryType,
} from '../../stores/collection/collectionValueImage';

export type collectionValueTypeType =
  | 'color'
  | 'visibility'
  | 'opacity'
  | 'blendMode'
  | 'image';

export type collectionValueValueUnionType =
  | collectionValueColorValueType
  | collectionValueVisibilityValueType
  | collectionValueBlendModeValueType
  | collectionValueOpacityValueType
  | collectionValueImageValueType;

export type baseCollectionValueType = {
  readonly id: string;
  readonly type: collectionValueTypeType;
};

export type collectionValueUnionType =
  | collectionValueColorType
  | collectionValueVisibilityType
  | collectionValueBlendModeType
  | collectionValueOpacityType
  | collectionValueImageType;

export type collectionValueDictionaryUnionType =
  | collectionValueColorDictionaryType
  | collectionValueVisibilityDictionaryType
  | collectionValueBlendModeDictionaryType
  | collectionValueOpacityDictionaryType
  | collectionValueImageDictionaryType;

// 個別のcollectionValueValueTypeのexport
export type {
  collectionValueColorValueType,
  collectionValueVisibilityValueType,
  collectionValueBlendModeValueType,
  collectionValueOpacityValueType,
  collectionValueImageValueType,
};

// 個別のcollectionValueTypeのexport
export type {
  collectionValueColorType,
  collectionValueVisibilityType,
  collectionValueBlendModeType,
  collectionValueOpacityType,
  collectionValueImageType,
};

// 個別のcollectionValueTypeDictionaryのexport
export type {
  collectionValueColorDictionaryType,
  collectionValueVisibilityDictionaryType,
  collectionValueBlendModeDictionaryType,
  collectionValueOpacityDictionaryType,
  collectionValueImageDictionaryType,
};
