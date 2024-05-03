import { useEffect, useState } from "react";

export const useFetch = (urlArr) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  const initializeFetch = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    initializeFetch();
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    const handleFetch = async () => {
      try {
        const [imgResponse, deedResponse] = await Promise.all([
          fetch(urlArr[0]),
          fetch(urlArr[1]),
        ]);

        if (!imgResponse.ok || !deedResponse.ok) {
          throw new Error("client request error");
        }

        const [img, deed] = await Promise.all([
          imgResponse.json(),
          deedResponse.json(),
        ]);

        setData([img, deed]);
      } catch (error) {
        console.error(error.message);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    handleFetch();
  }, [isLoading]);

  return [isLoading, isError, data, initializeFetch];
};
