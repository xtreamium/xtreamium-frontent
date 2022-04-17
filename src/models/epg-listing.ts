import { convertUTCToLocal } from "../utils/date-utils";

export interface IEPGListingMap {
  channel: string;
  start: number;
  stop: number;
  title: string[];
  desc: string[];
}
export class EPGListing {
  channel!: string;
  private start!: number;
  private stop!: number;
  title!: string[];
  desc!: string[];

//   constructor({ channel, start, stop, title, desc }: IEPGListingMap) {
//     debugger;
//     this.channel = channel;
//     this.start = start;
//     this.stop = stop;
//     this.title = title;
//     this.desc = desc;
//   }
  public getStartTime(): number {
    return convertUTCToLocal(new Date(this.start)).getTime();
  }
  public getStopTime(): number {
    return convertUTCToLocal(new Date(this.stop)).getTime();
  }
}
