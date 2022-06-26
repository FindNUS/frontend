import { useState, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

interface GetConfigObjType {
  url: string;
  headers?: string;
}

const useAxiosGet = (configObj: GetConfigObjType) => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setloading] = useState(true);
  const { url } = configObj;
  const headers = configObj.headers ?? "{}";

  const fetchData = (url: string) => {
    setloading(true);
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
    fetchData(url);
  }, [url]);

  return [response, error, loading] as const;
};

export default useAxiosGet;
