import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: Record<string, Record<string, unknown>> = {};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormStep: (
      state,
      action: PayloadAction<{ step: number; value: Record<string, unknown> }>
    ) => {
      state[action.payload.step] = action.payload.value;
    },
  },
});

export const { setFormStep } = formSlice.actions;

export default formSlice.reducer;
