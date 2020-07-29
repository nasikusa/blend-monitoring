import { createSlice } from "@reduxjs/toolkit";
import { glAllLayerDataStateItem } from '../constants/temp/tempInitialStates';
import { image01, image02, image03 } from '../constants/temp/tempImageData';

// Stateの初期状態
const initialState: any = glAllLayerDataStateItem;

// Sliceを生成する
const slice = createSlice({
  name: "glAllLayerData",
  initialState,
  reducers: {
    blendChange: (state,action) => {
      const save = state[action.payload.itemKey][1];
      console.log(action.payload.blendMode);
      console.log(save.blendMode);

      const addedItem = [
        {
            name: `added`,
            type: `image`,
            opacity: 1.0,
            image: {
                type: `normal`,
                source: image01,
                originalWidth: 469,
                originalHeight: 463,
                mime: `image/jpeg`,
            },
            blendMode: `normal`,
            singleColor: null,
            layerNumber: 0,
            isBottomLayer: true,
        },
        {
            name: `added`,
            type: `image`,
            opacity: 1.0,
            image: {
                type: `cover`,
                source: image03,
                originalWidth: 1024,
                originalHeight: 640,
                mime: `image/jpeg`,
            },
            blendMode: `overlay`,
            singleColor: null,
            layerNumber: 1,
            isBottomLayer: false,
        }
    ];

      const returnedStates =  state.map( ( stateItem: any, currentIndex: any ) => {
        if( currentIndex === action.payload.itemKey ){
          const newStateItem = stateItem.map(( deepStateItem:any ) => {
            if( deepStateItem.layerNumber === 1 ){
              return{
                ...deepStateItem,
                blendMode: `multiply`,
              };
            }
            return deepStateItem;
          });
          // console.log(newStateItem);
          return newStateItem;
        }
        return stateItem;

      });

      console.log( returnedStates );

      return returnedStates;

    }
  },
});

// Reducerをエクスポートする
export default slice.reducer;

// Action Creatorsをエクスポートする
export const { blendChange } = slice.actions;