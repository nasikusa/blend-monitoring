import { createSlice } from "@reduxjs/toolkit";
import { glAllLayerDataStateItem } from '../constants/temp/tempInitialStates';

const initialState: any = glAllLayerDataStateItem;

const slice = createSlice({
  name: "glAllLayerData",
  initialState,
  reducers: {
    blendChange: (state,action) => {
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
          return newStateItem;
        }
        return stateItem;

      });

      return returnedStates;

    }
  },
});

export default slice.reducer;

export const { blendChange } = slice.actions;