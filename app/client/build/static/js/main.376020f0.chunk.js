(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{16:function(e,t,n){},17:function(e,t){function n(e,t,n){var a=document.createElement("div");a.className="post";var r=document.createElement("h4");r.innerText=e.name;var o=document.createElement("p");o.innerText=e.date;var l=document.createElement("textarea");l.id="content",l.readOnly=!0,l.innerText=e.content;var c=document.createElement("span");c.className="like-container";var i=document.createElement("button");i.innerHTML="&#x2661;",i.id="like-button",i.style.color=t;var s=document.createElement("p");s.id="numOfLikes",void 0===n&&(n=0),s.innerText=n,s.style.display="inline",i.addEventListener("click",(function(){!function(e,t,n){var a="pink"!==e.style.color;a?(e.style.color="pink",t.innerText=parseInt(t.innerText)+1):(e.style.color="#2d3842",t.innerText=parseInt(t.innerText)-1,a=!1);var r={};fetch("/api/posts/login").then((function(e){return e.json()})).then((function(e){r={post:n,username:e,liked:a}})).then((function(e){fetch("/api/posts",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})}))}(i,s,e)})),c.style.display="inline",c.appendChild(i),c.appendChild(s),a.appendChild(r),a.appendChild(o),a.appendChild(l),a.appendChild(c),document.querySelector(".posts").prepend(a)}e.exports={appendPost:n,listAllPosts:function(){fetch("/api/posts/login").then((function(e){return e.json()})).then((function(e){document.getElementById("username").innerHTML=e,fetch("/api/posts").then((function(e){return e.json()})).then((function(t){t.forEach((function(t){var a=t.likedBy.includes(e)?"pink":"#2d3842";n(t,a,t.likes)}))}))}))}}},27:function(e,t,n){e.exports=n(38)},32:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(22),l=n.n(o),c=(n(32),n(6)),i=n(7),s=n(9),u=n(8),m=n(11),d=n(2),p=n(14),h=(n(16),n(17)),f=n(23),E=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){return r.a.createElement(f.a,null,r.a.createElement("style",null,"body { background-image: url(bg.jpg);background-position: fixed;background-repeat: no-repeat;background-size:cover; color: white;font-family: Rowdies,Georgia, serif;}"))}}]),n}(a.Component),b=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){var e;return Object(c.a)(this,n),(e=t.call(this)).ensureAuthenticated=function(){fetch("/api/posts").then((function(e){return e.json()})).then((function(t){"failed"===t&&e.props.history.push("/")}))},e.handlePost=function(e){e.preventDefault();var t=document.getElementById("username").innerHTML,n=document.getElementById("snook-form"),a={name:t,content:new FormData(n).get("content"),date:(new Date).toLocaleString("en-US")};fetch("/api/posts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),Object(h.appendPost)(a),document.getElementById("input-content").value="";var r=document.getElementById("snook-btn");r.disabled=!0,localStorage.setItem("isButtonDisabled",!0),setTimeout((function(){r.disabled=!1,localStorage.setItem("isButtonDisabled",!1)}),1e4)},e.handleLogout=function(){fetch("/api/posts/logout").then((function(t){e.props.history.push("/")}))},e.handlePost=e.handlePost.bind(Object(p.a)(e)),e}return Object(i.a)(n,[{key:"componentDidMount",value:function(){document.title="Snookbook",this.ensureAuthenticated();var e=document.getElementById("snook-btn");e.disabled="true"===localStorage.getItem("isButtonDisabled"),localStorage.getItem("isButtonDisabled")&&setTimeout((function(){e.disabled=!1,localStorage.setItem("isButtonDisabled",!1)}),1e4),Object(h.listAllPosts)()}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(E,null),r.a.createElement("header",null,r.a.createElement("nav",null,r.a.createElement("a",{href:"/"},r.a.createElement("img",{src:"logo.png",alt:"",style:{width:"100px",height:"100px"}})),r.a.createElement("button",{id:"logout-btn",className:"m-2",onClick:this.handleLogout},"Logout"),r.a.createElement("p",{id:"username",className:"m-2"}))),r.a.createElement("h1",{className:"text-center"},"Snookbook - Facebook for Snooks"),r.a.createElement("div",{className:"container posts-container"},r.a.createElement("form",{id:"snook-form",onSubmit:this.handlePost},r.a.createElement("label",{htmlFor:"content"},"Content"),r.a.createElement("br",null),r.a.createElement("textarea",{id:"input-content",className:"inp",name:"content",maxLength:"200",required:!0}),r.a.createElement("br",null),r.a.createElement("button",{className:"btn btn-primary my-3",id:"snook-btn"},"Send your Snook!")),r.a.createElement("div",{className:"posts"})))}}]),n}(a.Component),g=Object(d.f)(b),y=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){return r.a.createElement("header",null,r.a.createElement("nav",null,r.a.createElement("a",{href:"/"},r.a.createElement("img",{src:"logo.png",alt:"",style:{width:"100px",height:"100px"}}))))}}]),n}(a.Component),v=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).handleSubmit=function(e){e.preventDefault();var t=document.getElementById("input-name").value,n=document.getElementById("input-password").value,a=document.getElementById("confirm-password").value,r=document.getElementById("signup-status");if(n!==a)r.innerText="Passwords don't match.",r.style.color="red";else{var o={username:t,password:n};fetch("/api/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then((function(e){return e.json().then((function(e){"successful"===e?(r.innerText="Account creation was successful.",r.style.color="green"):"failed"===e?(r.innerText="Username already exists.",r.style.color="red"):(r.innerText="An error has occured. Please try again.",r.style.color="red")}))}))}},e.previewImage=function(){var e=new FileReader;e.readAsDataURL(document.getElementById("uploadImage").files[0]),e.onload=function(e){document.getElementById("profile-picture").src=e.target.result}},e}return Object(i.a)(n,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(E,null),r.a.createElement(y,null),r.a.createElement("h1",{className:"text-center"},"Create your Snookbook account"),r.a.createElement("div",{className:"signup-container"},r.a.createElement("form",null,r.a.createElement("p",null,"Choose a profile picture"),r.a.createElement("img",{src:"emptycontact.png",alt:"",id:"profile-picture",className:"mb-3",style:{width:"100px",height:"100px",borderRadius:"50px"}}),r.a.createElement("br",null),r.a.createElement("input",{name:"photo",type:"file",id:"uploadImage",className:"text-center",onChange:this.previewImage}),r.a.createElement("p",{id:"signup-status mt-2"}),r.a.createElement("label",{htmlFor:"username"},"Create Username"),r.a.createElement("br",null),r.a.createElement("input",{type:"text",name:"username",id:"input-name",className:"signup-inp",required:!0}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"password"},"Create Password"),r.a.createElement("br",null),r.a.createElement("input",{type:"password",name:"password",id:"input-password",className:"signup-inp",required:!0}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"confirm-password"},"Confirm Password"),r.a.createElement("br",null),r.a.createElement("input",{type:"password",name:"confirmpassword",id:"confirm-password",className:"signup-inp",required:!0}),r.a.createElement("br",null),r.a.createElement("input",{type:"submit",value:"Sign up",id:"signup-btn",className:"btn btn-primary my-3",onClick:this.handleSubmit})),r.a.createElement("p",null,"Back to",r.a.createElement(m.b,{to:"/",id:"login-link"}," ","Login"))))}}]),n}(a.Component),k=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).handleLogin=function(t){t.preventDefault();var n={username:document.getElementById("input-name").value,password:document.getElementById("input-password").value};fetch("/api/posts/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}).then((function(e){return e.json()})).then((function(t){e.props.history.push("posts")})).catch((function(e){var t=document.getElementById("login-status");t.style.color="red",t.innerText="Incorrect username or password"}))},e}return Object(i.a)(n,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(E,null),r.a.createElement(y,null),r.a.createElement("div",{className:"welcome-container"},r.a.createElement("p",{id:"welcome-text"},"Welcome to"),r.a.createElement("p",{id:"snookbook-text"},"Snookbook.."),r.a.createElement("p",{id:"fav-text"},"..Your favorite social media app")),r.a.createElement("div",{className:"login-container"},r.a.createElement("form",{id:"login-form"},r.a.createElement("p",{id:"login-status"}),r.a.createElement("label",{htmlFor:"username"},"Username"),r.a.createElement("br",null),r.a.createElement("input",{id:"input-name",className:"inp",name:"name",type:"text",required:!0}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement("br",null),r.a.createElement("input",{id:"input-password",className:"inp",type:"password"}),r.a.createElement("br",null),r.a.createElement("button",{onClick:this.handleLogin,className:"btn btn-primary my-3",id:"login-btn"},"Log in")),r.a.createElement("p",null,"Don't have an account?"," ",r.a.createElement(m.b,{to:"/signup",id:"signup-link"},"Sign up."))))}}]),n}(a.Component),w=Object(d.f)(k),j=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){return r.a.createElement(m.a,null,r.a.createElement("div",null,r.a.createElement(d.c,null,r.a.createElement(d.a,{exact:!0,path:"/",component:w}),r.a.createElement(d.a,{exact:!0,path:"/posts",component:g}),r.a.createElement(d.a,{exact:!0,path:"/signup",component:v}))))}}]),n}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(37);l.a.render(r.a.createElement(m.a,null,r.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[27,1,2]]]);
//# sourceMappingURL=main.376020f0.chunk.js.map