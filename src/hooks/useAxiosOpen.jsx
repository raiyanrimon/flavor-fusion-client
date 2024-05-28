import axios from "axios";

const axiosOpen = axios.create({
  baseURL: "https://flavor-fusion-server-delta.vercel.app",
});

const useAxiosOpen = () => {
  return axiosOpen;
};

export default useAxiosOpen;
