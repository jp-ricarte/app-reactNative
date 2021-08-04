import axios from "axios";

export default axios.create({
  baseURL: "https://grafica-back.herokuapp.com",
  //baseURL: "http://localhost:3333"
});
