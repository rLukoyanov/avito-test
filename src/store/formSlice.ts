import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Advertisement, AllFieldsOfAdvertisements } from "../types/api";

type State = {
  firstStep: Record<keyof Advertisement, unknown>;
  secondStep: Partial<
    Omit<Record<AllFieldsOfAdvertisements, string>, keyof Advertisement>
  >;
};

const initialState: State = {
  firstStep: {
    id: null,
    name: null,
    description: null,
    location: null,
    photo: null,
    type: null,
  },
  secondStep: {},
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFirstStep: (
      state,
      action: PayloadAction<{ fieldName: keyof Advertisement; value: string }>
    ) => {
      console.log(action.payload);
      state.firstStep[action.payload.fieldName] = action.payload.value;
    },
  },
});

export const { setFirstStep } = formSlice.actions;

export default formSlice.reducer;
