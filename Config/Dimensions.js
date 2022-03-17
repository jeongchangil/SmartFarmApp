import { Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('window');
export const SIZE = 64;
export const ICON_SIZE = SIZE * 0.6;
export const SPACING = 12;

export const Spec = {
    ITEM_WITDH: width * 0.68,
    ITEM_HEIGHT: (width * 0.8 ) * 1.5,
    RADIUS: 18,
    SPACING,
    FULL_SIZE: (width * 0.68) + SPACING * 2,
};