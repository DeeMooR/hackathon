import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAuth } from "src/interface";
import { checkAuthApi } from "../api";

export const checkAuthAction = createAsyncThunk<string, IAuth>(
  'admin/checkAuthAction',
  async (obj) => {
    const response = await checkAuthApi(obj);
    return response.faculty;
  }
)