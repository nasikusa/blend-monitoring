import { MimeImage } from './MIMEs';

/**
 * レイヤータイプ
 */
export type GlLayerType = `image` | `singleColor` | `adjust`;

export type GlLayerImageType = `cover` | `contain` | `normal`;

/**
 * レイヤーの画像情報
 *
 */
export interface GlLayerDataImage {
  source: string;
  originalWidth: number;
  originalHeight: number;
  aspect: number;
  mime: MimeImage;
  fileSize: number;
  type: GlLayerImageType;
}

/**
 * 単一のレイヤー情報
 *
 */
export interface GlLayerDataInterfaceItem {
  name: string;
  type: GlLayerType;
  blendMode: string;
  opacity: number;
  image?: GlLayerDataImage;
  singleColor?: number;
  layerNumber?: number;
  createdAt?: number;
  updatedAt?: number;
  isUpdate?: boolean;
  isBottomLayer?: boolean;
}

/**
 * 複合のレイヤー情報
 */
export type GlLayerDataInterface = GlLayerDataInterface[];
