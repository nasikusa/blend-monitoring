import {MimeImage} from './MIMEs';

export interface StoredImage{
    source: string;
    originalWidth: number;
    originalHeight: number;
    aspect: number;
    mime: MimeImage;
    fileSize: number;
};

export type StoredImages = StoredImage[];