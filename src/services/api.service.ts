import http from "./http.service";
import { Channel, EPGListing } from "../models";
import { Stream } from "../models";
import axios from "axios";
import { IEPGListingMap } from "../models/epg-listing";

class ApiService {
  public validateCredentials = async (
    server: string,
    username: string,
    password: string
  ): Promise<Boolean> => {
    const client = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        "Content-type": "application/json",
        "x-xtream-server": server,
        "x-xtream-username": username,
        "x-xtream-password": password,
      },
    });
    try {
      const res = await client.get("/validate");
      return res.status === 200;
    } catch {
      return false;
    }
  };

  public getChannels = async (): Promise<Channel[]> => {
    const response = await http.get("/channels");
    return response.data;
  };

  public getStreams = async (channelId: string): Promise<Stream[]> => {
    const response = await http.get(`/streams/${channelId}`);
    return (response.data as Stream[]).filter((r) => r.name === "BBC One FHD");
  };

  public getStreamUrl = async (
    streamId: number
  ): Promise<string | undefined> => {
    const res = await http.get(`/live/stream/url/${streamId}`);
    if (res.status !== 200) {
      alert("Failed to get stream url");
      return;
    }
    return res?.data.url;
  };

  public async getEPGForChannel(channelId: string): Promise<EPGListing[]> {
    const response = await http.get(
      `${import.meta.env.VITE_API_URL}/epg/${channelId}`
    );

    return response.data.map((d: any) => Object.assign(new EPGListing(), d));
  }
}

export default new ApiService();
