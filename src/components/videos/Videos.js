import { useGetVideosQuery } from "../../api/apiSlice";
import Error from "../ui/Error.js";
import VideoLoader from "../ui/loaders/VideoLoader.js";
import Video from "./Video";
export default function Videos() {
  const { data: videos, isLoading, isError, isSuccess } = useGetVideosQuery();
  //   console.log(videos, isLoading, isError, isSuccess);
  let content = null;
  if (isLoading) {
    content = (
      <>
        <VideoLoader />
      </>
    );
  }
  if (!isLoading && isError) {
    content = <Error message="There was an error" />;
  }

  if (!isLoading && !isError && videos?.length === 0) {
    content = <Error message="No videos Found" />;
  }
  if (!isLoading && !isError && videos?.length > 0) {
    content = videos.map((video, ind) => (
      <Video key={video.id} video={video} />
    ));
  }
  return content;
}
