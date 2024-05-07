import React from "react";
import { useParams } from "react-router-dom";
import { ApiService } from "../services";
import VideoJS from "../components/video.js.player";

const PlayerPage = () => {
  const params = useParams();

  const [streamUrl, setStreamUrl] = React.useState("");
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "http://sr71.biz/live/Juicy5Bus/zYhuTE4qte/175596.ts",
        type: "video/H264",
      },
    ],
  };

  React.useEffect(() => {
    const getStreamUrl = async () => {
      if (params.streamId) {
        const url = await ApiService.getStreamUrl(parseInt(params.streamId));
        if (url) {
          setStreamUrl(url);
        }
      }
    };

    getStreamUrl();
    console.log("player.page", "streamUrl", streamUrl);
  }, [params.streamId, streamUrl]);
  return (
    <div>
      {streamUrl && (
        <div className="text-white">
          <span>
            <a href={streamUrl} target="_blank" rel="noreferrer">
              {streamUrl}
            </a>
          </span>
          <div className="w-96 h-96">
            Here is the player
            <VideoJS options={videoJsOptions} />
            {/* <HLSPlayer
              src={streamUrl}
              hlsConfig={{
                debug: true,
                maxLoadingDelay: 4,
                minAutoBitrate: 0,
                lowLatencyMode: true,
              }}
            /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerPage;
