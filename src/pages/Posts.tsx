import { useCallback, useState } from "react";
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

const Posts = () => {
  const [viewMode, setViewMode] = useState<ViewModes>(ViewModes.ENDLESS);
  const [likedPosts, setLikedPosts] = useState<Post[]>([]);

  const setMode = useCallback((mode: ViewModes) => setViewMode(mode), []);

  const { posts, error, isLoading, isFetching } = usePosts({
    endlessScroll: viewMode === ViewModes.ENDLESS,
  });

  // todo - possibly condense to a useReducer
  const likePost = (post: Post) => {
    setLikedPosts((oldPosts) => [...oldPosts, post]);
    console.log({ post, likedPosts });
  };

  const unlikePost = (post: Post) => {
    const newPosts = likedPosts.filter((p) => p.url != post.url);
    setLikedPosts(newPosts);
  };

  return (
    <Page
      title="Spacestagram"
      subtitle="Utilizing NASA's Astronomy Photo of the Day to provide you with a beautiful feed of images"
      divider
    >
      <Layout>
        <Layout.Section secondary>
          <ModeSelector viewMode={viewMode} setMode={setMode} />
        </Layout.Section>
        <Layout.Section>
          {viewMode === ViewModes.ENDLESS && (
            <PostFeed
              posts={posts}
              isFetching={isFetching}
              saveLikedPost={likePost}
              unsaveLikePost={unlikePost}
            />
          )}
          {viewMode === ViewModes.LIKED && (
            <PostFeed
              posts={likedPosts}
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
