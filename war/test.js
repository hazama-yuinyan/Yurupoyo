String.prototype.getExtent = function(){
	var e = document.getElementById("ruler");
	var c;
	while(c = e.lastChild){e.removeChild(c);}
	var text = e.appendChild(document.createTextNode(this));
	var width = e.offsetWidth;
	e.removeChild(text);
	return width;
}
function setRulerStyle(style){
	var e = document.getElementById("ruler");
	if(e.hasAttribute("style")){
		var new_style = "visibility: hidden; position: absolute; " + style;
		e.setAttribute("style", new_style);
	}
}
function writeln(str){
	var elem = document.getElementById("text");
	elem.textContent += str;
}
function write(str){
	var elem = document.getElementById("text");
	elem.textContent += str;
	elem.innerHTML += "<br>";
}
function object_clone(obj){
	var f = function(){};
	f.prototype = obj;
	return new f;
}
function clone(obj){
	var a = {};
	for(var property in obj){
		if(obj[property] == null){
			a[property] = null;
		}else if(obj[property].__proto__ && obj[property].__proto__.slice){
			a[property] = obj[property].slice(0);
		}else if(typeof(obj[property]) == "object"){
			a[property] = clone(obj[property]);
		}else{
			a[property] = obj[property];
		}
	}
	return a;
}
  
var hoge = enchant.Class.create({
	initialize : function(){
		this.fuga = {"x" : 0, "y" : 0,
				"get" : function(type){
					return (type == "x") ? this.x : this.y;
				},
				"set" : function(x, y){
					this.x = x; this.y = y;
				}
		};
		this.arr = ["apple", "orange", "melon"];
		this.test = "test";
		this.num = 1;
		this.p = null;
	},

	hoge : function(str){
		write(str);
	}
});

window.onload = function(){
	var a = new hoge();
	var b = clone(a);
	//b.fuga = {};
	//b.fuga.x = a.fuga.x;
	//b.fuga.y = a.fuga.y;
	b.fuga.x = 100;
	b.fuga.y = 1000;
	b.arr[0] = "banana";
	b.num = 500;
	b.test = "abort";
	b.hoge = function(str){
		write(str+":copied\n");
	};
	a.hoge("test");
	b.hoge("abort");
	writeln("a:"+a.test+a.fuga.x+" "+a.fuga.y+" "+a.num);
	writeln(" b:"+b.test+b.fuga.x+" "+b.fuga.y+" "+b.num);
	writeln(typeof(a.fuga));
	writeln(typeof(a.test));
	writeln(typeof(a.num));
	writeln(typeof(a.arr));
	write(typeof(a.hoge));
	writeln("a:");
	a.arr.forEach(function(elem){
		writeln(" "+elem);
	});
	writeln(" b:");
	b.arr.forEach(function(elem){
		writeln(" "+elem);
	});
	write("");
	var c = [1.5, -0.9, -1.6, -0.4];
	c.forEach(function(real_num){
		writeln(real_num+"->"+Math.floor(real_num)+" 関数適用後"+real_num);
	});
	var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var width_a = str.getExtent();
	setRulerStyle("font: bold xx-large 'MS ゴシック'");
	var width_b = str.getExtent();
	write("");
	write("The width of the string "+str+" in 'うずらフォント' is "+width_a);
	write("The width of the string "+str+" in 'MS ゴシック' is "+width_b);
	var original = [0, 10, 28, 8, 12, 20];
	write(" original:");
	original.forEach(function(elem){
		write(" "+elem);
	})
	var copied = original.filter(function(elem){
		return (elem > 10);
	})
	write(" filtered:");
	copied.forEach(function(elem){
		write(" "+elem);
	});
	
	var user_name = prompt("ランキングに掲載するハンドルネームを入れてください。", "あかり");
	if(user_name){
		var score = 300;
		
		var http_obj = new XMLHttpRequest();
		http_obj.open("post", "/yurupoyogae", true);
		http_obj.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		var text;
		http_obj.onreadystatechange = function recieve_ranking(){
			if(this.readyState == 4 && this.status == 200){
				text = http_obj.responseText;
				var json_obj = JSON.parse(text);
				
				var ranking_list = document.createElement("div"), is_found = false, is_valid = true;
				json_obj.forEach(function(obj, index){
					var line = document.createElement("span");
					line.textContent = (index + 1) + " " + obj.user_name + " " + obj.score;
					var style;
					if(!is_found && obj.user_name.search(user_name) != -1 && obj.score == score){
						style = "color: #ff1012; font: bold large 'うずらフォント'";
						is_found = true;
					}else{
						style = "color: #000000; font: italic large 'うずらフォント'";
					}
					line.setAttribute("style", style);
					ranking_list.appendChild(line);
					ranking_list.appendChild(document.createElement("br"));
				});
				
				if(!is_found){
					if(score >= json_obj[json_obj.length - 1].score){	//今回のスコアが返ってきたスコアに入っているはずなのに入っていなければ、取得失敗と見なす
						alert("ランキングの取得に失敗したようです。\nもう一度通信を試みます。");
						http_obj = new XMLHttpRequest();
						http_obj.open("get", "/yurupoyogae", true);
						http_obj.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
						http_obj.onreadystatechange = recieve_ranking;
						http_obj.send(null);
						return;
					}
					var new_rank = document.createElement("div");
					new_rank.textConetnt = "ランク外 " + user_name + " " + score;
					new_rank.setAttribute("style", "color: #000000; font: bold large 'うずらフォント'");
					document.body.appendChild(new_rank);
				}
				//ranking_label.width = ranking_label.innerText.getExtent();
				document.body.appendChild(ranking_list);
				http_obj = null;
			}else if(this.readyState == 4 && this.status >= 400){
				alert("エラーが発生しました。\n" + http_obj.responseText);
			}
		}
		http_obj.send('{"user_name":' + user_name + ',"score":' + score + '}');
	}
	
	var div = document.createElement("div");
	div.innerHTML = '<img src="images/piece_akari.png"></img>';
	document.body.appendChild(div);
}