import {CollectionType} from '../types/CollectionData';

export default ( type: CollectionType ) => {
    switch(type){
        case `singleColor`:
            return `カラーレイヤー`;
        case `singleColorMultiBlend`:
            return `カラーレイヤー(複数の描画モード)`;
        case `multiColor`:
            return `カラーコレクション`;
        case `singleImage`:
            return `画像レイヤー`;
        case `singleImageMultiBlend`:
            return `画像レイヤー(複数の描画モード)`;
        case `multiImage`:
            return `画像コレクション`;
        case `adjust`:
            return `調整レイヤー`;
    }
}