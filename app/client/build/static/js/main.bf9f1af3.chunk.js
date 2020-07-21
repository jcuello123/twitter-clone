(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{17:function(e,t,n){},18:function(e,t){function n(e){var t=document.createElement("div");t.className="post";var n=document.createElement("h4");n.innerText=e.name;var a=document.createElement("p");a.innerText=e.date;var o=document.createElement("textarea");o.id="content",o.readOnly=!0,o.innerText=e.content;var r=document.createElement("span");r.className="like-container";var l=document.createElement("button");l.innerHTML="&#x2661;",l.id="like-button";var c=document.createElement("p");c.id="numOfLikes",c.innerText="0",c.style.display="inline",l.addEventListener("click",(function(){!function(e,t){var n=e.style.color;e.style.color="red"===n?"#2d3842":"red",t.innerText=parseInt(t.innerText)+1}(l,c)})),r.style.display="inline",r.appendChild(l),r.appendChild(c),t.appendChild(n),t.appendChild(a),t.appendChild(o),t.appendChild(r),document.querySelector(".posts").prepend(t)}e.exports={appendPost:n,listAllPosts:function(){fetch("/api/posts").then((function(e){return e.json()})).then((function(e){e.forEach((function(e){n(e)}))}))}}},27:function(e,t,n){e.exports=n(38)},32:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(23),l=n.n(r),c=(n(32),n(8)),i=n(9),s=n(11),u=n(10),m=n(7),d=n(2),p=n(15),b=(n(17),n(13)),h=n(18),E=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){var e;return Object(c.a)(this,n),(e=t.call(this)).ensureAuthenticated=function(){fetch("/api/posts").then((function(e){return e.json()})).then((function(t){"failed"===t&&e.props.history.push("/")}))},e.handleSubmit=function(e){e.preventDefault();var t=document.getElementById("snook-form"),n=new FormData(t),a={name:n.get("name"),content:n.get("content"),date:(new Date).toLocaleString("en-US")};fetch("/api/posts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),Object(h.appendPost)(a),document.getElementById("input-content").value="";var o=document.getElementById("snook-btn");o.disabled=!0,localStorage.setItem("isButtonDisabled",!0),setTimeout((function(){o.disabled=!1,localStorage.setItem("isButtonDisabled",!1)}),1e4)},e.handleLogout=function(){fetch("/api/posts/logout").then((function(t){e.props.history.push("/")}))},e.handleSubmit=e.handleSubmit.bind(Object(p.a)(e)),e}return Object(i.a)(n,[{key:"componentDidMount",value:function(){document.title="Snookbook",this.ensureAuthenticated();var e=document.getElementById("snook-btn");e.disabled="true"===localStorage.getItem("isButtonDisabled"),localStorage.getItem("isButtonDisabled")&&setTimeout((function(){e.disabled=!1,localStorage.setItem("isButtonDisabled",!1)}),1e4),Object(h.listAllPosts)()}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement(b.a,null,o.a.createElement("style",null,"body { background-color: #15202b; color: white;}")),o.a.createElement("header",null,o.a.createElement("nav",null,o.a.createElement("button",{className:"m-2",onClick:this.handleLogout},"Logout"))),o.a.createElement("h1",{className:"text-center"},"Snookbook - Facebook for Snooks"),o.a.createElement("div",{className:"container posts-container"},o.a.createElement("form",{id:"snook-form",onSubmit:this.handleSubmit},o.a.createElement("label",{htmlFor:"content"},"Content"),o.a.createElement("br",null),o.a.createElement("textarea",{id:"input-content",className:"inp",name:"content",maxLength:"200",required:!0}),o.a.createElement("br",null),o.a.createElement("button",{className:"btn btn-primary my-3",id:"snook-btn"},"Send your Snook!")),o.a.createElement("div",{className:"posts"})))}}]),n}(a.Component),f=Object(d.f)(E),y=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(e=t.call.apply(t,[this].concat(o))).handleSubmit=function(e){e.preventDefault();var t=document.getElementById("input-name").value,n=document.getElementById("input-password").value,a=document.getElementById("confirm-password").value,o=document.getElementById("signup-status");if(n!==a)o.innerText="Passwords don't match.",o.style.color="red";else{var r={username:t,password:n};fetch("/api/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}).then((function(e){return e.json().then((function(e){"successful"===e?(o.innerText="Account creation was successful.",o.style.color="green"):"failed"===e?(o.innerText="Username already exists.",o.style.color="red"):(o.innerText="An error has occured. Please try again.",o.style.color="red")}))}))}},e}return Object(i.a)(n,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement(b.a,null,o.a.createElement("style",null,"body { background-color: #15202b; color: white;}")),o.a.createElement("h1",{className:"text-center"},"Create your Snookbook account"),o.a.createElement("div",{className:"signup-container"},o.a.createElement("form",{action:"POST"},o.a.createElement("p",{id:"signup-status"}),o.a.createElement("label",{htmlFor:"username"},"Create Username"),o.a.createElement("br",null),o.a.createElement("input",{type:"text",name:"username",id:"input-name",className:"inp",required:!0}),o.a.createElement("br",null),o.a.createElement("label",{htmlFor:"password"},"Create Password"),o.a.createElement("br",null),o.a.createElement("input",{type:"password",name:"password",id:"input-password",className:"inp",required:!0}),o.a.createElement("br",null),o.a.createElement("label",{htmlFor:"confirm-password"},"Confirm Password"),o.a.createElement("br",null),o.a.createElement("input",{type:"password",name:"confirmpassword",id:"confirm-password",className:"inp",required:!0}),o.a.createElement("br",null),o.a.createElement("input",{type:"submit",value:"Sign up",className:"btn btn-primary my-3",onClick:this.handleSubmit})),o.a.createElement("p",null,o.a.createElement(m.b,{to:"/"},"Login"))))}}]),n}(a.Component),g=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(e=t.call.apply(t,[this].concat(o))).handleLogin=function(t){t.preventDefault();var n={username:document.getElementById("input-name").value,password:document.getElementById("input-password").value};fetch("/api/posts/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}).then((function(e){return e.json()})).then((function(t){e.props.history.push("posts")})).catch((function(e){var t=document.getElementById("login-status");t.style.color="red",t.innerText="Incorrect username or password"}))},e}return Object(i.a)(n,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement(b.a,null,o.a.createElement("style",null,"body { background-color: #15202b; color: white;}")),o.a.createElement("h1",{className:"text-center"},"Snookbook - Facebook for Snooks"),o.a.createElement("div",{className:"login-container"},o.a.createElement("form",{id:"login-form"},o.a.createElement("p",{id:"login-status"}),o.a.createElement("label",{htmlFor:"username"},"Username"),o.a.createElement("br",null),o.a.createElement("input",{id:"input-name",className:"inp",name:"name",type:"text",required:!0}),o.a.createElement("br",null),o.a.createElement("label",{htmlFor:"password"},"Password"),o.a.createElement("br",null),o.a.createElement("input",{id:"input-password",className:"inp",type:"password"}),o.a.createElement("br",null),o.a.createElement("button",{onClick:this.handleLogin,className:"btn btn-primary my-3",id:"login-btn"},"Log in")),o.a.createElement("p",null,"Don't have an account? ",o.a.createElement(m.b,{to:"/signup"},"Sign up."))))}}]),n}(a.Component),v=Object(d.f)(g),k=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){return o.a.createElement(m.a,null,o.a.createElement("div",null,o.a.createElement(d.c,null,o.a.createElement(d.a,{exact:!0,path:"/",component:v}),o.a.createElement(d.a,{exact:!0,path:"/posts",component:f}),o.a.createElement(d.a,{exact:!0,path:"/signup",component:y}))))}}]),n}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(37);l.a.render(o.a.createElement(m.a,null,o.a.createElement(k,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[27,1,2]]]);
//# sourceMappingURL=main.bf9f1af3.chunk.js.map