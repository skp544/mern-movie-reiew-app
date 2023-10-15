import axios from "axios";

const BASE_URL = "mern-movie-reiew-app.vercel.app/api/v1";

const client = axios.create({
  baseURL: BASE_URL,
});

export default client;
