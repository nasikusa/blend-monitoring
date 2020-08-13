import { CollectionTypeType } from '../stores/collectionData';

export default (type: CollectionTypeType): string => {
  switch (type) {
    case `singleColor`:
      return `カラーレイヤー`;
    case `singleColorMultiBlends`:
      return `カラーレイヤー(複数の描画モード)`;
    case `multiColors`:
      return `カラーコレクション`;
    case `singleImage`:
      return `画像レイヤー`;
    case `singleImageMultiBlends`:
      return `画像レイヤー(複数の描画モード)`;
    case `multiImages`:
      return `画像コレクション`;
    case `adjust`:
      return `調整レイヤー`;
    default:
      return `不明なレイヤー`;
  }
};
