import { useEffect, useState, useRef, useReducer } from "react";
import Post from "../interfaces/Post";

const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const isFetchingRef = useRef(false);
  // useReducer with to keep isFetchingRef value consistent with isFetching
  // ref is required due to useEffect closure with scroll handler
  const [isFetching, setIsFetching] = useReducer(
    (state: boolean, action: boolean) => {
      isFetchingRef.current = action;
      return action;
    },
    false
  );

  const fetchPosts = async () => {
    // prevent multiple fetches when at bottom of the page
    if (!isFetchingRef.current) {
      setIsFetching(true);

      const data = await fetch(
        "https://api.nasa.gov/planetary/apod?api_key=S8OTyVkiD0npa5DTP603E38sCMa2piPgz9cjpH7c&count=3"
      );
      const posts: Post[] = await data.json();

      setPosts((oldPosts) => [...oldPosts, ...posts]);
      setIsFetching(false);
    }
  };

  const handleScroll = () => {
    const isAtBottom =
      document.documentElement.scrollHeight -
        document.documentElement.scrollTop <=
      document.documentElement.clientHeight;

    if (isAtBottom) {
      // fetch new posts if we're at the bottom
      fetchPosts();
    }
  };

  useEffect(() => {
    fetchPosts();
    window.addEventListener("scroll", handleScroll);
    // on component dismount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    posts,
    isLoading: !posts, // TODO - should also check for error
    isFetching,
    error: null,
  };
};

export default usePosts;
