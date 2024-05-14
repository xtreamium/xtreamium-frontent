import React, { Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Stream } from "@/models";
import { EPGComponent } from "@/components";

import { toast } from "react-toastify";
import { Button, ImageWithFallback } from "@/components/widgets";
import { ApiService } from "@/services";
import { Icons } from "@/components/icons";

const ChannelPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [streams, setStreams] = React.useState<Stream[]>([]);

  React.useEffect(() => {
    const fetchChannels = async () => {
      if (params.channelId) {
        const data = await ApiService.getStreams(params.channelId);
        setStreams(data);
      }
    };

    fetchChannels().catch(console.error);
  }, [params.channelId]);

  const copyStreamUrl = async (streamId: number) => {
    try {
      const url = await ApiService.getStreamUrl(streamId);
      console.log("channel.page", "copyStreamUrl", url);
      if (url) {
        navigator.clipboard.writeText(url).then(() => {
          toast.success(
            <>
              <div className="font-bold text-gray-800">
                🙌 URL copied to clipboard
              </div>
            </>,
            {
              position: "top-right",
              closeOnClick: true,
            }
          );
        });
      }
    } catch (err) {
      console.error("channel.page", "copyStreamUrl", err);
      toast.error(
        <>
          <div className="font-bold text-gray-800">🤦 Failed to copy URL</div>
        </>,
        {
          position: "top-right",
          closeOnClick: true,
        }
      );
    }
  };
  const playStreamInternal = async (streamId: number) => {
    navigate(`/live/play/${streamId}`);
  };
  const playStream = async (streamId: number) => {
    const url = await ApiService.getStreamUrl(streamId);
    if (url) {
      const query = `play/${encodeURIComponent(url)}`;
      try {
        const response = await fetch(
          `${import.meta.env.VITE_PROXY_URL}/${query}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "text/plain",
            },
          }
        );
        if (response.status === 501) {
          toast(
            <>
              <div className="font-bold text-gray-800">
                🚫 Unable to play stream!
              </div>
              <div className="text-gray-700 font-sm">
                Cannot find mpv installation.
              </div>
              <a
                className="font-bold text-indigo-600"
                href="https://github.com/fergalmoran/xtreamium/#installmpv"
                target="_blank"
                rel="noreferrer noopener"
              >
                See here
              </a>
            </>,
            {
              position: "top-right",
              closeOnClick: true,
            }
          );
        }
      } catch (e) {
        console.log(e);
        toast(
          <>
            <div className="font-bold text-gray-800">
              🚫 Unable to play stream!
            </div>
            <div className="text-gray-700 font-sm">
              Make sure you've installed the local server.
            </div>
            <a
              className="font-bold text-indigo-600"
              href="https://github.com/fergalmoran/xtreamium/#localserver"
              target="_blank"
              rel="noreferrer noopener"
            >
              Instructions here
            </a>
          </>,
          {
            position: "top-right",
            closeOnClick: true,
          }
        );
      }
    }
  };
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <tbody>
          {streams.map((stream: Stream) => [
            <>
              <tr>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-12 h-12 mask mask-squircle">
                        <ImageWithFallback
                          className="hidden w-10 h-10 md:block"
                          src={stream.stream_icon}
                          alt="Stream icon"
                          fallback="/images/unknown-stream.svg"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{stream.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center space-x-1">
                    <Button
                      icon={Icons.cast}
                      title="Cast stream to device"
                      layout="link"
                      aria-label="Edit"
                      onClick={() => playStream(stream.stream_id)}
                    ></Button>
                    <Button
                      icon={Icons.airplay}
                      title="Play to xtreamium local proxy"
                      layout="link"
                      aria-label="Edit"
                      onClick={() => playStream(stream.stream_id)}
                    ></Button>
                    <Button
                      icon={Icons.play}
                      title="Play stream in browser"
                      layout="link"
                      aria-label="Edit"
                      onClick={() => playStreamInternal(stream.stream_id)}
                    ></Button>
                    <Button
                      icon={Icons.copy}
                      title="Copy stream URL"
                      layout="link"
                      aria-label="Edit"
                      onClick={() => copyStreamUrl(stream.stream_id)}
                    ></Button>
                  </div>
                </td>
              </tr>
              <tr key={`${stream.num}-epg`}>
                <Suspense fallback={<h1>Loading epg</h1>}>
                  <EPGComponent channelId={stream.epg_channel_id} />
                </Suspense>
              </tr>
            </>,
          ])}
        </tbody>
      </table>
    </div>
  );
};

export default ChannelPage;
