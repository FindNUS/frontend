import { useState, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

interface GetConfigObjType {
  url: string;
  headers: string;
}

const useAxiosGet = (configObj: GetConfigObjType) => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setloading] = useState(true);

  const { url, headers } = configObj;

  const fetchData = () => {
    axios
      .get(url, JSON.parse(headers))
      .then((res: AxiosResponse) => {
        setResponse(res);
      })
      .catch((err: AxiosError) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [response, error, loading] as const;
};

export default useAxiosGet;
