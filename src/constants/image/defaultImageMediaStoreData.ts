import { StoredMediaStateItemType } from '../../stores/image/storedMedia';
import defaultImageData from './defaultImageData';

export const defaultImageMediaStoreDataId =
  'e066dc13-abd1-4939-8e8b-7ec669e1d69f';

const defaultImageMediaStoreData: StoredMediaStateItemType = {
  id: defaultImageMediaStoreDataId,
  name: 'defaultBlankImage',
  mediaType: 'image',
  dataType: 'objectURL',
  aspectRatio: 1,
  color: {
    dominant: '#000000',
    palette: ['#000000'],
  },
  mime: 'image/jpeg',
  fileSize: {
    raw: 13068,
    large: 13068,
    medium: 13068,
    small: 13068,
    thumb: 13068,
  },
  resource: {
    raw: defaultImageData,
    large: defaultImageData,
    medium: defaultImageData,
    small: defaultImageData,
    thumb: defaultImageData,
  },
  rawWidth: 1024,
  rawHeight: 1024,
  isSelected: false,
  itemOrder: 0,
};

export default defaultImageMediaStoreData;
