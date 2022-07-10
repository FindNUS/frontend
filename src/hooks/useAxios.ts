import { useState, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HTTPRequestMethods, REQUEST_DELAY } from "../constants";

interface HTTPRequestProps {
  method?: HTTPRequestMethods;
  url?: string;
  config?: string;
}

const useAxios = (props: HTTPRequestProps) => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(false);
  const { url, method } = props;
  const config = props.config ?? "{}";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let axiosMethod: any;
  switch (method) {
    case "GET":
      axiosMethod = axios.get;
      break;
    case "POST":
      axiosMethod = axios.post;
      break;
    case "PATCH":
      axiosMethod = axios.patch;
      break;
    case "DELETE":
      axiosMethod = axios.delete;
      break;
    default:
      axiosMethod = undefined;
  }

  const fetchData = () => {
    if (!axiosMethod || !url || !config) return;
    setLoading(true);
    axiosMethod(url, JSON.parse(config))
      .then((res: AxiosResponse) => setResponse(res))
      .catch((err: AxiosError) => setError(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    // allow multiple arguments to be updated
    const timer = setTimeout(() => fetchData(), REQUEST_DELAY);
    return () => clearTimeout(timer);
  }, [url, method, config]);

  return [response, error, loading] as const;
};

export default useAxios;
