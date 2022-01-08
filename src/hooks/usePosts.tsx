import useSWR from "swr";
import Post from "../interfaces/Post";

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init);
  return res.json();
};

const usePosts = () => {
  const { data, error } = useSWR<Post[]>(
    "https://api.nasa.gov/planetary/apod?api_key=S8OTyVkiD0npa5DTP603E38sCMa2piPgz9cjpH7c&start_date=2021-12-01",
    fetcher
  );

  return {
    posts: data,
    isLoading: !data && !error,
    error: error,
  };
};

export default usePosts;
