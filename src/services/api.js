import axios from "axios";

export default axios.create({
  //baseURL: "https://vittar-fl-back-teste.herokuapp.com/products",
  baseURL: "http://localhost:3333"
});
