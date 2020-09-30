const collectionTypeNameObject = {
  singleImage: {
    ja: '画像レイヤー',
  },
  singleImageMultiBlends: {
    ja: '画像レイヤー (複数の描画モード)',
  },
  multiImages: {
    ja: '画像コレクション',
  },
  singleColor: {
    ja: 'カラーレイヤー',
  },
  singleColorMultiBlends: {
    ja: 'カラーレイヤー (複数の描画モード)',
  },
  multiColors: {
    ja: 'カラーコレクション',
  },
  adjust: {
    ja: '調整レイヤー',
  },
  base: {
    ja: 'ベースレイヤー',
  },
} as const;

export default collectionTypeNameObject;
