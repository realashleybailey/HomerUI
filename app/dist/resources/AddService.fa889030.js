import{o as N,c as G,a as v,b as w,q as je,w as Ve,n as C,F as fe,l as he,r as $,u as Qe,p as Ne,t as X,v as Z,x as ge,y as W,z as h,A as x,B as Le,E as Ye,_ as ha,s as ga,k as ma,H as Xe,I as ba,m as ya}from"./index.f7b65c2a.js";function le(e){return[null,void 0].indexOf(e)!==-1}function Oa(e,r,l){const{object:o,valueProp:s,mode:m}=Z(e),t=ge().proxy,c=l.iv,q=(O,B=!0)=>{c.value=d(O);const S=g(O);r.emit("change",S,t),B&&(r.emit("input",S),r.emit("update:modelValue",S))},g=O=>o.value||le(O)?O:Array.isArray(O)?O.map(B=>B[s.value]):O[s.value],d=O=>le(O)?m.value==="single"?{}:[]:O;return{update:q}}function Sa(e,r){const{value:l,modelValue:o,mode:s,valueProp:m}=Z(e),t=W(s.value!=="single"?[]:{}),c=o&&o.value!==void 0?o:l,q=h(()=>s.value==="single"?t.value[m.value]:t.value.map(d=>d[m.value])),g=h(()=>s.value!=="single"?t.value.map(d=>d[m.value]).join(","):t.value[m.value]);return{iv:t,internalValue:t,ev:c,externalValue:c,textValue:g,plainValue:q}}function La(e,r,l){const{regex:o}=Z(e),s=ge().proxy,m=l.isOpen,t=l.open,c=W(null),q=W(null),g=()=>{c.value=""},d=S=>{c.value=S.target.value},O=S=>{if(o&&o.value){let P=o.value;typeof P=="string"&&(P=new RegExp(P)),S.key.match(P)||S.preventDefault()}},B=S=>{if(o&&o.value){let R=(S.clipboardData||window.clipboardData).getData("Text"),f=o.value;typeof f=="string"&&(f=new RegExp(f)),R.split("").every(M=>!!M.match(f))||S.preventDefault()}r.emit("paste",S,s)};return x(c,S=>{!m.value&&S&&t(),r.emit("search-change",S,s)}),{search:c,input:q,clearSearch:g,handleSearchInput:d,handleKeypress:O,handlePaste:B}}function ka(e,r,l){const{groupSelect:o,mode:s,groups:m,disabledProp:t}=Z(e),c=W(null),q=d=>{d===void 0||d!==null&&d[t.value]||m.value&&d&&d.group&&(s.value==="single"||!o.value)||(c.value=d)};return{pointer:c,setPointer:q,clearPointer:()=>{q(null)}}}function Se(e,r=!0){return r?String(e).toLowerCase().trim():String(e).toLowerCase().normalize("NFD").trim().replace(new RegExp(/æ/g),"ae").replace(new RegExp(/œ/g),"oe").replace(new RegExp(/ø/g),"o").replace(/\p{Diacritic}/gu,"")}function wa(e){return Object.prototype.toString.call(e)==="[object Object]"}function Pa(e,r){const l=r.slice().sort();return e.length===r.length&&e.slice().sort().every(function(o,s){return o===l[s]})}function Ta(e,r,l){const{options:o,mode:s,trackBy:m,limit:t,hideSelected:c,createTag:q,createOption:g,label:d,appendNewTag:O,appendNewOption:B,multipleLabel:S,object:P,loading:R,delay:f,resolveOnLoad:M,minChars:u,filterResults:I,clearOnSearch:K,clearOnSelect:D,valueProp:b,canDeselect:J,max:j,strict:H,closeOnSelect:Q,groups:ee,reverse:p,infinite:E,groupOptions:z,groupHideEmpty:te,groupSelect:me,onCreate:ce,disabledProp:k,searchStart:U}=Z(e),A=ge().proxy,L=l.iv,_=l.ev,V=l.search,oe=l.clearSearch,n=l.update,T=l.pointer,Y=l.clearPointer,ke=l.focus,Ze=l.deactivate,we=l.close,Pe=W([]),se=W([]),ae=W(!1),Te=W(null),qe=W(E.value&&t.value===-1?10:t.value),Ke=h(()=>q.value||g.value||!1),_e=h(()=>O.value!==void 0?O.value:B.value!==void 0?B.value:!0),ie=h(()=>{if(ee.value){let a=se.value||[],i=[];return a.forEach(y=>{Re(y[z.value]).forEach(F=>{i.push(Object.assign({},F,y[k.value]?{[k.value]:!0}:{}))})}),i}else{let a=Re(se.value||[]);return Pe.value.length&&(a=a.concat(Pe.value)),a}}),He=h(()=>ee.value?fa((se.value||[]).map((a,i)=>{const y=Re(a[z.value]);return{...a,index:i,group:!0,[z.value]:Ae(y,!1).map(F=>Object.assign({},F,a[k.value]?{[k.value]:!0}:{})),__VISIBLE__:Ae(y).map(F=>Object.assign({},F,a[k.value]?{[k.value]:!0}:{}))}})):[]),Fe=h(()=>{let a=ie.value;return p.value&&(a=a.reverse()),Ce.value.length&&(a=Ce.value.concat(a)),Ae(a)}),pe=h(()=>{let a=Fe.value;return qe.value>0&&(a=a.slice(0,qe.value)),a}),Ie=h(()=>{switch(s.value){case"single":return!le(L.value[b.value]);case"multiple":case"tags":return!le(L.value)&&L.value.length>0}}),xe=h(()=>S!==void 0&&S.value!==void 0?S.value(L.value,A):L.value&&L.value.length>1?`${L.value.length} options selected`:"1 option selected"),ea=h(()=>!ie.value.length&&!ae.value&&!Ce.value.length),aa=h(()=>ie.value.length>0&&pe.value.length==0&&(V.value&&ee.value||!ee.value)),Ce=h(()=>Ke.value===!1||!V.value?[]:ca(V.value)!==-1?[]:[{[b.value]:V.value,[d.value]:V.value,[ne.value]:V.value,__CREATE__:!0}]),ne=h(()=>m.value||d.value),la=h(()=>{switch(s.value){case"single":return null;case"multiple":case"tags":return[]}}),ta=h(()=>R.value||ae.value),de=a=>{switch(typeof a!="object"&&(a=re(a)),s.value){case"single":n(a);break;case"multiple":case"tags":n(L.value.concat(a));break}r.emit("select",We(a),a,A)},ve=a=>{switch(typeof a!="object"&&(a=re(a)),s.value){case"single":ze();break;case"tags":case"multiple":n(Array.isArray(a)?L.value.filter(i=>a.map(y=>y[b.value]).indexOf(i[b.value])===-1):L.value.filter(i=>i[b.value]!=a[b.value]));break}r.emit("deselect",We(a),a,A)},We=a=>P.value?a:a[b.value],Ue=a=>{ve(a)},sa=(a,i)=>{if(i.button!==0){i.preventDefault();return}Ue(a)},ze=()=>{r.emit("clear",A),n(la.value)},ue=a=>{if(a.group!==void 0)return s.value==="single"?!1:oa(a[z.value])&&a[z.value].length;switch(s.value){case"single":return!le(L.value)&&L.value[b.value]==a[b.value];case"tags":case"multiple":return!le(L.value)&&L.value.map(i=>i[b.value]).indexOf(a[b.value])!==-1}},Ee=a=>a[k.value]===!0,Be=()=>j===void 0||j.value===-1||!Ie.value&&j.value>0?!1:L.value.length>=j.value,na=a=>{if(!Ee(a)){if(ce&&ce.value&&!ue(a)&&a.__CREATE__&&(a={...a},delete a.__CREATE__,a=ce.value(a,A),a instanceof Promise)){ae.value=!0,a.then(i=>{ae.value=!1,$e(i)});return}$e(a)}},$e=a=>{switch(a.__CREATE__&&(a={...a},delete a.__CREATE__),s.value){case"single":if(a&&ue(a)){J.value&&ve(a);return}a&&De(a),D.value&&oe(),Q.value&&(Y(),we()),a&&de(a);break;case"multiple":if(a&&ue(a)){ve(a);return}if(Be()){r.emit("max",A);return}a&&(De(a),de(a)),D.value&&oe(),c.value&&Y(),Q.value&&we();break;case"tags":if(a&&ue(a)){ve(a);return}if(Be()){r.emit("max",A);return}a&&De(a),D.value&&oe(),a&&de(a),c.value&&Y(),Q.value&&we();break}Q.value||ke()},ra=a=>{if(!(Ee(a)||s.value==="single"||!me.value)){switch(s.value){case"multiple":case"tags":ua(a[z.value])?ve(a[z.value]):de(a[z.value].filter(i=>L.value.map(y=>y[b.value]).indexOf(i[b.value])===-1).filter(i=>!i[k.value]).filter((i,y)=>L.value.length+1+y<=j.value||j.value===-1));break}Q.value&&Ze()}},De=a=>{re(a[b.value])===void 0&&Ke.value&&(r.emit("tag",a[b.value],A),r.emit("option",a[b.value],A),_e.value&&va(a),oe())},ia=()=>{s.value!=="single"&&de(pe.value)},ua=a=>a.find(i=>!ue(i)&&!i[k.value])===void 0,oa=a=>a.find(i=>!ue(i))===void 0,re=a=>ie.value[ie.value.map(i=>String(i[b.value])).indexOf(String(a))],ca=(a,i=!0)=>ie.value.map(y=>parseInt(y[ne.value])==y[ne.value]?parseInt(y[ne.value]):y[ne.value]).indexOf(parseInt(a)==a?parseInt(a):a),da=a=>["tags","multiple"].indexOf(s.value)!==-1&&c.value&&ue(a),va=a=>{Pe.value.push(a)},fa=a=>te.value?a.filter(i=>V.value?i.__VISIBLE__.length:i[z.value].length):a.filter(i=>V.value?i.__VISIBLE__.length:!0),Ae=(a,i=!0)=>{let y=a;return V.value&&I.value&&(y=y.filter(F=>U.value?Se(F[ne.value],H.value).startsWith(Se(V.value,H.value)):Se(F[ne.value],H.value).indexOf(Se(V.value,H.value))!==-1)),c.value&&i&&(y=y.filter(F=>!da(F))),y},Re=a=>{let i=a;return wa(i)&&(i=Object.keys(i).map(y=>{let F=i[y];return{[b.value]:y,[ne.value]:F,[d.value]:F}})),i=i.map(y=>typeof y=="object"?y:{[b.value]:y,[ne.value]:y,[d.value]:y}),i},be=()=>{le(_.value)||(L.value=Oe(_.value))},ye=a=>(ae.value=!0,new Promise((i,y)=>{o.value(V.value,A).then(F=>{se.value=F||[],typeof a=="function"&&a(F),ae.value=!1}).catch(F=>{console.error(F),se.value=[],ae.value=!1}).finally(()=>{i()})})),Me=()=>{if(!!Ie.value)if(s.value==="single"){let a=re(L.value[b.value]);if(a!==void 0){let i=a[d.value];L.value[d.value]=i,P.value&&(_.value[d.value]=i)}}else L.value.forEach((a,i)=>{let y=re(L.value[i][b.value]);if(y!==void 0){let F=y[d.value];L.value[i][d.value]=F,P.value&&(_.value[i][d.value]=F)}})},pa=a=>{ye(a)},Oe=a=>le(a)?s.value==="single"?{}:[]:P.value?a:s.value==="single"?re(a)||{}:a.filter(i=>!!re(i)).map(i=>re(i)),Je=()=>{Te.value=x(V,a=>{a.length<u.value||!a&&u.value!==0||(ae.value=!0,K.value&&(se.value=[]),setTimeout(()=>{a==V.value&&o.value(V.value,A).then(i=>{(a==V.value||!V.value)&&(se.value=i,T.value=pe.value.filter(y=>y[k.value]!==!0)[0]||null,ae.value=!1)}).catch(i=>{console.error(i)})},f.value))},{flush:"sync"})};if(s.value!=="single"&&!le(_.value)&&!Array.isArray(_.value))throw new Error(`v-model must be an array when using "${s.value}" mode`);return o&&typeof o.value=="function"?M.value?ye(be):P.value==!0&&be():(se.value=o.value,be()),f.value>-1&&Je(),x(f,(a,i)=>{Te.value&&Te.value(),a>=0&&Je()}),x(_,a=>{if(le(a)){n(Oe(a),!1);return}switch(s.value){case"single":(P.value?a[b.value]!=L.value[b.value]:a!=L.value[b.value])&&n(Oe(a),!1);break;case"multiple":case"tags":Pa(P.value?a.map(i=>i[b.value]):a,L.value.map(i=>i[b.value]))||n(Oe(a),!1);break}},{deep:!0}),x(o,(a,i)=>{typeof e.options=="function"?M.value&&(!i||a&&a.toString()!==i.toString())&&ye():(se.value=e.options,Object.keys(L.value).length||be(),Me())}),x(d,Me),{pfo:Fe,fo:pe,filteredOptions:pe,hasSelected:Ie,multipleLabelText:xe,eo:ie,extendedOptions:ie,fg:He,filteredGroups:He,noOptions:ea,noResults:aa,resolving:ae,busy:ta,offset:qe,select:de,deselect:ve,remove:Ue,selectAll:ia,clear:ze,isSelected:ue,isDisabled:Ee,isMax:Be,getOption:re,handleOptionClick:na,handleGroupClick:ra,handleTagRemove:sa,refreshOptions:pa,resolveOptions:ye,refreshLabels:Me}}function qa(e,r,l){const{valueProp:o,showOptions:s,searchable:m,groupLabel:t,groups:c,mode:q,groupSelect:g,disabledProp:d}=Z(e),O=l.fo,B=l.fg,S=l.handleOptionClick,P=l.handleGroupClick,R=l.search,f=l.pointer,M=l.setPointer,u=l.clearPointer,I=l.multiselect,K=l.isOpen,D=h(()=>O.value.filter(n=>!n[d.value])),b=h(()=>B.value.filter(n=>!n[d.value])),J=h(()=>q.value!=="single"&&g.value),j=h(()=>f.value&&f.value.group),H=h(()=>V(f.value)),Q=h(()=>{const n=j.value?f.value:V(f.value),T=b.value.map(ke=>ke[t.value]).indexOf(n[t.value]);let Y=b.value[T-1];return Y===void 0&&(Y=p.value),Y}),ee=h(()=>{let n=b.value.map(T=>T.label).indexOf(j.value?f.value[t.value]:V(f.value)[t.value])+1;return b.value.length<=n&&(n=0),b.value[n]}),p=h(()=>[...b.value].slice(-1)[0]),E=h(()=>f.value.__VISIBLE__.filter(n=>!n[d.value])[0]),z=h(()=>{const n=H.value.__VISIBLE__.filter(T=>!T[d.value]);return n[n.map(T=>T[o.value]).indexOf(f.value[o.value])-1]}),te=h(()=>{const n=V(f.value).__VISIBLE__.filter(T=>!T[d.value]);return n[n.map(T=>T[o.value]).indexOf(f.value[o.value])+1]}),me=h(()=>[...Q.value.__VISIBLE__.filter(n=>!n[d.value])].slice(-1)[0]),ce=h(()=>[...p.value.__VISIBLE__.filter(n=>!n[d.value])].slice(-1)[0]),k=n=>!!f.value&&(!n.group&&f.value[o.value]==n[o.value]||n.group!==void 0&&f.value[t.value]==n[t.value])?!0:void 0,U=()=>{M(D.value[0]||null)},A=()=>{!f.value||f.value[d.value]===!0||(j.value?P(f.value):S(f.value))},L=()=>{if(f.value===null)M((c.value&&J.value?b.value[0]:D.value[0])||null);else if(c.value&&J.value){let n=j.value?E.value:te.value;n===void 0&&(n=ee.value),M(n||null)}else{let n=D.value.map(T=>T[o.value]).indexOf(f.value[o.value])+1;D.value.length<=n&&(n=0),M(D.value[n]||null)}Le(()=>{oe()})},_=()=>{if(f.value===null){let n=D.value[D.value.length-1];c.value&&J.value&&(n=ce.value,n===void 0&&(n=p.value)),M(n||null)}else if(c.value&&J.value){let n=j.value?me.value:z.value;n===void 0&&(n=j.value?Q.value:H.value),M(n||null)}else{let n=D.value.map(T=>T[o.value]).indexOf(f.value[o.value])-1;n<0&&(n=D.value.length-1),M(D.value[n]||null)}Le(()=>{oe()})},V=n=>b.value.find(T=>T.__VISIBLE__.map(Y=>Y[o.value]).indexOf(n[o.value])!==-1),oe=()=>{let n=I.value.querySelector("[data-pointed]");if(!n)return;let T=n.parentElement.parentElement;c.value&&(T=j.value?n.parentElement.parentElement.parentElement:n.parentElement.parentElement.parentElement.parentElement),n.offsetTop+n.offsetHeight>T.clientHeight+T.scrollTop&&(T.scrollTop=n.offsetTop+n.offsetHeight-T.clientHeight),n.offsetTop<T.scrollTop&&(T.scrollTop=n.offsetTop)};return x(R,n=>{m.value&&(n.length&&s.value?U():u())}),x(K,n=>{if(n){let T=I.value.querySelectorAll("[data-selected]")[0];if(!T)return;let Y=T.parentElement.parentElement;Le(()=>{Y.scrollTop>0||(Y.scrollTop=T.offsetTop)})}}),{pointer:f,canPointGroups:J,isPointed:k,setPointerFirst:U,selectPointer:A,forwardPointer:L,backwardPointer:_}}function Ia(e,r,l){const{disabled:o}=Z(e),s=ge().proxy,m=W(!1);return{isOpen:m,open:()=>{m.value||o.value||(m.value=!0,r.emit("open",s))},close:()=>{!m.value||(m.value=!1,r.emit("close",s))}}}function Ca(e,r,l){const{searchable:o,disabled:s,clearOnBlur:m}=Z(e),t=l.input,c=l.open,q=l.close,g=l.clearSearch,d=l.isOpen,O=W(null),B=W(null),S=W(null),P=W(!1),R=W(!1),f=h(()=>o.value||s.value?-1:0),M=()=>{o.value&&t.value.blur(),B.value.blur()},u=()=>{o.value&&!s.value&&t.value.focus()},I=(H=!0)=>{s.value||(P.value=!0,H&&c())},K=()=>{P.value=!1,setTimeout(()=>{P.value||(q(),m.value&&g())},1)};return{multiselect:O,wrapper:B,tags:S,tabindex:f,isActive:P,mouseClicked:R,blur:M,focus:u,activate:I,deactivate:K,handleFocusIn:H=>{H.target.closest("[data-tags]")&&H.target.nodeName!=="INPUT"||H.target.closest("[data-clear]")||I(R.value)},handleFocusOut:()=>{K()},handleCaretClick:()=>{K(),M()},handleMousedown:H=>{R.value=!0,d.value&&(H.target.isEqualNode(B.value)||H.target.isEqualNode(S.value))?setTimeout(()=>{K()},0):document.activeElement.isEqualNode(B.value)&&!d.value&&I(),setTimeout(()=>{R.value=!1},0)}}}function Ea(e,r,l){const{mode:o,addTagOn:s,openDirection:m,searchable:t,showOptions:c,valueProp:q,groups:g,addOptionOn:d,createTag:O,createOption:B,reverse:S}=Z(e),P=ge().proxy,R=l.iv,f=l.update,M=l.search,u=l.setPointer,I=l.selectPointer,K=l.backwardPointer,D=l.forwardPointer,b=l.multiselect,J=l.wrapper,j=l.tags,H=l.isOpen,Q=l.open,ee=l.blur,p=l.fo,E=h(()=>O.value||B.value||!1),z=h(()=>s.value!==void 0?s.value:d.value!==void 0?d.value:["enter"]),te=()=>{o.value==="tags"&&!c.value&&E.value&&t.value&&!g.value&&u(p.value[p.value.map(k=>k[q.value]).indexOf(M.value)])};return{handleKeydown:k=>{r.emit("keydown",k,P);let U,A;switch(["ArrowLeft","ArrowRight","Enter"].indexOf(k.key)!==-1&&o.value==="tags"&&(U=[...b.value.querySelectorAll("[data-tags] > *")].filter(L=>L!==j.value),A=U.findIndex(L=>L===document.activeElement)),k.key){case"Backspace":if(o.value==="single"||t.value&&[null,""].indexOf(M.value)===-1||R.value.length===0)return;f([...R.value].slice(0,-1));break;case"Enter":if(k.preventDefault(),k.keyCode===229)return;if(A!==-1&&A!==void 0){f([...R.value].filter((L,_)=>_!==A)),A===U.length-1&&(U.length-1?U[U.length-2].focus():t.value?j.value.querySelector("input").focus():J.value.focus());return}if(z.value.indexOf("enter")===-1&&E.value)return;te(),I();break;case" ":if(!E.value&&!t.value){k.preventDefault(),te(),I();return}if(!E.value)return!1;if(z.value.indexOf("space")===-1&&E.value)return;k.preventDefault(),te(),I();break;case"Tab":case";":case",":if(z.value.indexOf(k.key.toLowerCase())===-1||!E.value)return;te(),I(),k.preventDefault();break;case"Escape":ee();break;case"ArrowUp":if(k.preventDefault(),!c.value)return;H.value||Q(),K();break;case"ArrowDown":if(k.preventDefault(),!c.value)return;H.value||Q(),D();break;case"ArrowLeft":if(t.value&&j.value&&j.value.querySelector("input").selectionStart||k.shiftKey||o.value!=="tags"||!R.value||!R.value.length)return;k.preventDefault(),A===-1?U[U.length-1].focus():A>0&&U[A-1].focus();break;case"ArrowRight":if(A===-1||k.shiftKey||o.value!=="tags"||!R.value||!R.value.length)return;k.preventDefault(),U.length>A+1?U[A+1].focus():t.value?j.value.querySelector("input").focus():t.value||J.value.focus();break}},handleKeyup:k=>{r.emit("keyup",k,P)},preparePointer:te}}function Ba(e,r,l){const{classes:o,disabled:s,openDirection:m,showOptions:t}=Z(e),c=l.isOpen,q=l.isPointed,g=l.isSelected,d=l.isDisabled,O=l.isActive,B=l.canPointGroups,S=l.resolving,P=l.fo,R=h(()=>({container:"multiselect",containerDisabled:"is-disabled",containerOpen:"is-open",containerOpenTop:"is-open-top",containerActive:"is-active",wrapper:"multiselect-wrapper",singleLabel:"multiselect-single-label",singleLabelText:"multiselect-single-label-text",multipleLabel:"multiselect-multiple-label",search:"multiselect-search",tags:"multiselect-tags",tag:"multiselect-tag",tagDisabled:"is-disabled",tagRemove:"multiselect-tag-remove",tagRemoveIcon:"multiselect-tag-remove-icon",tagsSearchWrapper:"multiselect-tags-search-wrapper",tagsSearch:"multiselect-tags-search",tagsSearchCopy:"multiselect-tags-search-copy",placeholder:"multiselect-placeholder",caret:"multiselect-caret",caretOpen:"is-open",clear:"multiselect-clear",clearIcon:"multiselect-clear-icon",spinner:"multiselect-spinner",inifinite:"multiselect-inifite",inifiniteSpinner:"multiselect-inifite-spinner",dropdown:"multiselect-dropdown",dropdownTop:"is-top",dropdownHidden:"is-hidden",options:"multiselect-options",optionsTop:"is-top",group:"multiselect-group",groupLabel:"multiselect-group-label",groupLabelPointable:"is-pointable",groupLabelPointed:"is-pointed",groupLabelSelected:"is-selected",groupLabelDisabled:"is-disabled",groupLabelSelectedPointed:"is-selected is-pointed",groupLabelSelectedDisabled:"is-selected is-disabled",groupOptions:"multiselect-group-options",option:"multiselect-option",optionPointed:"is-pointed",optionSelected:"is-selected",optionDisabled:"is-disabled",optionSelectedPointed:"is-selected is-pointed",optionSelectedDisabled:"is-selected is-disabled",noOptions:"multiselect-no-options",noResults:"multiselect-no-results",fakeInput:"multiselect-fake-input",assist:"multiselect-assistive-text",spacer:"multiselect-spacer",...o.value})),f=h(()=>!!(c.value&&t.value&&(!S.value||S.value&&P.value.length)));return{classList:h(()=>{const u=R.value;return{container:[u.container].concat(s.value?u.containerDisabled:[]).concat(f.value&&m.value==="top"?u.containerOpenTop:[]).concat(f.value&&m.value!=="top"?u.containerOpen:[]).concat(O.value?u.containerActive:[]),wrapper:u.wrapper,spacer:u.spacer,singleLabel:u.singleLabel,singleLabelText:u.singleLabelText,multipleLabel:u.multipleLabel,search:u.search,tags:u.tags,tag:[u.tag].concat(s.value?u.tagDisabled:[]),tagRemove:u.tagRemove,tagRemoveIcon:u.tagRemoveIcon,tagsSearchWrapper:u.tagsSearchWrapper,tagsSearch:u.tagsSearch,tagsSearchCopy:u.tagsSearchCopy,placeholder:u.placeholder,caret:[u.caret].concat(c.value?u.caretOpen:[]),clear:u.clear,clearIcon:u.clearIcon,spinner:u.spinner,inifinite:u.inifinite,inifiniteSpinner:u.inifiniteSpinner,dropdown:[u.dropdown].concat(m.value==="top"?u.dropdownTop:[]).concat(!c.value||!t.value||!f.value?u.dropdownHidden:[]),options:[u.options].concat(m.value==="top"?u.optionsTop:[]),group:u.group,groupLabel:I=>{let K=[u.groupLabel];return q(I)?K.push(g(I)?u.groupLabelSelectedPointed:u.groupLabelPointed):g(I)&&B.value?K.push(d(I)?u.groupLabelSelectedDisabled:u.groupLabelSelected):d(I)&&K.push(u.groupLabelDisabled),B.value&&K.push(u.groupLabelPointable),K},groupOptions:u.groupOptions,option:(I,K)=>{let D=[u.option];return q(I)?D.push(g(I)?u.optionSelectedPointed:u.optionPointed):g(I)?D.push(d(I)?u.optionSelectedDisabled:u.optionSelected):(d(I)||K&&d(K))&&D.push(u.optionDisabled),D},noOptions:u.noOptions,noResults:u.noResults,assist:u.assist,fakeInput:u.fakeInput}}),showDropdown:f}}function Da(e,r,l){const{limit:o,infinite:s}=Z(e),m=l.isOpen,t=l.offset,c=l.search,q=l.pfo,g=l.eo,d=W(null),O=W(null),B=h(()=>t.value<q.value.length),S=R=>{const{isIntersecting:f,target:M}=R[0];if(f){const u=M.offsetParent,I=u.scrollTop;t.value+=o.value==-1?10:o.value,Le(()=>{u.scrollTop=I})}},P=()=>{m.value&&t.value<q.value.length?d.value.observe(O.value):!m.value&&d.value&&d.value.disconnect()};return x(m,()=>{!s.value||P()}),x(c,()=>{!s.value||(t.value=o.value,P())},{flush:"post"}),x(g,()=>{!s.value||P()},{immediate:!1,flush:"post"}),Ye(()=>{window&&window.IntersectionObserver&&(d.value=new IntersectionObserver(S))}),{hasMore:B,infiniteLoader:O}}function Aa(e,r,l){const{placeholder:o,id:s,valueProp:m,label:t,mode:c,groupLabel:q,aria:g,searchable:d}=Z(e),O=l.pointer,B=l.iv,S=l.hasSelected,P=l.multipleLabelText,R=W(null),f=h(()=>{let p=[];return s&&s.value&&p.push(s.value),p.push("assist"),p.join("-")}),M=h(()=>{let p=[];return s&&s.value&&p.push(s.value),p.push("multiselect-options"),p.join("-")}),u=h(()=>{let p=[];if(s&&s.value&&p.push(s.value),O.value)return p.push(O.value.group?"multiselect-group":"multiselect-option"),p.push(O.value.group?O.value.index:O.value[m.value]),p.join("-")}),I=h(()=>o.value),K=h(()=>c.value!=="single"),D=h(()=>{let p="";return c.value==="single"&&S.value&&(p+=B.value[t.value]),c.value==="multiple"&&S.value&&(p+=P.value),c.value==="tags"&&S.value&&(p+=B.value.map(E=>E[t.value]).join(", ")),p}),b=h(()=>{let p={...g.value};return d.value&&(p["aria-labelledby"]=p["aria-labelledby"]?`${f.value} ${p["aria-labelledby"]}`:f.value,D.value&&p["aria-label"]&&(p["aria-label"]=`${D.value}, ${p["aria-label"]}`)),p}),J=p=>{let E=[];return s&&s.value&&E.push(s.value),E.push("multiselect-option"),E.push(p[m.value]),E.join("-")},j=p=>{let E=[];return s&&s.value&&E.push(s.value),E.push("multiselect-group"),E.push(p.index),E.join("-")},H=p=>{let E=[];return E.push(p[t.value]),E.join(" ")},Q=p=>{let E=[];return E.push(p[q.value]),E.join(" ")},ee=p=>`${p} \u274E`;return Ye(()=>{if(s&&s.value&&document&&document.querySelector){let p=document.querySelector(`[for="${s.value}"]`);R.value=p?p.innerText:null}}),{arias:b,ariaLabel:D,ariaAssist:f,ariaControls:M,ariaPlaceholder:I,ariaMultiselectable:K,ariaActiveDescendant:u,ariaOptionId:J,ariaOptionLabel:H,ariaGroupId:j,ariaGroupLabel:Q,ariaTagLabel:ee}}function Ra(e,r,l,o={}){return l.forEach(s=>{s&&(o={...o,...s(e,r,o)})}),o}var Ge={name:"Multiselect",emits:["paste","open","close","select","deselect","input","search-change","tag","option","update:modelValue","change","clear","keydown","keyup","max"],props:{value:{required:!1},modelValue:{required:!1},options:{type:[Array,Object,Function],required:!1,default:()=>[]},id:{type:[String,Number],required:!1},name:{type:[String,Number],required:!1,default:"multiselect"},disabled:{type:Boolean,required:!1,default:!1},label:{type:String,required:!1,default:"label"},trackBy:{type:String,required:!1,default:void 0},valueProp:{type:String,required:!1,default:"value"},placeholder:{type:String,required:!1,default:null},mode:{type:String,required:!1,default:"single"},searchable:{type:Boolean,required:!1,default:!1},limit:{type:Number,required:!1,default:-1},hideSelected:{type:Boolean,required:!1,default:!0},createTag:{type:Boolean,required:!1,default:void 0},createOption:{type:Boolean,required:!1,default:void 0},appendNewTag:{type:Boolean,required:!1,default:void 0},appendNewOption:{type:Boolean,required:!1,default:void 0},addTagOn:{type:Array,required:!1,default:void 0},addOptionOn:{type:Array,required:!1,default:void 0},caret:{type:Boolean,required:!1,default:!0},loading:{type:Boolean,required:!1,default:!1},noOptionsText:{type:String,required:!1,default:"The list is empty"},noResultsText:{type:String,required:!1,default:"No results found"},multipleLabel:{type:Function,required:!1},object:{type:Boolean,required:!1,default:!1},delay:{type:Number,required:!1,default:-1},minChars:{type:Number,required:!1,default:0},resolveOnLoad:{type:Boolean,required:!1,default:!0},filterResults:{type:Boolean,required:!1,default:!0},clearOnSearch:{type:Boolean,required:!1,default:!1},clearOnSelect:{type:Boolean,required:!1,default:!0},canDeselect:{type:Boolean,required:!1,default:!0},canClear:{type:Boolean,required:!1,default:!0},max:{type:Number,required:!1,default:-1},showOptions:{type:Boolean,required:!1,default:!0},required:{type:Boolean,required:!1,default:!1},openDirection:{type:String,required:!1,default:"bottom"},nativeSupport:{type:Boolean,required:!1,default:!1},classes:{type:Object,required:!1,default:()=>({})},strict:{type:Boolean,required:!1,default:!0},closeOnSelect:{type:Boolean,required:!1,default:!0},autocomplete:{type:String,required:!1},groups:{type:Boolean,required:!1,default:!1},groupLabel:{type:String,required:!1,default:"label"},groupOptions:{type:String,required:!1,default:"options"},groupHideEmpty:{type:Boolean,required:!1,default:!1},groupSelect:{type:Boolean,required:!1,default:!0},inputType:{type:String,required:!1,default:"text"},attrs:{required:!1,type:Object,default:()=>({})},onCreate:{required:!1,type:Function},disabledProp:{type:String,required:!1,default:"disabled"},searchStart:{type:Boolean,required:!1,default:!1},reverse:{type:Boolean,required:!1,default:!1},regex:{type:[Object,String,RegExp],required:!1,default:void 0},rtl:{type:Boolean,required:!1,default:!1},infinite:{type:Boolean,required:!1,default:!1},aria:{required:!1,type:Object,default:()=>({})},clearOnBlur:{required:!1,type:Boolean,default:!0}},setup(e,r){return Ra(e,r,[Sa,ka,Ia,La,Oa,Ca,Ta,Da,qa,Ea,Ba,Aa])}};const Ma=["id","dir"],ja=["tabindex","aria-controls","aria-placeholder","aria-expanded","aria-activedescendant","aria-multiselectable","role"],Va=["type","modelValue","value","autocomplete","id","aria-controls","aria-placeholder","aria-expanded","aria-activedescendant","aria-multiselectable"],Na=["onKeyup","aria-label"],Ga=["onClick"],Ka=["type","modelValue","value","id","autocomplete","aria-controls","aria-placeholder","aria-expanded","aria-activedescendant","aria-multiselectable"],Ha=["innerHTML"],Fa=["id"],Wa=["id","aria-label","aria-selected"],Ua=["data-pointed","onMouseenter","onClick"],za=["innerHTML"],$a=["aria-label"],Ja=["data-pointed","data-selected","onMouseenter","onClick","id","aria-selected","aria-label"],Qa=["data-pointed","data-selected","onMouseenter","onClick","id","aria-selected","aria-label"],Xa=["innerHTML"],Ya=["innerHTML"],Za=["value"],_a=["name","value"],xa=["name","value"],el=["id"];function al(e,r,l,o,s,m){return N(),G("div",{ref:"multiselect",class:C(e.classList.container),id:l.searchable?void 0:l.id,dir:l.rtl?"rtl":void 0,onFocusin:r[10]||(r[10]=(...t)=>e.handleFocusIn&&e.handleFocusIn(...t)),onFocusout:r[11]||(r[11]=(...t)=>e.handleFocusOut&&e.handleFocusOut(...t)),onKeyup:r[12]||(r[12]=(...t)=>e.handleKeyup&&e.handleKeyup(...t)),onKeydown:r[13]||(r[13]=(...t)=>e.handleKeydown&&e.handleKeydown(...t))},[v("div",je({class:e.classList.wrapper,onMousedown:r[9]||(r[9]=(...t)=>e.handleMousedown&&e.handleMousedown(...t)),ref:"wrapper",tabindex:e.tabindex,"aria-controls":l.searchable?void 0:e.ariaControls,"aria-placeholder":l.searchable?void 0:e.ariaPlaceholder,"aria-expanded":l.searchable?void 0:e.isOpen,"aria-activedescendant":l.searchable?void 0:e.ariaActiveDescendant,"aria-multiselectable":l.searchable?void 0:e.ariaMultiselectable,role:l.searchable?void 0:"combobox"},l.searchable?{}:e.arias),[w(" Search "),l.mode!=="tags"&&l.searchable&&!l.disabled?(N(),G("input",je({key:0,type:l.inputType,modelValue:e.search,value:e.search,class:e.classList.search,autocomplete:l.autocomplete,id:l.searchable?l.id:void 0,onInput:r[0]||(r[0]=(...t)=>e.handleSearchInput&&e.handleSearchInput(...t)),onKeypress:r[1]||(r[1]=(...t)=>e.handleKeypress&&e.handleKeypress(...t)),onPaste:r[2]||(r[2]=Ve((...t)=>e.handlePaste&&e.handlePaste(...t),["stop"])),ref:"input","aria-controls":e.ariaControls,"aria-placeholder":e.ariaPlaceholder,"aria-expanded":e.isOpen,"aria-activedescendant":e.ariaActiveDescendant,"aria-multiselectable":e.ariaMultiselectable,role:"combobox"},{...l.attrs,...e.arias}),null,16,Va)):w("v-if",!0),w(" Tags (with search) "),l.mode=="tags"?(N(),G("div",{key:1,class:C(e.classList.tags),"data-tags":""},[(N(!0),G(fe,null,he(e.iv,(t,c,q)=>$(e.$slots,"tag",{option:t,handleTagRemove:e.handleTagRemove,disabled:l.disabled},()=>[(N(),G("span",{class:C(e.classList.tag),tabindex:"-1",onKeyup:Qe(g=>e.handleTagRemove(t,g),["enter"]),key:q,"aria-label":e.ariaTagLabel(t[l.label])},[Ne(X(t[l.label])+" ",1),l.disabled?w("v-if",!0):(N(),G("span",{key:0,class:C(e.classList.tagRemove),onClick:Ve(g=>e.handleTagRemove(t,g),["stop"])},[v("span",{class:C(e.classList.tagRemoveIcon)},null,2)],10,Ga))],42,Na))])),256)),v("div",{class:C(e.classList.tagsSearchWrapper),ref:"tags"},[w(" Used for measuring search width "),v("span",{class:C(e.classList.tagsSearchCopy)},X(e.search),3),w(" Actual search input "),l.searchable&&!l.disabled?(N(),G("input",je({key:0,type:l.inputType,modelValue:e.search,value:e.search,class:e.classList.tagsSearch,id:l.searchable?l.id:void 0,autocomplete:l.autocomplete,onInput:r[3]||(r[3]=(...t)=>e.handleSearchInput&&e.handleSearchInput(...t)),onKeypress:r[4]||(r[4]=(...t)=>e.handleKeypress&&e.handleKeypress(...t)),onPaste:r[5]||(r[5]=Ve((...t)=>e.handlePaste&&e.handlePaste(...t),["stop"])),ref:"input","aria-controls":e.ariaControls,"aria-placeholder":e.ariaPlaceholder,"aria-expanded":e.isOpen,"aria-activedescendant":e.ariaActiveDescendant,"aria-multiselectable":e.ariaMultiselectable,role:"combobox"},{...l.attrs,...e.arias}),null,16,Ka)):w("v-if",!0)],2)],2)):w("v-if",!0),w(" Single label "),l.mode=="single"&&e.hasSelected&&!e.search&&e.iv?$(e.$slots,"singlelabel",{key:2,value:e.iv},()=>[v("div",{class:C(e.classList.singleLabel)},[v("span",{class:C(e.classList.singleLabelText)},X(e.iv[l.label]),3)],2)]):w("v-if",!0),w(" Multiple label "),l.mode=="multiple"&&e.hasSelected&&!e.search?$(e.$slots,"multiplelabel",{key:3,values:e.iv},()=>[v("div",{class:C(e.classList.multipleLabel),innerHTML:e.multipleLabelText},null,10,Ha)]):w("v-if",!0),w(" Placeholder "),l.placeholder&&!e.hasSelected&&!e.search?$(e.$slots,"placeholder",{key:4},()=>[v("div",{class:C(e.classList.placeholder),"aria-hidden":"true"},X(l.placeholder),3)]):w("v-if",!0),w(" Spinner "),l.loading||e.resolving?$(e.$slots,"spinner",{key:5},()=>[v("span",{class:C(e.classList.spinner),"aria-hidden":"true"},null,2)]):w("v-if",!0),w(" Clear "),e.hasSelected&&!l.disabled&&l.canClear&&!e.busy?$(e.$slots,"clear",{key:6,clear:e.clear},()=>[v("span",{"aria-hidden":"true",tabindex:"0",role:"button","data-clear":"","aria-roledescription":"\u274E",class:C(e.classList.clear),onClick:r[6]||(r[6]=(...t)=>e.clear&&e.clear(...t)),onKeyup:r[7]||(r[7]=Qe((...t)=>e.clear&&e.clear(...t),["enter"]))},[v("span",{class:C(e.classList.clearIcon)},null,2)],34)]):w("v-if",!0),w(" Caret "),l.caret&&l.showOptions?$(e.$slots,"caret",{key:7},()=>[v("span",{class:C(e.classList.caret),onClick:r[8]||(r[8]=(...t)=>e.handleCaretClick&&e.handleCaretClick(...t)),"aria-hidden":"true"},null,2)]):w("v-if",!0)],16,ja),w(" Options "),v("div",{class:C(e.classList.dropdown),tabindex:"-1"},[$(e.$slots,"beforelist",{options:e.fo}),v("ul",{class:C(e.classList.options),id:e.ariaControls,role:"listbox"},[l.groups?(N(!0),G(fe,{key:0},he(e.fg,(t,c,q)=>(N(),G("li",{class:C(e.classList.group),key:q,id:e.ariaGroupId(t),"aria-label":e.ariaGroupLabel(t),"aria-selected":e.isSelected(t),role:"option"},[v("div",{class:C(e.classList.groupLabel(t)),"data-pointed":e.isPointed(t),onMouseenter:g=>e.setPointer(t,c),onClick:g=>e.handleGroupClick(t)},[$(e.$slots,"grouplabel",{group:t,isSelected:e.isSelected,isPointed:e.isPointed},()=>[v("span",{innerHTML:t[l.groupLabel]},null,8,za)])],42,Ua),v("ul",{class:C(e.classList.groupOptions),"aria-label":e.ariaGroupLabel(t),role:"group"},[(N(!0),G(fe,null,he(t.__VISIBLE__,(g,d,O)=>(N(),G("li",{class:C(e.classList.option(g,t)),"data-pointed":e.isPointed(g),"data-selected":e.isSelected(g)||void 0,key:O,onMouseenter:B=>e.setPointer(g),onClick:B=>e.handleOptionClick(g),id:e.ariaOptionId(g),"aria-selected":e.isSelected(g),"aria-label":e.ariaOptionLabel(g),role:"option"},[$(e.$slots,"option",{option:g,isSelected:e.isSelected,isPointed:e.isPointed,search:e.search},()=>[v("span",null,X(g[l.label]),1)])],42,Ja))),128))],10,$a)],10,Wa))),128)):(N(!0),G(fe,{key:1},he(e.fo,(t,c,q)=>(N(),G("li",{class:C(e.classList.option(t)),"data-pointed":e.isPointed(t),"data-selected":e.isSelected(t)||void 0,key:q,onMouseenter:g=>e.setPointer(t),onClick:g=>e.handleOptionClick(t),id:e.ariaOptionId(t),"aria-selected":e.isSelected(t),"aria-label":e.ariaOptionLabel(t),role:"option"},[$(e.$slots,"option",{option:t,isSelected:e.isSelected,isPointed:e.isPointed,search:e.search},()=>[v("span",null,X(t[l.label]),1)])],42,Qa))),128))],10,Fa),e.noOptions?$(e.$slots,"nooptions",{key:0},()=>[v("div",{class:C(e.classList.noOptions),innerHTML:l.noOptionsText},null,10,Xa)]):w("v-if",!0),e.noResults?$(e.$slots,"noresults",{key:1},()=>[v("div",{class:C(e.classList.noResults),innerHTML:l.noResultsText},null,10,Ya)]):w("v-if",!0),l.infinite&&e.hasMore?(N(),G("div",{key:2,class:C(e.classList.inifinite),ref:"infiniteLoader"},[$(e.$slots,"infinite",{},()=>[v("span",{class:C(e.classList.inifiniteSpinner)},null,2)])],2)):w("v-if",!0),$(e.$slots,"afterlist",{options:e.fo})],2),w(" Hacky input element to show HTML5 required warning "),l.required?(N(),G("input",{key:0,class:C(e.classList.fakeInput),tabindex:"-1",value:e.textValue,required:""},null,10,Za)):w("v-if",!0),w(" Native input support "),l.nativeSupport?(N(),G(fe,{key:1},[l.mode=="single"?(N(),G("input",{key:0,type:"hidden",name:l.name,value:e.plainValue!==void 0?e.plainValue:""},null,8,_a)):(N(!0),G(fe,{key:1},he(e.plainValue,(t,c)=>(N(),G("input",{type:"hidden",name:`${l.name}[]`,value:t,key:c},null,8,xa))),128))],64)):w("v-if",!0),w(" Screen reader assistive text "),l.searchable&&e.hasSelected?(N(),G("div",{key:2,class:C(e.classList.assist),id:e.ariaAssist,"aria-hidden":"true"},X(e.ariaLabel),11,el)):w("v-if",!0),w(" Create height for empty input "),v("div",{class:C(e.classList.spacer)},null,2)],42,Ma)}Ge.render=al;Ge.__file="src/Multiselect.vue";const ll={name:"App",components:{Multiselect:Ge},data(){return{value:null,options:[],serviceImgHeight:0}},computed:{logo:function(){return ga.getters.logo}},async created(){const r=(await(await fetch("/assets/supportedapps.json")).json()).apps;this.options=r.map(l=>({value:l,name:l.name,icon:l.icon})),window.test=this},methods:{customLabel({title:e}){return`${e}`},cleanUrl(e){return e.replace(/(^\w+:|^)\/\//,"").replace("www.","")}}},tl={class:"section"},sl={class:"container"},nl={class:"multiselect-single-label"},rl=["src","onerror"],il=["src","onerror"],ul={key:0,class:"mt-5"},ol={class:"card has-text-light-dark",style:{transform:"none"}},cl={class:"card-content",style:{height:"auto"}},dl={class:"columns"},vl={class:"column is-one-fifth p-5"},fl={ref:"serviceImg"},pl=["src","onerror"],hl={class:"column pt-4"},gl={ref:"serviceContent"},ml={class:"title-text"},bl={class:"info-text-p"},yl={class:"icon-text pt-2"},Ol=v("span",{class:"icon"},[v("i",{class:"fas fa-link"})],-1),Sl=["href"],Ll={class:"tag is-normal"},kl=v("h2",{class:"group-title mb-0 mt-6"}," Service Details ",-1),wl={class:"mt-4"},Pl={class:"columns has-text-light-dark"},Tl={class:"column"},ql={class:"field"},Il=v("label",{class:"label has-text-light-dark"},"Service Name *",-1),Cl={class:"control"},El=["value"],Bl=ba('<div class="column"><div class="field"><label class="label has-text-light-dark">Service URL *</label><div class="control"><input class="input" type="text"></div></div></div>',1),Dl=v("div",{class:"buttons is-right"},[v("button",{class:"button is-link",style:{"background-color":"var(--highlight-secondary)"}},"Add Service")],-1);function Al(e,r,l,o,s,m){const t=ya("Multiselect");return N(),G("section",tl,[v("div",sl,[ma(t,{modelValue:s.value,"onUpdate:modelValue":r[0]||(r[0]=c=>s.value=c),searchable:!0,placeholder:"Select or Search for service",label:"name",options:s.options},{singlelabel:Xe(({value:c})=>[v("div",nl,[v("img",{class:"is-icon",src:`/assets/tools/${c.icon}`,onerror:`this.onerror=null; this.src='${m.logo}'`},null,8,rl),Ne(" "+X(c.name),1)])]),option:Xe(({option:c})=>[v("img",{class:"is-icon",src:`/assets/tools/${c.icon}`,onerror:`this.onerror=null; this.src='${m.logo}'`},null,8,il),Ne(" "+X(c.name),1)]),_:1},8,["modelValue","options"]),s.value?(N(),G("div",ul,[v("div",ol,[v("div",cl,[v("div",dl,[v("div",vl,[v("div",fl,[v("img",{src:`/assets/tools/${s.value.icon}`,onerror:`this.onerror=null; this.src='${m.logo}'`,style:{width:"100%",height:"100%","object-fit":"contain","aspect-ratio":"1/1"}},null,8,pl)],512)]),v("div",hl,[v("div",gl,[v("h1",ml,X(s.value.name),1),v("p",bl,X(s.value.description),1),v("div",yl,[Ol,v("span",null,[v("a",{href:s.value.website,target:"_blank"},X(m.cleanUrl(s.value.website)),9,Sl)])])],512)])])]),v("span",Ll,X(s.value.license),1)]),kl,v("div",wl,[v("div",Pl,[v("div",Tl,[v("div",ql,[Il,v("div",Cl,[v("input",{class:"input",type:"text",value:s.value.name},null,8,El)])])]),Bl]),Dl])])):w("",!0)])])}const Ml=ha(ll,[["render",Al]]);export{Ml as default};
