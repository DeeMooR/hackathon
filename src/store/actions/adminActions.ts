import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAuth } from "src/interface";
import { checkAuth } from "../api";

export const checkAuthAction = createAsyncThunk<string, IAuth>(
  'admin/checkAuthAction',
  async (obj) => {
    const response = await checkAuth(obj);
    return response.faculty;
  }
)