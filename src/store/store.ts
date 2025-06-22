import { configureStore } from "@reduxjs/toolkit";
import diagnosticsReducer from "../features/diagnostics/diagnosticsSlice";

export const store = configureStore({
  reducer: {
    diagnostics: diagnosticsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
