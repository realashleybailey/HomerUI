import{s as h}from"./service.541fc1e6.js";import{G as l}from"./Dashboard.4f77f1ad.js";import{_ as m,m as f,o as s,f as _,H as p,a as g,c as o,t as a,b as c}from"./index.f7b65c2a.js";const y={name:"Portainer",mixins:[h],props:{item:Object},components:{Generic:l},data:()=>({endpoints:null,containers:null}),computed:{running:function(){return this.containers?this.containers.filter(t=>t.State.toLowerCase()==="running").length:""},dead:function(){return this.containers?this.containers.filter(t=>t.State.toLowerCase()==="dead").length:""},misc:function(){return this.containers?this.containers.filter(t=>t.State.toLowerCase()!=="running"&&t.State.toLowerCase()!=="dead").length:""}},created(){this.fetchStatus()},methods:{fetchStatus:async function(){const t={"X-Api-Key":this.item.apikey};this.endpoints=await this.fetch("/api/endpoints",{headers:t}).catch(n=>{console.error(n)});let i=[];for(let n of this.endpoints){if(this.item.environments&&!this.item.environments.includes(n.Name))continue;const d=`/api/endpoints/${n.Id}/docker/containers/json?all=1`,r=await this.fetch(d,{headers:t}).catch(e=>{console.error(e)});r&&(i=i.concat(r))}this.containers=i}}},k={class:"notifs"},v={key:0,class:"notif running",title:"Running"},C={key:1,class:"notif dead",title:"Dead"},w={key:2,class:"notif misc",title:"Other (creating, paused, exited, etc.)"};function x(t,i,n,d,r,e){const u=f("Generic");return s(),_(u,{item:n.item},{indicator:p(()=>[g("div",k,[e.running>0?(s(),o("strong",v,a(e.running),1)):c("",!0),e.dead>0?(s(),o("strong",C,a(e.dead),1)):c("",!0),e.misc>0?(s(),o("strong",w,a(e.misc),1)):c("",!0)])]),_:1},8,["item"])}const L=m(y,[["render",x],["__scopeId","data-v-36a39228"]]);export{L as default};