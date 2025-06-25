import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Diagnostic } from "./types";
import { diagnosticsService } from "../../services/diagnosticsService";

interface DiagnosticsState {
  list: Diagnostic[];
  loading: boolean;
  error: string | null;
}

const initialState: DiagnosticsState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchDiagnosticsFromJson = createAsyncThunk<Diagnostic[]>(
  "diagnostics/fetchDiagnosticsFromJson",
  async (_, { rejectWithValue }) => {
    try {
      const data = await diagnosticsService.fetchDiagnosticsFromJson();
      return data as Diagnostic[];
    } catch (err) {
      return rejectWithValue("Failed to load data from server");
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiagnosticsFromJson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiagnosticsFromJson.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchDiagnosticsFromJson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addDiagnostic, setDiagnostics } = diagnosticsSlice.actions;
export default diagnosticsSlice.reducer;
