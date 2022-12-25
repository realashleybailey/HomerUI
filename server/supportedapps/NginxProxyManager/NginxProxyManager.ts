import SupportedApps from "../SupportedApps";

class NginxProxyManager extends SupportedApps {

    public test(): Promise<object> {
        let test = this.appTest(this.url("/api/tokens"), this.config.headers, {
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

        let auth_res = await this.execute(this.url("/api/tokens"), this.config.headers, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            data: {
                "identity": this.config.username,
                "secret": this.config.password
            }
        }, "POST");

        if (auth_res == null) return { status, data };

        let auth_data = auth_res.data;
        let token = auth_data['token'];

        let res = await this.execute(this.url("/api/reports/hosts"), this.config.headers, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });


        if (res == null) return { status, data };

        data['proxy'] = res.data['proxy'];
        data['redirection'] = res.data['redirection'];

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
}

export default NginxProxyManager;