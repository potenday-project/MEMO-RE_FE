import axios from "axios";

export const openApiAxios = axios.create();
openApiAxios.defaults.baseURL = "https://api.thecatapi.com/v1/images";
