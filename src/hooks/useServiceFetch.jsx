import { useContext } from "react";
import { ContextData } from "../context/Context";
import axios from "axios";
import { useEffect } from "react";

export const UseServicesFetch = (url) => {
  const { setServices, setSerPending } = useContext(ContextData);
  async function getData() {
    try {
      setSerPending(true);
      const data = await (await axios.get(url)).data.data;
      setServices(data);
      setSerPending(false);
    } catch (err) {
      setSerPending(false);
      console.log(err);
    }
  }
  useEffect(() => {
    getData();
  }, [url]);
};
