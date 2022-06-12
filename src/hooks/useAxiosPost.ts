import { useState, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

interface PostConfigObjType {
  url: string;
  payload: string;
}

const useAxiosPost = (configObj: PostConfigObjType) => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(true);

  const { url, payload } = configObj;

  const fetchData = () => {
    axios
      .post(url, JSON.parse(payload))
      .then((res) => setResponse(res))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [response, error, loading] as const;
};

export default useAxiosPost;
