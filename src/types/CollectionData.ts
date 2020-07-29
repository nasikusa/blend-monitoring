export type CollectionType = `singleColor` | `singleColorMultiBlend` | `multiColor` | `singleImage` | `singleImageMultiBlend` | `multiImage` | `adjust`;

export interface GlCollectionInterfaceItem{
    type: CollectionType;
    collectionNumber: number;
    opacity: number | number[];
    blendMode: string | string[];
    color: string | string[];
    image: string | string[];
};

export type GlCollectionInterface = GlCollectionInterfaceItem[];