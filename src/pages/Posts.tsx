import { useCallback, useEffect, useState } from "react";
import {
  Button,
  FooterHelp,
  Layout,
  Link,
  Page,
  Spinner,
  Stack,
} from "@shopify/polaris";
import Post from "../interfaces/Post";
import PostCard from "../components/PostCard";
import ModeSelector, { ViewModes } from "../components/ModeSelector";
import usePosts from "../hooks/usePosts";
import SkeletonPostCard from "../components/SkeletonPostCard";
import PostFeed from "../components/PostFeed";
import LikedPostFeed from "../components/LikedPostFeed";

interface x {
  [id: string]: Post;
}

const Posts = () => {
  const [viewMode, setViewMode] = useState<ViewModes>(ViewModes.BROWSE);

  const [selectedDates, setSelectedDates] = useState({
    start: new Date(),
    end: new Date(),
  });

  const [likedPosts, setLikedPosts] = useState<x>({});
  const [displayPosts, setDisplayPosts] = useState<Post[]>([]);

  const { posts, error, isLoading, isFetching } = usePosts({
    shouldFetch: viewMode === ViewModes.BROWSE, // todo - can prob remove this or consolidate
    endDate: selectedDates.end,
  });

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
      setLikedPosts(JSON.parse(likes));
    }
  }, []);

  // save liked posts to localstorage to persist on refresh
  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likedPosts));
  }, [likedPosts]);

  // update posts that have been liked
  useEffect(() => {
    const postsWithLikes: Post[] = posts.map((post) => {
      return {
        ...post,
        liked: likedPosts[post.url] != null,
      };
    });

    setDisplayPosts(postsWithLikes);
  }, [likedPosts, posts]);

  console.log("posts", viewMode === ViewModes.BROWSE, { isFetching, viewMode });

  return (
    <Page
      title="Spacestagram"
      subtitle="Utilizing NASA's Astronomy Photo of the Day to provide you with a beautiful feed of images"
      divider
    >
      <Layout>
        <Layout.Section secondary>
          <ModeSelector
            viewMode={viewMode}
            setMode={setViewMode}
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
          />
        </Layout.Section>
        <Layout.Section>
          {viewMode === ViewModes.BROWSE && (
            <PostFeed
              posts={displayPosts}
              isFetching={isFetching}
              saveLikedPost={likePost}
              unsaveLikePost={unlikePost}
            />
          )}
          {viewMode === ViewModes.LIKED && (
            <LikedPostFeed
              posts={Object.values(likedPosts)}
              isFetching={true}
              saveLikedPost={likePost}
              unsaveLikePost={unlikePost}
            />
          )}
        </Layout.Section>

        <Layout.Section>
          <FooterHelp>Wow you reached the bottom!</FooterHelp>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Posts;
