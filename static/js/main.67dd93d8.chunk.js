(this["webpackJsonpto-do-app"]=this["webpackJsonpto-do-app"]||[]).push([[0],{11:function(e,t,a){e.exports=a(19)},16:function(e,t,a){},17:function(e,t,a){},19:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),c=a(5),d=a.n(c),i=(a(16),a(6)),l=a(7),r=a(1),s=a(10),u=a(9),h=[{id:1,text:"Implement an to-do app using react",completed:!0},{id:2,text:"push the code to git and update readme",completed:!1}];a(17);var m=function(e){return o.a.createElement("div",{className:"todo-item"},o.a.createElement("input",{type:"checkbox",checked:e.item.completed,onChange:function(){return e.handleChange(e.item.id)}}),o.a.createElement("p",null,e.item.text))},p=a(3),k=(a(18),function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(i.a)(this,a),(e=t.call(this)).state={todos:h},e.handleChange=e.handleChange.bind(Object(r.a)(e)),e.addTask=e.addTask.bind(Object(r.a)(e)),e.deleteTask=e.deleteTask.bind(Object(r.a)(e)),e}return Object(l.a)(a,[{key:"handleChange",value:function(e){this.setState((function(t){return{todos:t.todos.map((function(t){return t.id===e&&(t.completed=!t.completed),t}))}}))}},{key:"render",value:function(){var e=this,t=this.state.todos.map((function(t){return o.a.createElement(m,{key:t.id,item:t,handleChange:e.handleChange})}));return o.a.createElement("div",{className:"todo-list"},o.a.createElement("div",null,o.a.createElement("h1",null," TO-DO LIST "),o.a.createElement("h3",null,"Hey Chetan, what's on your mind today?"),t),o.a.createElement("div",{className:"todo-button"},o.a.createElement(p.a,{variant:"outline-success",onClick:this.addTask},"Add Task"),o.a.createElement(p.a,{variant:"outline-danger",onClick:this.deleteTask},"Delete Task")))}},{key:"addTask",value:function(){var e=h.length;h.push({id:e+1,text:"new task push the code to git and update readme",completed:!1}),this.setState({todos:h})}},{key:"deleteTask",value:function(){h.pop(),this.setState({todos:h})}}]),a}(o.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));d.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(k,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[11,1,2]]]);
//# sourceMappingURL=main.67dd93d8.chunk.js.map