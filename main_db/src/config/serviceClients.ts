import axios from "axios";

export const mfService =
axios.create({
  baseURL:
    process.env.MF_SERVICE_URL

});
export const equityService =
axios.create({

  baseURL:
    process.env.EQUITY_SERVICE_URL

});