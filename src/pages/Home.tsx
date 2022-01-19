import { useState } from "react";
import { FooterHelp, Layout, Page, Toast } from "@shopify/polaris";
import ModeSelector, { ViewModes } from "../components/ModeSelector";
import usePosts from "../hooks/usePosts";
import PostFeed from "../components/PostFeed";
import LikedPostFeed from "../components/LikedPostFeed";
import useLikes from "../hooks/useLikes";

const Home = () => {
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

  return (
    <Page
      title="Spacestagram"
      subtitle="Utilizing NASA's Astronomy Photo of the Day to provide you with a beautiful feed of images"
      divider
    >
      <Layout>
        {error && (
          <Toast
            content="An unexpected error has occured, please refresh the page."
            error
            onDismiss={() => {}}
          />
        )}
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
              handleEmptyStateAction={() => setViewMode(ViewModes.BROWSE)}
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

export default Home;
