import { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import SupportedApps from "../SupportedApps";

class Jellyfin extends SupportedApps {

    public async livestats(): Promise<object> {
        let status = "inactive";
        let data = [] as any;

        let res = await this.execute(this.url("Items/Counts"), this.config.headers, this.getAttrs());

        if (res == null) return { status, data };

        let results = res.data;

        let visiblestats = ['MovieCount', 'EpisodeCount'];

        for (let stat in results) {
            if (visiblestats.includes(stat)) {
                data[this.getAvailableStats()[stat]] = results[stat];
            }
        }

        let html = await this.getLiveStats(data);

        return {
            status: status,
            html: html
        };
    }

    public url(endpoint: string): string {
        let apiUrl = super.normaliseurl(this.config.url) + endpoint;
        return apiUrl;
    }

    public getAttrs(): object {
        return {
            headers: {
                "X-MediaBrowser-Token": this.config.password
            }
        }
    }

    public getAvailableStats(): { [key: string]: string } {
        return {
          "MovieCount": "Movies",
          "SeriesCount": "Series",
          "EpisodeCount": "Episodes",
          "ArtistCount": "Artists",
          "ProgramCount": "Programs",
          "TrailerCount": "Trailers",
          "SongCount": "Songs",
          "AlbumCount": "Albums",
          "MusicVideoCount": "MusicVideos",
          "BoxSetCount": "BoxSets",
          "BookCount": "Books",
          "ItemCount": "Items",
        };
    }
}

export default Jellyfin;