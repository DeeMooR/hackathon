import axios from "axios";
import { endpoints } from "./endpoints";
import { IEmailForm } from "src/interface";

const headers = { 'Content-Type': 'application/json' };

export const setReceiverEmailApi = (body: IEmailForm): Promise<void> =>
  axios.post(endpoints.emailReceiver, body, {headers});
  

