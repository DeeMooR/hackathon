import { createAsyncThunk } from "@reduxjs/toolkit";
import { setReceiverEmailApi } from "../api";
import { IEmailForm } from "src/interface";

export const setReceiverEmailAction = createAsyncThunk<void, IEmailForm>(
  'email/setReceiverEmailAction',
  async (body) => {
    const response = await setReceiverEmailApi(body);
    return response;
  }
)