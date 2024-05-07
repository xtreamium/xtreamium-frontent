import React, { Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineCopy, AiOutlinePlayCircle } from "react-icons/ai";
import { FiAirplay, FiCast } from "react-icons/fi";
import { Stream } from "../models";
import { convertEpochToSpecificTimezone } from "../utils/date-utils";
import { EPGComponent } from "../components";

import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "../components/widgets/table";
import { Badge, Button, ImageWithFallback } from "../components/widgets";
import { ApiService } from "../services";

const ChannelPage = () => {
  let params = useParams();
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
    <TableContainer className="mt-5 mb-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Channel</TableCell>
            <TableCell>Type</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {streams.map((stream: Stream) => [
            <TableRow key={stream.num}>
              <TableCell>
                <div className="flex items-center text-sm">
                  <ImageWithFallback
                    className="hidden w-10 h-10 ml-2 mr-3 md:block"
                    src={stream.stream_icon}
                    alt="Stream icon"
                    fallback="/images/unknown-stream.svg"
                  />
                  <div>
                    <p className="font-semibold">{stream.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Added: {convertEpochToSpecificTimezone(stream.added)}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge type={`primary`}>{stream.stream_type}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-1">
                  <Button
                    icon={FiCast}
                    title="Cast stream to device"
                    layout="link"
                    aria-label="Edit"
                    onClick={() => playStream(stream.stream_id)}
                  ></Button>
                  <Button
                    icon={FiAirplay}
                    title="Play to xtreamium local proxy"
                    layout="link"
                    aria-label="Edit"
                    onClick={() => playStream(stream.stream_id)}
                  ></Button>
                  <Button
                    icon={AiOutlinePlayCircle}
                    title="Play stream in browser"
                    layout="link"
                    aria-label="Edit"
                    onClick={() => playStreamInternal(stream.stream_id)}
                  ></Button>
                  <Button
                    icon={AiOutlineCopy}
                    title="Copy stream URL"
                    layout="link"
                    aria-label="Edit"
                    onClick={() => copyStreamUrl(stream.stream_id)}
                  ></Button>
                </div>
              </TableCell>
            </TableRow>,
            <tr key={`${stream.num}-epg`}>
              <Suspense fallback={<h1>Loading epg</h1>}>
                <EPGComponent channelId={stream.epg_channel_id} />
              </Suspense>
            </tr>,
          ])}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChannelPage;
