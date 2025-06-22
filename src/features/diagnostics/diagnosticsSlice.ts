import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Diagnostic } from "./types";

interface DiagnosticsState {
  list: Diagnostic[];
}

const initialState: DiagnosticsState = {
  list: [],
};

const diagnosticsSlice = createSlice({
  name: "diagnostics",
  initialState,
  reducers: {
    addDiagnostic: (state, action: PayloadAction<Diagnostic>) => {
      state.list.push(action.payload);
    },
    setDiagnostics: (state, action: PayloadAction<Diagnostic[]>) => {
      state.list = action.payload;
    },
  },
});

export const { addDiagnostic, setDiagnostics } = diagnosticsSlice.actions;
export default diagnosticsSlice.reducer;
