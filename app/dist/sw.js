if(!self.define){let r,s={};const e=(e,l)=>(e=new URL(e+".js",l).href,s[e]||new Promise((s=>{if("document"in self){const r=document.createElement("script");r.src=e,r.onload=s,document.head.appendChild(r)}else r=e,importScripts(e),s()})).then((()=>{let r=s[e];if(!r)throw new Error(`Module ${e} didn’t register its module`);return r})));self.define=(l,u)=>{const o=r||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let i={};const n=r=>e(r,o),c={module:{uri:o},exports:i,require:n};s[o]=Promise.all(l.map((r=>c[r]||n(r)))).then((r=>(u(...r),i)))}}define(["./workbox-e4df0f2a"],(function(r){"use strict";self.skipWaiting(),r.clientsClaim(),r.precacheAndRoute([{url:"index.html",revision:"9876a37474cc057388ccf1e81c812592"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"resources/AddService.0c0b3419.css",revision:null},{url:"resources/AddService.fa889030.js",revision:null},{url:"resources/AdGuardHome.58ee6c83.css",revision:null},{url:"resources/AdGuardHome.b5a524f0.js",revision:null},{url:"resources/CopyToClipboard.3f343d5a.js",revision:null},{url:"resources/CopyToClipboard.a17573c3.css",revision:null},{url:"resources/Dashboard.4f77f1ad.js",revision:null},{url:"resources/Dashboard.65644e78.css",revision:null},{url:"resources/Emby.1c49ce56.css",revision:null},{url:"resources/Emby.4324cd7c.js",revision:null},{url:"resources/Healthchecks.470ef3d9.js",revision:null},{url:"resources/Healthchecks.c88f2822.css",revision:null},{url:"resources/index.b70a499a.css",revision:null},{url:"resources/index.f7b65c2a.js",revision:null},{url:"resources/Lidarr.267e9ab5.js",revision:null},{url:"resources/Lidarr.f62c6a04.css",revision:null},{url:"resources/Login.5f701d91.css",revision:null},{url:"resources/Login.80ac11b6.js",revision:null},{url:"resources/Mealie.9bf4dd51.js",revision:null},{url:"resources/Medusa.3db27a5e.js",revision:null},{url:"resources/Medusa.e73e6d80.css",revision:null},{url:"resources/NotFound.b42bb675.js",revision:null},{url:"resources/NotFound.e0b00523.css",revision:null},{url:"resources/OctoPrint.82ff3c38.js",revision:null},{url:"resources/OctoPrint.93605ea5.css",revision:null},{url:"resources/OpenWeather.8aa6f938.js",revision:null},{url:"resources/OpenWeather.c3a274b3.css",revision:null},{url:"resources/PaperlessNG.fe312117.js",revision:null},{url:"resources/PiHole.0856efc5.js",revision:null},{url:"resources/PiHole.c062e1f1.css",revision:null},{url:"resources/Ping.48f95ddb.js",revision:null},{url:"resources/Ping.f54b6bba.css",revision:null},{url:"resources/Portainer.3349bafa.js",revision:null},{url:"resources/Portainer.8fec3428.css",revision:null},{url:"resources/Prometheus.33bec39c.css",revision:null},{url:"resources/Prometheus.8fac9aba.js",revision:null},{url:"resources/Prowlarr.2c1ae3fa.css",revision:null},{url:"resources/Prowlarr.d1955943.js",revision:null},{url:"resources/Proxmox.04b227e5.css",revision:null},{url:"resources/Proxmox.d81db037.js",revision:null},{url:"resources/qBittorrent.776bf34f.js",revision:null},{url:"resources/qBittorrent.dc942469.css",revision:null},{url:"resources/Radarr.eb9f7ff0.css",revision:null},{url:"resources/Radarr.f6d1ba18.js",revision:null},{url:"resources/Rtorrent.a1b7781a.css",revision:null},{url:"resources/Rtorrent.bb533d90.js",revision:null},{url:"resources/SABnzbd.83ed1bda.js",revision:null},{url:"resources/SABnzbd.f94c9543.css",revision:null},{url:"resources/service.541fc1e6.js",revision:null},{url:"resources/Settings.5893d540.css",revision:null},{url:"resources/Settings.edc1cdac.js",revision:null},{url:"resources/Sonarr.1d42ca7a.js",revision:null},{url:"resources/Sonarr.1dfb8d14.css",revision:null},{url:"resources/SpeedtestTracker.35e19a9b.js",revision:null},{url:"resources/Tautulli.48e421a2.js",revision:null},{url:"resources/Tautulli.d3f86925.css",revision:null},{url:"resources/UptimeKuma.29705488.css",revision:null},{url:"resources/UptimeKuma.765293cb.js",revision:null},{url:"resources/WUD.5673736c.css",revision:null},{url:"resources/WUD.bb6a9c79.js",revision:null},{url:"assets/manifest.json",revision:"32b26ee6e51fb4c94ac9a6398aded962"}],{}),r.cleanupOutdatedCaches()}));
