!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){let n,o,r=[];const a=indexedDB.open("budget",1);function l(){let e=r.reduce((e,t)=>e+parseInt(t.value),0);document.querySelector("#total").textContent=e}function i(){let e=document.querySelector("#tbody");e.innerHTML="",r.forEach(t=>{let n=document.createElement("tr");n.innerHTML=`\n      <td>${t.name}</td>\n      <td>${t.value}</td>\n    `,e.appendChild(n)})}function c(){let e=r.slice().reverse(),t=0,o=e.map(e=>{let t=new Date(e.date);return`${t.getMonth()+1}/${t.getDate()}/${t.getFullYear()}`}),a=e.map(e=>(t+=parseInt(e.value),t));n&&n.destroy();let l=document.getElementById("myChart").getContext("2d");n=new Chart(l,{type:"line",data:{labels:o,datasets:[{label:"Total Over Time",fill:!0,backgroundColor:"#6666ff",data:a}]}})}function u(e){let t=document.querySelector("#t-name"),n=document.querySelector("#t-amount"),a=document.querySelector(".form .error");if(""===t.value||""===n.value)return void(a.textContent="Missing Information");a.textContent="";let u={name:t.value,value:n.value,date:(new Date).toISOString()};e||(u.value*=-1),r.unshift(u),c(),i(),l(),fetch("/api/transaction",{method:"POST",body:JSON.stringify(u),headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"}}).then(e=>e.json()).then(e=>{e.errors?a.textContent="Missing Information":(t.value="",n.value="")}).catch(e=>{var r;r=u,console.log(r),o.transaction(["offlineStorage"],"readwrite").objectStore("offlineStorage").add(r),t.value="",n.value=""})}a.onupgradeneeded=({target:e})=>{e.result.createObjectStore("offlineStorage",{autoIncrement:!0})},a.onsuccess=()=>{if(o=a.result,navigator.onLine){const e=o.transaction(["offlineStorage"],"readwrite").objectStore("offlineStorage").getAll();e.onsuccess=()=>{console.log(e.result.length),e.result.length>0&&(console.log("hi"),fetch("/api/transaction/bulk",{method:"POST",body:JSON.stringify(e.result),headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"}}).then(e=>{e.json()}).then(()=>{o.transaction(["offlineStorage"],"readwrite").objectStore("offlineStorage").clear()}).then(()=>{location.reload()}))}}},fetch("/api/transaction").then(e=>e.json()).then(e=>{r=e,l(),i(),c()}),document.querySelector("#add-btn").onclick=function(){u(!0)},document.querySelector("#sub-btn").onclick=function(){u(!1)}}]);