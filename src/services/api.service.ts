import http from "./http.service";
import { Channel, EPGListing } from "@/models";
import { Stream } from "@/models";
import axios from "axios";

class ApiService {
  public validateCredentials = async (
    server: string,
    username: string,
    password: string
  ): Promise<boolean> => {
    console.log("api.service", "url", import.meta.env.VITE_API_URL);
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

  public getCategories = async (): Promise<Channel[]> => {
    const response = await http.get("/epg/categories");
    return response.data;
  };

  public getChannels = async (categoryId: string): Promise<Stream[]> => {
    const response = await http.get(`/epg/channels/${categoryId}`);
    return response.data as Stream[]; //.filter((r) => r.name === "BBC One FHD");
  };

  public getStreamUrl = async (streamId: number): Promise<string | undefined> => {
    const res = await http.get(`/epg/channel/url/${streamId}`);
    if (res.status !== 200) {
      alert("Failed to get stream url");
      return;
    }
    return res?.data.url;
  };

  public async getEPGForChannel(channelId: string): Promise<EPGListing[]> {
    const response = await http.get(`${import.meta.env.VITE_API_URL}/epg/listing/${channelId}`);
    return response.data.map((d: unknown) => Object.assign(new EPGListing(), d));
  }
}

export default new ApiService();
