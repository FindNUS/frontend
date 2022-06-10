import { useCallback, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

interface PostDataType {
  url: string;
  headers: string;
  payload: string;
}

interface PostResult {
  data: AxiosResponse | null;
  error: AxiosError | null;
  isLoading: boolean;
}

const useAxiosPost = (data: PostDataType) => {
  const [result, setResult] = useState<PostResult>({
    data: null,
    error: null,
    isLoading: false,
  });

  const { url, headers, payload } = data;

  const postData = useCallback(() => {
    setResult((prevState) => ({ ...prevState, isLoading: true }));

    axios
      .post(url, JSON.parse(headers), JSON.parse(payload))
      .then((res) => {
        setResult({ data: res.data, isLoading: false, error: null });
      })
      .catch((error) => {
        setResult({ data: null, isLoading: false, error });
      });
  }, [url, headers, payload]);

  return [result, postData] as const; // infers [result, typeof postData] instead of (result | typeof postData)[];
};

export default useAxiosPost;
