import axios from 'axios';

//Change this url for all apis
// export const baseUrl = "http://localhost:8000";

export const baseUrl = "https://taskmanger-backend.herokuapp.com";

export default axios.create({
  baseURL: `${baseUrl}`
})