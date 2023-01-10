import SupportedApps from "../SupportedApps";

class SpeedtestTracker extends SupportedApps {

    public test(): Promise<object> {
        let test = this.appTest(this.url("/api/speedtest/latest/"), this.config.headers, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
        return test;
    }

    public async livestats(): Promise<object> {
        let status = "inactive";
        let data = [] as any;

        let res = await this.execute(this.url("/api/speedtest/latest/"), this.config.headers, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        if (res == null) return { status };

        let res_data = res.data;
        let speedtest = res_data['data'];

        data['download'] = SpeedtestTracker.formatStat(speedtest['download']);
        data['upload'] = SpeedtestTracker.formatStat(speedtest['upload']);

        let html = await this.getLiveStats(data);

        return {
            status: status,
            html: html
        };
    }

    public url(endpoint: string): string {
        let apiUrl = super.normaliseurl(this.config.url, false) + endpoint;
        return apiUrl;
    }

    private static formatStat(number: number) {
        return Math.floor(number).toLocaleString() + " Mbps";
    }
}

export default SpeedtestTracker;