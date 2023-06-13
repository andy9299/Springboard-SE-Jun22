
import { useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";


function useAxios(baseUrl) {
  const [responses, setResponses] = useState([]);
  const addResponse = async (restOfUrl = "") => {
    console.log(restOfUrl);
    const resp = await axios.get(`${baseUrl}${restOfUrl}`);
    setResponses(data => [...data, { ...resp.data, id: uuid() }]);
  };
  return [responses, addResponse];
}

export default useAxios;