import"./assets/styles-D3adp64J.js";import{f as l,i as c}from"./assets/vendor-A92OCY9B.js";const e={input:document.querySelector("#datetime-picker"),startBtn:document.querySelector("[data-start]"),daysEl:document.querySelector("[data-days]"),hoursEl:document.querySelector("[data-hours]"),minutesEl:document.querySelector("[data-minutes]"),secondsEl:document.querySelector("[data-seconds]")};let i=null,u=null;l(e.input,{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){const n=t[0];n<=new Date?(c.error({title:"Error",message:"illegal operation"}),e.startBtn.disabled=!0):(i=n,e.startBtn.disabled=!1)}});e.startBtn.addEventListener("click",m);function m(){e.startBtn.disabled=!0,e.input.disabled=!0,u=setInterval(()=>{const t=i-new Date;if(t<=0){clearInterval(u),d(0),e.input.disabled=!1;return}d(t)},1e3)}function d(t){const{days:n,hours:o,minutes:a,seconds:s}=f(t);e.daysEl.textContent=r(n),e.hoursEl.textContent=r(o),e.minutesEl.textContent=r(a),e.secondsEl.textContent=r(s)}function f(t){return{days:Math.floor(t/864e5),hours:Math.floor(t%864e5/36e5),minutes:Math.floor(t%864e5%36e5/6e4),seconds:Math.floor(t%864e5%36e5%6e4/1e3)}}function r(t){return String(t).padStart(2,"0")}
//# sourceMappingURL=1-timer.js.map
