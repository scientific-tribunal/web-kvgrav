if(!self.define){let e,r={};const s=(s,n)=>(s=new URL(s+".js",n).href,r[s]||new Promise((r=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=r,document.head.appendChild(e)}else e=s,importScripts(s),r()})).then((()=>{let e=r[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,o)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(r[i])return;let l={};const f=e=>s(e,i),t={module:{uri:i},exports:l,require:f};r[i]=Promise.all(n.map((e=>t[e]||f(e)))).then((e=>(o(...e),l)))}}define(["./workbox-db5fc017"],(function(e){"use strict";e.setCacheNameDetails({prefix:"web-kvgrav"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/web-kvgrav/css/app.35032058.css",revision:null},{url:"/web-kvgrav/fonts/fa-brands-400.672e913f.woff2",revision:null},{url:"/web-kvgrav/fonts/fa-brands-400.d67d1219.ttf",revision:null},{url:"/web-kvgrav/fonts/fa-regular-400.073940ed.ttf",revision:null},{url:"/web-kvgrav/fonts/fa-regular-400.c7c7429f.woff2",revision:null},{url:"/web-kvgrav/fonts/fa-solid-900.c9f6e418.ttf",revision:null},{url:"/web-kvgrav/fonts/fa-solid-900.d5d28b78.woff2",revision:null},{url:"/web-kvgrav/index.html",revision:"e92d06beae1cf13f6e7311abfef84118"},{url:"/web-kvgrav/js/app.f7959d04.js",revision:null},{url:"/web-kvgrav/js/chunk-vendors.4a89bd3a.js",revision:null},{url:"/web-kvgrav/manifest.json",revision:"fbcfdaa5da4e5b32f184deab02901cd1"},{url:"/web-kvgrav/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
