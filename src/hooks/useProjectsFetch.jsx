import { useContext } from "react";
import { ContextData } from "../context/Context";
import axios from "axios";
import { useEffect } from "react";

export const UseProjectsFetch = (url) => {
  const { setProjects, setProPending } = useContext(ContextData);

  async function getData() {
    try {
      setProPending(true);
      const data = await (await axios.get(url)).data.data;
      setProjects(data.reverse());
      setProPending(false);
    } catch (err) {
      setProPending(false);
      console.log(err);
    }
  }
  useEffect(() => {
    getData();
  }, [url]);
};
