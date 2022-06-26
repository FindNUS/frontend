import { useCallback, useState } from "react";

const useConvertFileToBase64 = (file: File | undefined) => {
  const [result, setResult] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /**
   * Convert any file into a base64 string
   * @param file The file to be converted
   * @returns Base64 string if converted successfully, error message otherwise
   */
  const file2Base64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString().split(",")[1] || "");
      reader.onerror = (error) => reject(error);
    });
  };

  /**
   * Attempt file conversion to base64 string
   * @param file The file to be converted
   */
  const convertFile = async (file: File) => {
    try {
      const res = await file2Base64(file);
      setResult(res);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const convertCallback = useCallback(
    (file: File) => {
      file && convertFile(file);
    },
    [file]
  );

  return [result, loading, error, convertCallback] as const;
};

export default useConvertFileToBase64;
