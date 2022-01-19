import { useEffect, useMemo, useState } from "react";
import { ViewModes } from "../components/ModeSelector";
import Post from "../interfaces/Post";

export interface useLikesProps {
  viewMode: ViewModes;
  posts: Post[];
}

interface PostHashMap {
  [id: string]: Post;
}

const useLikes = ({ viewMode, posts }: useLikesProps) => {
  const [likedPosts, setLikedPosts] = useState<PostHashMap>({});
  const [hydratedPosts, setHydratedPosts] = useState<Post[]>([]);

  // memoize likes and update on view switch to prevent Posts from immediately disappearing when unliking in the likes view
  // also has performance benefits
  const likes = useMemo(() => {
    return likedPosts;
  }, [viewMode]);

  // todo - possibly condense to a useReducer
  const likePost = (post: Post) => {
    setLikedPosts((oldPosts) => {
      return {
        ...oldPosts,
        [post.url]: {
          ...post,
          liked: true,
        },
      };
    });
    console.log({ post, likedPosts });
  };

  const unlikePost = (post: Post) => {
    setLikedPosts((oldPosts) => {
      const newPosts = { ...oldPosts };
      delete newPosts[post.url];

      return newPosts;
    });
  };

  // fetch existing likes from local storage
  useEffect(() => {
    const likes = localStorage.getItem("likes");
    if (likes) {
      const json: PostHashMap = JSON.parse(likes);

      Object.values(json).forEach((p: Post) => {
        json[p.url].date = new Date(json[p.url].date);
      });

      setLikedPosts(json);
    }
  }, []);

  // save liked posts to localstorage to persist on refresh
  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likedPosts));
  }, [likedPosts]);

  // hydrate posts with like data
  useEffect(() => {
    const postsWithLikes: Post[] = posts.map((post) => {
      return {
        ...post,
        liked: likedPosts[post.url] != null,
      };
    });

    setHydratedPosts(postsWithLikes);
  }, [likes, posts]);

  return {
    likePost,
    unlikePost,
    likes,
    hydratedPosts,
  };
};

export default useLikes;
