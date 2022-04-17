import React from "react";
import { EPGListing } from "../models";
import { ApiService } from "../services";
import { dateToTimeString, roundDateDown } from "../utils/date-utils";
interface IEPGComponentProps {
  channelId: string;
}
const EPGComponent = ({ channelId }: IEPGComponentProps) => {
  const [epg, setEpg] = React.useState<EPGListing[]>([]);
  React.useEffect(() => {
    const fetchChannels = async () => {
      const response = await ApiService.getEPGForChannel(channelId);
      setEpg(response);
    };
    fetchChannels();
  }, [channelId]);

  const _mapHeaderRows = () => {
    const currentTime = new Date();
    const startTime = roundDateDown(currentTime, 30 * 60 * 1000);
    const currentProgram: EPGListing = epg[0] as EPGListing;

    const currentProgramElapsed =
      Math.round(startTime.getTime()) - currentProgram.getStartTime();

    console.log(
      "epg.component",
      "_mapHeaderRows-currentProgramElapsed",
      currentProgramElapsed
    );

    let timebar = [];
    let programs = [];
    let currentStartRendering = 0;
    const cellDuration = 1000 * 60 * 30;
    const totalDuration = cellDuration * 9;

    for (let i = 0; i <= 8; i++) {
      //need to find how long the first program has been running for and
      //set the width of that to a multiple of the width of the other cells
      const currentRenderingTime = new Date(
        startTime.getTime() + cellDuration * i
      );
      const time = dateToTimeString(
        currentRenderingTime //half hour segments
      );
      timebar.push(<td key={i}>{time}</td>);

      //need to find the program that is playing at this time
      const nowPlaying = epg.find((r) => {
        return (
          r.getStartTime() <= currentRenderingTime.getTime() &&
          r.getStopTime() >= currentRenderingTime.getTime()
        );
      });

      if (nowPlaying && currentStartRendering !== nowPlaying?.getStartTime()) {
        //calculate the duration of the program as a percentage of the total duration.
        const thisDurationPercentage =
          ((i === 0
            ? nowPlaying.getStopTime() - startTime.getTime()
            : nowPlaying.getStopTime() - nowPlaying.getStartTime()) /
            totalDuration) *
          100;
        programs.push(
          <td
            key={i}
            className="h-10 text-xs break-words"
            style={{ width: `${thisDurationPercentage}%` }}
          >
            <div className="inline-block break-words whitespace-pre-line">
              <div className="has-tooltip">
                <div>{nowPlaying.title}</div>
                {nowPlaying.getStartTime() && (
                  <div>
                    {dateToTimeString(new Date(nowPlaying.getStartTime()))} -
                    {(nowPlaying.getStopTime() - nowPlaying.getStartTime()) /
                      1000 /
                      60}
                    m
                  </div>
                )}
                <span className="w-1/6 p-1 -mt-8 text-red-500 bg-gray-100 rounded shadow-lg tooltip">
                  {nowPlaying.desc}
                </span>
              </div>
            </div>
          </td>
        );
      }
      currentStartRendering = nowPlaying?.getStartTime() || 0;
    }

    return (
      <td colSpan={3}>
        <table className="w-full table-fixed">
          <thead className="mb-7">
            <tr className="font-semibold text-white bg-gray-500 dark:bg-blue-500">
              {timebar}
            </tr>
          </thead>
        </table>
        <table className="w-full ">
          <tbody className="w-full mt-2">
            <tr className="w-full">{programs}</tr>
          </tbody>
        </table>
      </td>
    );
  };

  return epg && epg.length ? _mapHeaderRows() : null;
};

export default EPGComponent;
