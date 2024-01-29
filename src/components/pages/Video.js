import { useParams } from "react-router-dom";
import { useGetSingleVideoQuery } from "../../api/apiSlice";
import Error from "../ui/Error.js";
import DescriptionLoader from "../ui/loaders/DescriptionLoader.js";
import PlayerLoader from "../ui/loaders/PlayerLoader.js";
import RelatedVideoLoader from "../ui/loaders/RelatedVideoLoader.js";
import Description from "../video/Description";
import Player from "../video/Player";
import RelatedVideos from "../video/related/RelatedVideos";

export default function Video() {
  const { videoId } = useParams();
  console.log("param", videoId);
  const { data: video, isLoading, isError } = useGetSingleVideoQuery(videoId);
  let content = null;
  if (isLoading) {
    content = (
      <>
        <PlayerLoader />
        <DescriptionLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error message="There was an Error" />;
  }

  if (!isLoading && !isError && video?.id) {
    content = (
      <>
        <Player link={video.link} title={video.title} />
        <Description video={video} />
      </>
    );
  }

  return (
    <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
      <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
        <div className="grid grid-cols-3 gap-2 lg:gap-8">
          <div className="col-span-full w-full space-y-8 lg:col-span-2">
            {content}
          </div>

          {video?.id ? (
            <RelatedVideos id={video.id} title={video.title} />
          ) : isLoading ? (
            <>
              <RelatedVideoLoader />
              <RelatedVideoLoader />
              <RelatedVideoLoader />
            </>
          ) : (
            <Error message="Video Not Matching" />
          )}
        </div>
      </div>
    </section>
  );
}
