import{s as p}from"./service.541fc1e6.js";import{G as g}from"./Dashboard.4f77f1ad.js";import{_ as y,m as k,o as e,f as w,H as m,a as i,t as r,c as t,F as u,p as l,n as h,b as d,Q as x,R as b}from"./index.f7b65c2a.js";const v={name:"Proxmox",mixins:[p],props:{item:Object},components:{Generic:g},data:()=>({vms:{total:0,running:0},lxcs:{total:0,running:0},memoryUsed:0,diskUsed:0,cpuUsed:0,hide:[],error:!1,loading:!0}),created(){this.item.hide&&(this.hide=this.item.hide),this.fetchStatus()},methods:{statusClass(s){return s>this.item.danger_value?"danger":s>this.item.warning_value?"warning":"healthy"},fetchStatus:async function(){try{const s={headers:{Authorization:this.item.api_token}},n=await this.fetch(`/api2/json/nodes/${this.item.node}/status`,s),a=this.item.hide_decimals?0:1;if(this.memoryUsed=(n.data.memory.used*100/n.data.memory.total).toFixed(a),this.diskUsed=(n.data.rootfs.used*100/n.data.rootfs.total).toFixed(a),this.cpuUsed=(n.data.cpu*100).toFixed(a),this.isValueShown("vms")){const c=await this.fetch(`/api2/json/nodes/${this.item.node}/qemu`,s);this.parseVMsAndLXCs(c,this.vms)}if(this.isValueShown("lxcs")){const c=await this.fetch(`/api2/json/nodes/${this.item.node}/lxc`,s);this.parseVMsAndLXCs(c,this.lxcs)}this.error=!1}catch(s){console.log(s),this.error=!0}this.loading=!1},parseVMsAndLXCs(s,n){n.total+=s.data.length,n.running+=s.data.filter(a=>a.status==="running").length,n.total==0&&this.hide.push("lxcs")},isValueShown(s){return this.hide.indexOf(s)==-1}}},_=s=>(x("data-v-527b8e5d"),s=s(),b(),s),S={class:"title is-4"},V={class:"subtitle is-6"},C={key:0},U=_(()=>i("strong",null,"Loading...",-1)),F=[U],L={key:1},M=_(()=>i("strong",{class:"danger"},"Error loading info",-1)),j=[M],A={key:0,class:"margined"},B={class:"is-number"},G={class:"has-text-weight-bold"},I={key:0},P={key:1,class:"margined"},X={class:"is-number"},z={class:"has-text-weight-bold"},N={key:0},D={key:2,class:"margined"},E={key:3,class:"margined"},O={key:4,class:"margined"},T={key:0,class:"fa fa-circle-notch fa-spin fa-2xl"},q={key:1,class:"fa fa-exclamation-circle fa-2xl danger"};function H(s,n,a,c,Q,o){const f=k("Generic");return e(),w(f,{item:a.item},{content:m(()=>[i("p",S,r(a.item.name),1),i("p",V,[a.item.subtitle?(e(),t(u,{key:0},[l(r(a.item.subtitle),1)],64)):s.vms?(e(),t(u,{key:1},[s.loading?(e(),t("div",C,F)):s.error?(e(),t("div",L,j)):(e(),t("div",{key:2,class:h(["metrics",{"is-size-7-mobile":a.item.small_font_on_small_screens,"is-small":a.item.small_font_on_desktop}])},[o.isValueShown("vms")?(e(),t("span",A,[l("VMs: "),i("span",B,[i("span",G,r(s.vms.running),1),o.isValueShown("vms_total")?(e(),t("span",I,"/"+r(s.vms.total),1)):d("",!0)])])):d("",!0),o.isValueShown("lxcs")?(e(),t("span",P,[l("LXCs: "),i("span",X,[i("span",z,r(s.lxcs.running),1),o.isValueShown("lxcs_total")?(e(),t("span",N,"/"+r(s.lxcs.total),1)):d("",!0)])])):d("",!0),o.isValueShown("disk")?(e(),t("span",D,[l("Disk: "),i("span",{class:h(["has-text-weight-bold is-number",o.statusClass(s.diskUsed)])},r(s.diskUsed)+"%",3)])):d("",!0),o.isValueShown("mem")?(e(),t("span",E,[l("Mem: "),i("span",{class:h(["has-text-weight-bold is-number",o.statusClass(s.memoryUsed)])},r(s.memoryUsed)+"%",3)])):d("",!0),o.isValueShown("cpu")?(e(),t("span",O,[l("CPU: "),i("span",{class:h(["has-text-weight-bold is-number",o.statusClass(s.cpuUsed)])},r(s.cpuUsed)+"%",3)])):d("",!0)],2))],64)):d("",!0)])]),indicator:m(()=>[s.loading?(e(),t("i",T)):d("",!0),s.error?(e(),t("i",q)):d("",!0)]),_:1},8,["item"])}const W=y(v,[["render",H],["__scopeId","data-v-527b8e5d"]]);export{W as default};
