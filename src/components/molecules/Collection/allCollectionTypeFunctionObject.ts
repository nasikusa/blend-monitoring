import { CollectionTypeType } from '../../../stores/collection/collectionData';

/**
 * コレクションの機能ボタンの機能ありなしのオブジェクトのアイテムの型
 */
export type collectionObjectFunctionType = {
  visibility: boolean;
  opacity: boolean;
  blendMode: boolean;
  color: boolean;
  image: boolean;
  garbage: boolean;
};

/**
 * コレクションの機能ボタンの機能ありなしのオブジェクトの型
 */
export type collectionTypeFunctionType = {
  [key in CollectionTypeType]: collectionObjectFunctionType;
};

/**
 * コレクションの機能ボタンの有効・無効の設定のオブジェクト
 */
const allCollectionTypeFunctionObject: collectionTypeFunctionType = {
  singleColor: {
    visibility: true,
    opacity: true,
    blendMode: true,
    color: true,
    image: false,
    garbage: true,
  },
  singleColorMultiBlends: {
    visibility: true,
    opacity: true,
    blendMode: true,
    color: true,
    image: false,
    garbage: true,
  },
  multiColors: {
    visibility: true,
    opacity: true,
    blendMode: true,
    color: true,
    image: false,
    garbage: true,
  },
  singleImage: {
    visibility: true,
    opacity: true,
    blendMode: true,
    color: false,
    image: true,
    garbage: true,
  },
  singleImageMultiBlends: {
    visibility: true,
    opacity: true,
    blendMode: true,
    color: false,
    image: true,
    garbage: true,
  },
  multiImages: {
    visibility: true,
    opacity: true,
    blendMode: true,
    color: false,
    image: true,
    garbage: true,
  },
  adjust: {
    visibility: true,
    opacity: true,
    blendMode: true,
    color: false,
    image: false,
    garbage: true,
  },
  base: {
    visibility: true,
    opacity: true,
    blendMode: true,
    color: true,
    image: false,
    garbage: false,
  },
};

export default allCollectionTypeFunctionObject;
