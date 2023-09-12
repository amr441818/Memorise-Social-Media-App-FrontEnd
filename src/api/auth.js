import axios from "axios";
// instance form axios with a baseUrl
// const Api = axios.create({ baseURL: "http://localhost:5000" });
const Api = axios.create({
  baseURL: "https://kind-jade-goshawk-slip.cyclic.app",
});
// const url = "http://localhost:5000/users";

export const signIn = (formData) => Api.post(`/users/signin`, formData);
export const signUp = (formData) => Api.post(`/users/signup`, formData);
