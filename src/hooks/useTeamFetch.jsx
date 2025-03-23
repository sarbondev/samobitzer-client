import { useContext } from "react";
import { ContextData } from "../context/Context";
import axios from "axios";
import { useEffect } from "react";

export const UseTeamFetch = (url) => {
  const { setTeam, setTeamPending } = useContext(ContextData);
  async function getData() {
    try {
      setTeamPending(true);
      const data = (await axios.get(url)).data.data;
      setTeam(data);
      setTeamPending(false);
    } catch (err) {
      setTeamPending(false);
      console.log(err);
    }
  }
  useEffect(() => {
    getData();
  }, [url]);
};
