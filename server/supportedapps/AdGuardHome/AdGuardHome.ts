import SupportedApps from "../SupportedApps";

class AdGuardHome extends SupportedApps {

    
    public test(): Promise<object> {
        let test = this.appTest(this.url("/control/stats"), this.config.headers, {
            auth: {
                username: this.config.username,
                password: this.config.password
            }
        });
        return test;
    }

    public async livestats(): Promise<object> {
        let status = "inactive";
        let res = await this.execute(this.url("/control/stats"), this.config.headers, {
            auth: {
                username: this.config.username,
                password: this.config.password
            }
        });

        let data = [] as any;
        if (res == null) return { status, data };

        let details = res.data;

        if (details) {
            if (Array.isArray(details['dns_queries'])) {
                let dns_queries_sum = details['dns_queries'].reduce((a: number, b: number) => a + b, 0);
                data['dns_queries'] = dns_queries_sum.toLocaleString();

                let blocked_filtering_sum = details['blocked_filtering'].reduce((a: number, b: number) => a + b, 0);
                data['blocked_filtering'] = blocked_filtering_sum.toLocaleString();
            } else {
                data['dns_queries'] = details['dns_queries'].toLocaleString();
                data['blocked_filtering'] = details['blocked_filtering'].toLocaleString();
            }
        }

        let html = await this.getLiveStats(data);

        return {
            status: status,
            html: html
        };
    }

    public url(endpoint: string): string {
        let apiUrl: string = super.normaliseurl(this.config.url);
        let protocol = apiUrl.match(/(http):\/\//) ? "http" : "https";

        let rebuildUrl: string = apiUrl.replace(`${protocol}://`, `${protocol}://`);

        rebuildUrl = rebuildUrl.replace(/\/$/, "");
      
        apiUrl = rebuildUrl + endpoint;
        return apiUrl;
    }


}

export default AdGuardHome;