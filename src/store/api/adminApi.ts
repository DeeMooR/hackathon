import axios from "axios";
import { IAuth } from "src/interface";
import { endpoints } from "./endpoints";

interface checkAuthResponse {
  faculty: string,
}

const headers = { 'Content-Type': 'application/json' };

export const checkAuth = (obj: IAuth): Promise<checkAuthResponse> =>
  axios.post(endpoints.auth, obj, { headers });