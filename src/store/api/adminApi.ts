import axios from "axios";
import { IAuth } from "src/interface";
import { endpoints } from "./endpoints";

interface checkAuthResponse {
  faculty: string,
}

const headers = { 'Content-Type': 'application/json' };

export const checkAuthApi = (obj: IAuth): Promise<checkAuthResponse> =>
  axios.post(endpoints.auth, obj, { headers }).then(({ data }) => data);