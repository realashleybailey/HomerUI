import SupportedApps from "../SupportedApps";

class Proxmox extends SupportedApps {

    public test(): Promise<object> {
        let test = this.appTest(this.url("version"), this.getAttrs());
        return test;
    }

    public async livestats(): Promise<object> {
        let status = "inactive";
        let res = await this.execute(this.url("/api2/json/nodes"), this.getAttrs(), null, null, true);

        let data = [] as any;
        if (res == null) return { status };

        let res_data = res.data;
        let nodes = res_data['data'];

        let node = nodes.sort((a: any, b: any) => {
            return b['mem'] - a['mem'];
        });

        let used_mem = node['mem'];
        let max_mem = node['maxmem'];

        let mem = Math.round((used_mem / max_mem) * 100);

        used_mem = Math.round(used_mem / 1024 / 1024 / 1024);
        max_mem = Math.round(max_mem / 1024 / 1024 / 1024);

        let uptime = node['uptime'];

        // Convert uptime to days, hours, minutes, seconds
        let days = Math.floor(uptime / (24 * 60 * 60));
        let hours = Math.floor((uptime % (24 * 60 * 60)) / (60 * 60));
        let minutes = Math.floor((uptime % (60 * 60)) / 60);
        let seconds = Math.floor(uptime % 60);

        data['memory'] = `${mem}% (${used_mem} GB of ${max_mem})GB)`;
        data['uptime'] = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

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

    public getAttrs(): object {
        return {
            headers: {
                "Accept": "application/json",
                "Authorization": `PVEAPIToken=${this.config.username}=${this.config.password}`,
                "Accept-Encoding": "gzip, compress, deflate",
            }
        }
    }
}

export default Proxmox;