export type baseImageSizeNames = 'thumb' | 'small' | 'medium' | 'large' | 'raw';

export type baseImageSizeObjectType = {
  [key in baseImageSizeNames]?: number;
};

const baseImageSizeObject: baseImageSizeObjectType = {
  thumb: 150,
  small: 320,
  medium: 640,
  large: 1080,
};

export default baseImageSizeObject;
