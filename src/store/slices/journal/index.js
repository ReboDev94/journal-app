import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import reducers from "./reducers";

export const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers,
});
