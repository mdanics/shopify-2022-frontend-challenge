import { useEffect, useState, useRef, useReducer } from "react";
import Post from "../interfaces/Post";
import { formatDate, subtractDays, useFirstAPODDate } from "../utils/DateUtils";

export interface usePostsProps {
  shouldLoadMore: boolean;
  endDate?: Date;
}

const FETCH_DAYS = 4;

const usePosts = ({ endDate = new Date(), shouldLoadMore }: usePostsProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const firstAPODDate = useFirstAPODDate();

  const endDateRef = useRef(endDate);
  const startDateRef = useRef(subtractDays(endDate, FETCH_DAYS));

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
    // ensure user hasn't scrolled past the first day
    console.log("bbbbb");

    setIsFetching(true);
    if (startDateRef.current >= firstAPODDate) {
      const formattedStartDate = formatDate(startDateRef.current);
      const formattedEndDate = formatDate(endDateRef.current);

      console.log("fetching posts...");
      const data = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=S8OTyVkiD0npa5DTP603E38sCMa2piPgz9cjpH7c&start_date=${formattedStartDate}&end_date=${formattedEndDate}`
      );
      const json = await data.json();

      const posts: Post[] = json.map((p: any) => {
        return { ...p, date: new Date(p.date.split("-").join("/")) };
      });

      const reversedPosts = posts.reverse(); // reverse so most recent is first
      console.log("hyn", { reversedPosts });

      setPosts((oldPosts) => [...oldPosts, ...reversedPosts]);
      console.log("yum", { posts });
    } else {
      // todo - handle error
      console.error("error - startDateRef.current >= firstAPODDate is false ");
    }
    setIsFetching(false);
  };

  const fetchMorePosts = async () => {
    // prevent multiple fetches when at bottom of the page
    if (!isFetchingRef.current) {
      // move the date range by FETCH_DAYS
      endDateRef.current = subtractDays(endDateRef.current, FETCH_DAYS + 1);
      startDateRef.current = subtractDays(startDateRef.current, FETCH_DAYS + 1);

      fetchPosts();
    } else {
      console.error("    if (!isFetchingRef.current)   ");
      // TODO - handle error
    }
  };

  const handleScroll = () => {
    const isAtBottom =
      document.documentElement.scrollHeight -
        document.documentElement.scrollTop <=
      document.documentElement.clientHeight;

    if (isAtBottom) {
      // fetch new posts if we're at the bottom
      fetchMorePosts();
    }
  };

  // fetch posts on load and refresh on a date change
  useEffect(() => {
    if (endDate != endDateRef.current) {
      endDateRef.current = endDate;
      startDateRef.current = subtractDays(endDate, FETCH_DAYS);
    }

    setPosts([]);
    fetchPosts();

    if (shouldLoadMore) {
      // setup endless scroll event listener
      window.addEventListener("scroll", handleScroll);
      // on component dismount
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }

    console.log("end date changed", endDate);
  }, [endDate, shouldLoadMore]);

  return {
    posts,
    isLoading: !posts, // TODO - should also check for error
    isFetching,
    error: null,
  };
};

export default usePosts;
