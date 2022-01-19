import { useCallback, useEffect, useMemo, useState } from "react";
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
import SkeletonPostCard from "../components/Skeletons/SkeletonPostCard";
import PostFeed from "../components/PostFeed";
import LikedPostFeed from "../components/LikedPostFeed";
import useLikes from "../hooks/useLikes";
import { Footer } from "@shopify/polaris/build/ts/latest/src/components/Modal/components";
import FadeIn from "../animations/FadeIn";
import FadeUp from "../animations/FadeUp";

const Posts = () => {
  const [viewMode, setViewMode] = useState<ViewModes>(ViewModes.BROWSE);

  const [selectedDates, setSelectedDates] = useState({
    start: new Date(),
    end: new Date(),
  });

  const { posts, error, isLoading, isFetching } = usePosts({
    shouldLoadMore: viewMode === ViewModes.BROWSE, // only load more posts when on the browse page
    endDate: selectedDates.end,
  });

  const { likePost, unlikePost, likes, hydratedPosts } = useLikes({
    posts,
    viewMode,
  });

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
              posts={hydratedPosts}
              isFetching={isFetching}
              saveLikedPost={likePost}
              unsaveLikePost={unlikePost}
            />
          )}
          {viewMode === ViewModes.LIKED && (
            <LikedPostFeed
              posts={Object.values(likes)}
              isFetching={false}
              saveLikedPost={likePost}
              unsaveLikePost={unlikePost}
            />
          )}
        </Layout.Section>

        <Layout.Section>
          <FooterHelp>
            Made with ❤️ by{" "}
            <a target="_blank" href="https://github.com/mdanics">
              Matthew Danics
            </a>
          </FooterHelp>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Posts;
