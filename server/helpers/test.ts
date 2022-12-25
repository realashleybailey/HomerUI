
const test = async () => {


    const AdGuardHome = (await import('../supportedapps/AdGuardHome/AdGuardHome')).default

    const adGuardHome = new AdGuardHome({ 
        url: "https://adguard.gitcloud.org/",
        username: "admin",
        password: "Josephejb15@"
    });

    const test = await adGuardHome.livestats();

}

test();