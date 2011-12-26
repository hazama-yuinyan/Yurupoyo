/**
 * ゆるゆり＋ぷよぷよ風のゲーム
 * 
 * game.js
 *
 * Copyright (c) Ryouta Ozaki
 * Licensed under the GPL Version 3 licenses
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * 
 * enchant.js v0.4.1
 *
 * Copyright (c) Ubiquitous Entertainment Inc.
 * Dual licensed under the MIT or GPL Version 3 licenses
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * 
 * Mersenne Twister in JavaScript based on "mt19937ar.c"
 * 
 * JavaScript version by Magicant: Copyright (C) 2005 Magicant
 * 
 * 
 * Original C version by Makoto Matsumoto and Takuji Nishimura
 * http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/mt.html
 *
 * Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 
 * 1. Redistributions of source code must retain the above copyright
 *   notice, this list of conditions and the following disclaimer.
 *   
 * 2. Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *   
 * 3. The names of its contributors may not be used to endorse or promote 
 *   products derived from this software without specific prior written 
 *   permission.
 *   
 *   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 *   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 *   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 *   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 *   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 *   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 *   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */



enchant();

const NUM_VERTICAL_BLOCKS = 20;
const NUM_HORIZONTAL_BLOCKS = 10;
var PieceTypes = {"AKARI" : 0, "AYANO" : 1, "CHINATSU" : 2, "CHITOSE" : 3, "HIMAWARI" : 4, "KYOKO" : 5, "SAKURAKO" : 6, "YUI" : 7, "MAX" : 8};
var ColorTable = ["rgb(233, 109, 140)", "rgb(138, 73, 108)", "rgb(252, 209, 219)", "rgb(222, 217, 240)", "rgb(103, 122, 157)",
                    "rgb(234, 223, 186)", "rgb(232, 205, 182)", "rgb(84, 61, 70)"];

/**
 * 四捨五入する関数
 */
Math.round = function(number){
	return Math.floor(number + 0.5);
}

/**
 * propsの中からvalueの値を持つプロパティーを探し出し、そのプロパティー名を返す
 * @param props
 * @param value
 * @returns {String} | undefined
 */
function getPropertyName(props, value){
	for(var property in props){
		if(props[property] == value){return property.toLowerCase();}
	}
	
	return undefined;
}

/**
 * 文字列とRulerに指定したスタイルからその文字列を表示するのに最低限必要な幅と高さを算出する
 */
String.prototype.getExpansion = function(){
	var e = document.getElementById("ruler");
	var c;
	while(c = e.lastChild){e.removeChild(c);}
	var text = e.appendChild(document.createTextNode(this));
	var expansion = {"width" : e.offsetWidth, "height" : e.offsetHeight};
	e.removeChild(text);
	return expansion;
}

function setRulerStyle(style){
	var elem = document.getElementById("ruler");
	var new_style = "visibility: hidden; position: absolute;" + style;
	elem.setAttribute("style", new_style);
}

String.prototype.fitInWidth = function(max_width, num_lines){
	num_lines.val = 1;
	if(this.length == 0){return "";}
	if(this.getExpansion().width <= max_width){return this;}
	var first, last, result = "";
	for(first = 0; first < this.length; first = last){
		for(last = this.length; last >= first; --last){
			var s = this.slice(first, last);
			if(s.getExpansion().width <= max_width){
				if(last != this.length){			//文字列の最後には<br>を追加しない
					s += "<br>";
					++num_lines.val;
				}
				result = result.concat(s);
				break;
			}
		}
	}
	
	return result;
}

/**
 * valがlower以上upper未満であるか調べる
 * @param lower
 * @param upper
 * @param val
 * @returns {Boolean}
 */
function isInRange(lower, upper, val){
	return(lower <= val && val < upper);
}

/**
 * この配列に引数のオブジェクトがすでに含まれているかを返す
 */
Array.prototype.contains = function(obj){
	return (this.indexOf(obj) != -1);
}

/**
 * mapとほぼ同機能だが、こちらは1番目の引数に渡す関数オブジェクトは配列を戻り値にしなければならない
 */
Array.prototype.mapWithArray = function(fun/*, thisp*/){
	var len = this.length;
	if(typeof fun != "function"){throw new TypeError();}
	
	var result = new Array();
	var this_p = arguments[1];
	for(var i = 0; i < len; ++i){
		if(i in this){result = result.concat(fun.call(this_p, this[i], i, this));}
	}
	
	return result;
}

Array.prototype.swapClockwise = function(){
	var tmp = this[this.length - 1];
	this.forEach(function(elem, index, array){
		if(index != 0){elem = array[index - 1];}
		this[0] = tmp;
	});
}

Array.prototype.swapAntiClockwise = function(){
	var tmp = this[0];
	this.forEach(function(elem, index, array){
		elem = (index != this.length - 1) ? array[index + 1] : tmp;
	});
}

var GameOverScene = enchant.Class.create(enchant.Scene, {
	initialize : function(x, y, score, panel_x, panel_width, panel_height){
		enchant.Scene.call(this);
		
		var scene = this;
		
		var tweet_button = new enchant.Label("");
		tweet_button.x = x;
		tweet_button.y = y + 50;
		tweet_button.width = 120;
		tweet_button.backgroundColor = "#ffffff";
		
		var ranking_label = new enchant.Label("");
		ranking_label.x = panel_x;
		ranking_label.y = y + 100;
		ranking_label.width = panel_width;
		ranking_label.backgroundColor = "#ffffff";
		
		var ranking_list = document.createElement("div");
		ranking_list.setAttribute("style", "height: " + panel_height / 2 + "px; border: inset 5px #ff1012; overflow: scroll");
		ranking_list.setAttribute("id", "ranking");
		var ranking_title = document.createElement("p");
		ranking_title.setAttribute("style", "text-align: center; font: bold large 'うずらフォント', 'MS ゴシック'");
		ranking_title.textContent = "RANKING";
		ranking_list.appendChild(ranking_title);
		ranking_list.appendChild(document.createElement("br"));
		var user_name = prompt("ランキングに掲載するハンドルネームを入れてください。", "あかり");
		if(user_name){
			var http_obj = new XMLHttpRequest();
			http_obj.open("post", "/yurupoyogae", true);
			http_obj.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
			http_obj.onreadystatechange = function recieve_ranking(){
				if(this.readyState == 4 && this.status == 200 && this.getResponseHeader("Content-Type").search("application/json; charset=UTF-8") != -1){
					var json_obj = JSON.parse(this.responseText);
					
					var tag_text = '<a href="https://twitter.com/share" class="twitter-share-button" data-url="http://bit.ly/rLW8tO" '
						+ 'data-counturl="http://filesforbots.me.land.to/games/Yurupoyo/index.html" data-via="hazama_akkarin" '
						+ 'data-hashtags="yuruyuri, games" data-text="';
					var text = "ゆるぽよで" + score + "点を獲得し";
					
					var is_found = false;
					json_obj.forEach(function(obj, index){
						var line = document.createElement("span");
						line.textContent = (index + 1) + " " + obj.user_name + " " + obj.score;
						var style;
						if(!is_found && obj.user_name.search(user_name) != -1 && obj.score == score){
							style = "color: #ff1012; font: bold large 'うずらフォント'";
							text += "て" + (index + 1) + "位になったよ！";
							is_found = true;
						}else{
							style = "color: #000000; font: italic large 'うずらフォント'";
						}
						line.setAttribute("style", style);
						ranking_list.appendChild(line);
						ranking_list.appendChild(document.createElement("br"));
					});
					
					if(!is_found){
						var new_span = document.createElement("span");
						new_span.textContent = "ランク外 " + user_name + " " + score;
						new_span.setAttribute("style", "color: #000000; font: bold large 'うずらフォント'");
						ranking_label._element.appendChild(new_span);
						
						text += "たけど残念ながらランク外でした・・・";
					}
					
					tag_text += text + '" data-lang="ja">Tweet</a>';
					tweet_button.text = tag_text;
					ranking_label._element.appendChild(ranking_list);
					
					(function(d,s,id){
			    		var js,fjs=d.getElementsByTagName(s)[0];
			    		if(!d.getElementById(id)){
			    			js=d.createElement(s);
			    			js.id=id;
			    			js.src="https://platform.twitter.com/widgets.js";
			    			fjs.parentNode.insertBefore(js,fjs);
			    		}
			    	})(document,"script","twitter-wjs");
					
					scene.addChild(tweet_button);
					scene.addChild(ranking_label);
					
					http_obj = null;
				}else if(this.readyState == 4){
					alert("エラーが発生しました。\n" + http_obj.responseText);
					if(confirm("再度ランキングの取得を試みますか？")){
						http_obj = new XMLHttpRequest();
						http_obj.open((this.status == 202) ? "get" : "post", "/yurupoyogae", true);
						http_obj.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
						http_obj.onreadystatechange = recieve_ranking;
						http_obj.send((this.status == 202) ? null : '{"user_name":"' + user_name + '","score":' + score + '}');
					}else{
						var new_elem = document.createElement("div");
						new_elem.textContent = "ランキングの取得に失敗しました";
						new_elem.setAttribute("style", "text-align:center; color: #ff1012; font: bold x-large 'うずらフォント'; width: " 
								+ panel_width + "px");
						ranking_label._element.appendChild(new_elem);
						scene.addChild(ranking_label);
					}
				}
			}
			http_obj.send('{"user_name":"' + user_name + '","score":' + score + '}');
		}
		
		this.addEventListener('enterframe', function(){
			var ranking_tag = document.getElementById("ranking");
			if(ranking_tag.scrollTop != ranking_tag.scrollHeight - ranking_tag.clientHeight){		//ランキングを少しずつスクロールさせる
				++ranking_tag.scrollTop;
			}else{
				ranking_tag.scrollTop = 0;
			}
			
			if(game.input.a){
				var stage = new Stage();
				game.popScene();
				game.popScene();
				game.pushScene(stage);
				game.input['a'] = false;
			}
		});
	}
});

var PauseScene = enchant.Class.create(enchant.Scene, {
	initialize : function(x, y){
		enchant.Scene.call(this);
		
		var pause_label = new enchant.Label("PAUSED");
		pause_label.font = "bold xx-large 'うずらフォント','MS ゴシック'";
		pause_label.x = x;
		pause_label.y = y;
		setRulerStyle(" font: " + pause_label.font);
		pause_label.width = pause_label.text.getExpansion().width;
		pause_label.backgroundColor = "#ffffff";
		pause_label.color = "#ff1512";
		this.addChild(pause_label);
		this.addEventListener('enterframe', function(){
			if(game.input.up){		//upボタンを押されたらポーズシーンを抜ける
				game.popScene();
				game.input['up'] = false;
			}
		});
	}
});

var Score = enchant.Class.create(enchant.Label, {
	initialize : function(){
		enchant.Label.call(this, "SCORE:0");
		
		this.x = 0;
		this.y = 0;
		this.font = "bold xx-large 'うずらフォント','MS ゴシック'";
		this.backgroundColor = "#ffffff";
		this.color = "#ff1512";
		this.score = 0;
	},
	
	addScore : function(how_much){
		this.score += how_much;
		this.text = "SCORE:" + this.score;
	},
	
	getScore : function(){
		return this.score;
	}
});

var NextPieceLabel = enchant.Class.create({
	initialize : function(x, y, width, height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.piece_up_left_pos = {"x" : x + 16, "y" : y + 50};
		this.next_label = new enchant.Label("NEXT");
		this.next_label.font = "bold xx-large 'うずらフォント','MS ゴシック'";
		this.next_label.backgroundColor = "#ffffff";
		this.next_label.color = "#000000";
		this.next_label.x = 25;
		this.next_label.y = this.y;
		setRulerStyle(" font: " + this.next_label.font);
		this.next_label.width = this.next_label.text.getExpansion().width;
		this.next_pieces = new Array(8);
	},
	
	setPieces : function(pieces, size_of_block){
		this.next_pieces.forEach(function(piece){
			game.currentScene.removeChild(piece);
		});
		
		this.next_pieces = pieces;
		this.next_pieces.forEach(function(piece, index){
			if(piece != null){
				piece.x = this.piece_up_left_pos.x + (index % 4) * size_of_block.width;
				piece.y = this.piece_up_left_pos.y + Math.floor(index / 4) * size_of_block.height;
				game.currentScene.addChild(piece);
			}
		}, this);
	}
});

var Piece = enchant.Class.create(enchant.Sprite, {
	initialize : function(width, height, panel, type, image_path){
		enchant.Sprite.call(this, width, height);
		
		if(arguments.length > 3){
			this.type = type;							//このピースのタイプ
			this.image = game.assets[image_path];
			this.frame = 0;
		}
		this.position = {"x" : 0, "y" : 0};		//自分のいる位置をブロック単位で表したもの
		this.real_coords = {"x" : 0.0, "y" : 0.0};	//このピースの座標を少数で表したもの
		this.position_in_shape = {"x" : 0, "y" : 0};	//現在のシェイプ内での相対的な位置ブロック単位で表したもの:左上が(0,0)右下が(4,2)
		this.neighbors = [null, null, null, null];	//自分の周りにいるピースへの参照:[Left, Right, Up, Down]の順番
		this.neighbors_buffer = null;				//消せるピースを探すときに使用するneighborsの一時保存領域
		this.connecting_to = 0x00;		//どの方向のピースと連結しているかを表す。4ビットのフラグとして管理し、その順番はneighborsと同じく右端のビットがDownとなる
		this.panel = panel;
	},
	
	copyMembersFrom : function(other){
		this.position.x = other.position.x;
		this.position.y = other.position.y;
		this.real_coords.x = other.real_coords.x;
		this.real_coords.y = other.real_coords.y;
		this.position_in_shape.x = other.position_in_shape.x;
		this.position_in_shape.y = other.position_in_shape.y;
		this.neighbors = other.neighbors;
		this.x = other.x;
		this.y = other.y;
	},

	/**
	 * 自分と相手のピースのタイプが同じかどうか返す
	 */
	isOfSameType : function(other_piece){
		return (this.type == other_piece.type);
	},
	
	makeConnected : function(index){
		switch(index){
		case 0:
			this.connecting_to |= 0x08;		//1000
			break;
			
		case 1:
			this.connecting_to |= 0x04;		//0100
			break;
			
		case 2:
			if((this.connecting_to & 0x02) != 0x02){
				this.connecting_to |= 0x02;		//0010
				this.panel.effect_manager.addEffect(new TimeIndependentVibrationEffect(this, Math.floor(this.real_coords.x) - 3
						, Math.floor(this.real_coords.x) + 3, Math.floor(this.real_coords.y) - 6, Math.floor(this.real_coords.y)
						, 2, Math.POSITIVE_INFINITY));
			}
			break;
			
		case 3:
			if((this.connecting_to & 0x01) != 0x01){
				this.connecting_to |= 0x01;		//0001
				this.panel.effect_manager.addEffect(new TimeIndependentVibrationEffect(this, Math.floor(this.real_coords.x) - 3
						, Math.floor(this.real_coords.x) + 3, Math.floor(this.real_coords.y), Math.floor(this.real_coords.y) + 6
						, 2, Math.POSITIVE_INFINITY));
			}
			break;
		}
		
		this.frame = this.connecting_to >> 2;
	},
	
	makeUnconnected : function(){
		this.connecting_to = 0x00;
		this.frame = this.connecting_to;
		this.setCoords();
	},
	
	searchForSameTypeOfPiece : function(group, starting_pieces){
		if(group.contains(this)){return;}
		group.push(this);
		this.neighbors_buffer.forEach(function(piece, cur_index, array){
			if(piece != null && this.isOfSameType(piece)){
				delete array[cur_index];		//一周して戻ってきたときのためにすでに行った経路の参照を消しておく
				
				var index = piece.neighbors_buffer.indexOf(this);	//相手側からこのピースに到達されて二重探索にならないように相手側の参照を消しておく
				delete piece.neighbors_buffer[index];
				
				var index2 = starting_pieces.indexOf(piece);		//見つかったものは起点となるピースから削除する
				if(index2 != -1){delete starting_pieces[index2];}
				
				this.makeConnected(cur_index);
				piece.makeConnected((cur_index % 2 == 0) ? cur_index + 1 : cur_index - 1);
				
				piece.searchForSameTypeOfPiece(group, starting_pieces);
			}
		}, this);
	},
	
	/**
	 * 一気に着地するまでピースを下に移動させる
	 */
	landOn : function(){
		this.position.y = Math.round(this.position.y);
		for(var i = 1; this.tryToMove(0, i); ++i) ;
		this.position.y += (i - 1);
		this.panel.setPieceToPanel(this);
		this.real_coords.y = this.panel.coordsAt('y', this.position.y);
		this.convertCoordinatesToPosition();
		this.setCoords();
	},
	
	/**
	 * ピースが指定した方向に移動可能か返す
	 * (x, y)は現在の位置に対して相対的な位置を表す
	 */
	tryToMove : function(x, y){
		return (Math.floor(this.position.x + x) >= 0 && Math.floor(this.position.x + x) < NUM_HORIZONTAL_BLOCKS 
				&& Math.floor(this.position.y + y) < NUM_VERTICAL_BLOCKS 
				&& !this.panel.anyPieceExistsAt(Math.floor(this.position.x + x), Math.floor(this.position.y + y)));
	},
	
	/**
	 * 画面の厳密な座標系からパネル内のローカル座標系へ座標変換する
	 */
	convertCoordinatesToPosition : function(){
		this.position.x = this.panel.positionAt('x', this.real_coords.x);
		this.position.y = this.panel.positionAt('y', this.real_coords.y);
	},
	
	/**
	 * ピース内のローカル座標系からパネルのローカル座標系へ座標変換する
	 */
	convertPositionLocalToGlobal : function(){
		this.position.x = this.panel.positionAt('x', this.panel.cur_falling_pieces.x) + this.position_in_shape.x;
		this.position.y = this.panel.positionAt('y', this.panel.cur_falling_pieces.y) + this.position_in_shape.y;
	},
	
	/**
	 * パネル内のローカル座標系から画面の厳密な座標系へ座標変換する
	 */
	convertPositionToCoordinates : function(){
		this.real_coords.x = this.panel.cur_falling_pieces.x + this.panel.size_of_block.width * this.position_in_shape.x;
		this.real_coords.y = this.panel.cur_falling_pieces.y + this.panel.size_of_block.height * this.position_in_shape.y;
	},
	
	/**
	 * 画面の厳密な座標系から画面表示の座標系へ座標変換する
	 */
	setCoords : function(){
		this.x = Math.floor(this.real_coords.x);
		this.y = Math.floor(this.real_coords.y);
	},
	
	/**
	 * ピースの現在地を示すStringオブジェクトを返す（デバッグ用）
	 */
	logPosition : function(){
		return "(" + this.position.x + ", " + this.position.y + ")";
	}
});

var ExpressionEvaluator = enchant.Class.create({
	initialize : function(val1, val2){
		this.value1 = val1;
		this.value2 = val2;
	},
	
	execute : function(operator_type){
		switch(operator_type){
		case 0:
			return(this.value1 == this.value2);
			break;
			
		case 1:
			return(this.value1 < this.value2);
			break;
			
		case 2:
			return(this.value1 > this.value2);
			break;
			
		case 3:
			return(this.value1 <= this.value2);
			break;
			
		case 4:
			return(this.value1 >= this.value2);
			break;
		}
		
		return false;
	}
});

var XmlManager = enchant.Class.create({
	initialize : function(url, panel_height){
		var http_obj = new XMLHttpRequest();
		var effects_definitions = new Array();
		var presets = new Array();
		var max_nums = new Array();
		this.average_coords = 0;
		this.now = new Date();
		this.pieces = null;
		this.targets = null;
		this.panel_height = panel_height;
		
		http_obj.onload = function(){
			var squeezeValues = function(elem){
				var obj = {};
				for(var attrs = elem.attributes, i = 0; i < attrs.length; ++i){
					obj[attrs[i].name] = (attrs[i].value.search(/^\d+\.?\d*$/) != -1) ? parseFloat(attrs[i].value) : attrs[i].value;	//数値だけのものはNumber型にする
				}
				
				return obj;
			};
			var xml = http_obj.responseXML, doc = xml.documentElement, num, enable_if;
			var preset_elem = doc.getElementsByTagName("presets")[0];
			
			for(var preset_child = preset_elem.firstElementChild; preset_child != null; preset_child = preset_child.nextElementSibling){
				var attrs = preset_child.attributes;
				var preset = {"property_name" : preset_child.tagName, "preset_name" : attrs[0].value, "content" : preset_child.textContent};
				presets.push(preset);
			}
			
			for(var child = preset_elem.nextElementSibling; child != null; child = child.nextElementSibling){
				if(child.childElementCount != 0){
					var obj = {};
					num = parseInt(child.getAttribute("num"));
					enable_if = (child.hasAttribute("enable_if")) ? child.getAttribute("enable_if") : undefined;
					for(var w_child = child.firstElementChild; w_child != null; w_child = w_child.nextElementSibling){
						obj = squeezeValues(w_child);
						obj['num'] = num;
						obj['text'] = w_child.textContent;
						obj['name'] = w_child.tagName.toLowerCase();
						if(enable_if != undefined && obj['enable_if'] == undefined){obj['enable_if'] = enable_if;}
						effects_definitions.push(obj);
					}
					if(child.nextElementSibling == null || child.nextElementSibling.getAttribute("num") == 0){
						max_nums.push({"key" : (obj['with'] != undefined) ? obj.name + " with " + obj['with'] : obj.name, "num" : num});
						if(obj['with'] != undefined){
							max_nums.push({"key" : obj['with'] + " with " + obj.name, "num" : num});
						}
					}
				}else{
					num = parseInt(child.getAttribute("num"));
					var obj = squeezeValues(child);
					obj['text'] = child.textContent;
					obj['name'] = child.tagName.toLowerCase();
					effects_definitions.push(obj);
					if(child.nextElementSibling == null || child.nextElementSibling.getAttribute("num") == 0){
						max_nums.push({"key" : obj.name, "num" : num});
					}
				}
			}
		}
		
		http_obj.open("get", url, false);
		http_obj.send(null);
		
		this.getDefinitions = function(tag_name, target){
			var name = tag_name;
			if(target != undefined){
				var results = effects_definitions.filter(function(definition){
					return(definition.name == name && definition['with'] == target);
				});
				if(results.length == 0){
					results = effects_definitions.filter(function(definition){
						return (definition.name == name && definition['with'] == undefined);
					});
				}
			}else{
				var results = effects_definitions.filter(function(definition){
					return(definition.name == name && definition['with'] == undefined);
				});
			}
			
			return results;
		};
		
		this.getMaxNum = function(effect_name, target){
			var searching_str = (target != undefined) ? effect_name + " with " + target : effect_name;
			var result = -1;
			max_nums.every(function(obj){
				if(obj.key == searching_str){
					result = obj.num + 1;	//乱数で使うため実際に出現する数より1多く返す
					return false;
				}
				
				return true;
			});
			
			return result;
		};
		
		this.getPreset = function(property_name, preset_name){
			var preset = null;
			presets.every(function(set){
				if(set.property_name == property_name && set.preset_name.search(preset_name) != -1){
					preset = set;
					return false;
				}
				
				return true;
			});
			
			return preset;
		}
	},
	
	createNewLabel : function(font, x, y, width, text, background_color, color){
		var label = new enchant.Label(text);
		label.font = font;
		label.x = x;
		label.y = y;
		label.backgroundColor = (background_color != undefined) ? background_color : "#ffffff";
		label.width = width;
		if(color != undefined){label.color = color;}
		
		return label;
	},
	
	interpretX : function(val, width){
		if(val == "average"){
			return Math.floor(this.average_coords.x);
		}else if(val == "average with margin"){
			return (this.average_coords.x + width > game.width) ? game.width - width : this.average_coords.x;
		}
		
		return val;
	},
	
	interpretY : function(val, height){
		if(val == "average"){
			return Math.floor(this.average_coords.y);
		}else if(val == "average with margin"){
			return (this.average_coords.y + height > game.height) ? game.height - height : 
				(this.average_coords.y >= (this.x + this.panel_height) / 2) ? this.average_coords.y - height : this.average_coords.y + height;
		}
		
		return val;
	},
	
	interpretColor : function(color, effect_name){
		return (color == undefined) ? ColorTable[PieceTypes[effect_name.toUpperCase()]] :
			(color.search(/^\[.*\]$/) != -1) ?  this.getPreset("color", color.replace(/^\[(.+)\]$/, "$1")).content :
			(color[0] == '#' || color.search(/^rgb/) != -1) ? color : ColorTable[PieceTypes[color]];
	},
	
	interpretSoundBufferNum : function(buffer_num){
		return (typeof(buffer_num) == "Number") ? buffer_num : sound_manager.sound_types[buffer_num];
	},
	
	interpretImageFrame : function(piece_type, frame_name){
		if(typeof(frame_name) == "Number"){return frame_name;}
		var preset = this.getPreset("image", piece_type), result = -1;
		var frame_names = preset.preset_name.split(/\s*:\s*/)[1].split(/\s*,\s*/);
		var frame_nums = preset.content.split(/\s*,\s*/);
		frame_names.every(function(name, cur_index){
			if(name == frame_name){
				result = parseInt(frame_nums[cur_index]);
				return false;
			}
			
			return true;
		});
		
		return result;
	},
	
	/*verifyAvailability : function(condition){
		if(condition == undefined){return true;}
		
		var exprs = condition.split(/and|or (?!equal|less|more)/);
		var variables = ["piece1.x", "piece1.y", "piece2.x", "piece2.y", "now."]
		var operators = [/equal to/, /less than/, /more than/, /equal|less or less|equal/, /equal|more or more|equal/];
		exprs.forEach(function(expr){
			var operator_type = -1, operator_pos;
			operators.every(function(operator, cur_index){
				if(operator_pos = expr.search(operator) != -1){
					operator_type = cur_index;
					return false;
				}
				
				return true;
			});
			
			
		});
	},*/
	
	interpret : function(definition, infos){
		var types = definition.type.split(/\s*\+\s*/);
		var last_label = null, results = new Array();
		//if(!this.verifyAvailability(definition.enable_if)){return results;}
		
		types.forEach(function(type){
			switch(type){
			case "Label":
				var position = {"x" : (infos != undefined) ? infos.x : 0, "y" : 0};
				var font = (definition.font.search(/^\[.+\]$/) != -1) ? 
						this.getPreset("font", definition.font.replace(/^\[(.+)\]$/, "$1")).content : definition.font;
				setRulerStyle(" font: " + font);
				var text = definition.text.slice(0), num_lines = {"val" : 1};
				if(infos != undefined){text = text.fitInWidth(infos.width, num_lines);}
				//var width = (infos != undefined) ? infos.width : 160;
				//setRulerStyle(" font: " + font + "width: " + width);
				var size = text.getExpansion();
				position.x = (infos != undefined) ? infos.x : this.interpretX(definition.x, size.width);
				position.y = this.interpretY(definition.y, size.height * num_lines.val);
				
				last_label = this.createNewLabel(font, position.x, position.y, (infos != undefined && size.width >= infos.width) 
						? infos.width : size.width, text, definition.background_color, this.interpretColor(definition.color, definition.name));
				label_manager.add(last_label, game.frame + definition.start_time, game.frame + definition.end_time);
				break;
				
			case "PieceFrameEffect":
				var frame = this.interpretImageFrame(definition.name.toUpperCase(), definition.frame.replace(/^\[(.+)\]$/, "$1"));
				results.push(new PieceFrameEffect(this.pieces, frame, game.frame + definition.start_time));
				break;
				
			case "OpacityChangeEffect":
				results.push(new OpacityChangeEffect(this.pieces, definition.value, game.frame + definition.start_time));
				break;
				
			case "SoundEffect":
				results.push(new SoundEffect(this.interpretSoundBufferNum(definition.buffer_num), game.frame + definition.start_time));
				break;
				
			case "FadeInEffect":
				results.push(new FadeInEffect((last_label != null) ? new Array(last_label) : this.pieces, game.frame + definition.start_time
						, game.frame + definition.end_time, definition.rate));
				break;
				
			case "FadeOutEffect":
				results.push(new FadeOutEffect((last_label != null) ? new Array(last_label) : this.pieces, game.frame + definition.start_time
						, game.frame + definition.end_time, definition.rate));
				break;
				
			case "TimeIndependentVibrationEffect":
				results.push(new TimeIndependentVibrationEffect(last_label, last_label.x - definition.amplitude_x
						, last_label.x + definition.amplitude_x, last_label.y - definition.amplitude_y, last_label.y + definition.amplitude_y
						, definition.max_rate, game.frame + definition.end_time, game.frame + definition.start_time));
				break;
			}
		}, this);
		
		return results;
	}
});

var SoundManager = enchant.Class.create({
	initialize : function(){
		this.sounds = new Array();
		this.sound_types = {"BANG1" : 0, "BANG2" : 1, "BANG3" : 2, "BANG4" : 3, "BANG5" : 4, "BANG6" : 5, "BANG7" : 6, "BANG8" : 7,
				"AKKARIN" : 8, "SHINING" : 9, "VERY_SHINING" : 10};
		this.sounds.push(Sound.load("sounds/bang1.mp3"));
		this.sounds.push(Sound.load("sounds/bang2.mp3"));
		this.sounds.push(Sound.load("sounds/bang3.mp3"));
		this.sounds.push(Sound.load("sounds/bang4.mp3"));
		this.sounds.push(Sound.load("sounds/bang5.mp3"));
		this.sounds.push(Sound.load("sounds/bang6.mp3"));
		this.sounds.push(Sound.load("sounds/bang7.mp3"));
		this.sounds.push(Sound.load("sounds/bang8.mp3"));
		this.sounds.push(Sound.load("sounds/akkarin.wav"));
		this.sounds.push(Sound.load("sounds/shining.mp3"));
		this.sounds.push(Sound.load("sounds/very_shining.mp3"));
	},
	
	play : function(type){
		this.sounds[type].play();
	},
	
	pause : function(type){
		this.sounds[type].pause();
	},
	
	stop : function(type){
		this.sounds[type].stop();
	}
});

/**
 * ラベルを管理するクラス
 */
var LabelManager = enchant.Class.create({
	initialize : function(){
		this.labels = new Array();
		this.max_end_time = 0;
	},
	
	add : function(label, start_time, end_time){
		this.max_end_time = Math.max(this.max_end_time, end_time);
		this.labels.push({"obj" : label, "start_time" : (isNaN(start_time)) ? 0 : start_time, "end_time" : end_time, "is_added" : false});
	},
	
	getMaxEndTime : function(){
		return this.max_end_time;
	},
	
	update : function(){
		this.labels.forEach(function(label){
			if(!label.is_added && label.start_time <= game.frame){
				game.currentScene.addChild(label.obj);
				label.is_added = true;
			}
			if(label.end_time <= game.frame){
				game.currentScene.removeChild(label.obj);
			}
		});
		
		this.labels = this.labels.filter(function(label){
			return(label.end_time + 10 >= game.frame);
		});
	}
});

/**
 * エフェクトマネージャー
 */
var EffectManager = enchant.Class.create({
	initialize : function(){
		this.effects = new Array();
	},

	addEffect : function(effect){
		this.effects.push(effect);
	},
	
	removeEffect : function(piece){
		this.effects.forEach(function(effect, index, array){
			if(effect.hasOwnProperty('target') && effect.target == piece){
				delete array[index];
			}
		});
	},
	
	update : function(){
		this.effects = this.effects.filter(function(effect){
			return (game.frame <= effect.end_time + 5 || effect.end_time == Math.POSITIVE_INFINITY);
		});
		
		this.effects.forEach(function(effect){
			effect.update();
		});
	}
});

/**
 * エフェクトの基底クラス
 * end_timeにPOSITIVE_INFINITYをセットすると、明示的にEffectManagerのremoveEffectを呼び出して削除しなければ、そのエフェクトはいつまでも効果が持続することになる
 */
var Effect = enchant.Class.create({
	initialize : function(time_to_end_affecting, time_to_start_affecting){
		this.start_time = (isNaN(time_to_start_affecting)) ? 0 : time_to_start_affecting;
		this.end_time = time_to_end_affecting;
	}
});

/**
 * だんだんオブジェクトを出現させるエフェクト。opacityプロパティーを持ったものならなんにでも適用できる
 */
var FadeInEffect = enchant.Class.create(Effect, {
	initialize : function(targets, time_to_start_affecting, time_to_end_affecting, increasing_rate){
		Effect.call(this, time_to_end_affecting, time_to_start_affecting);
		
		this.targets = targets;
		this.targets.forEach(function(target){
			target.opacity = 0;
		});
		this.opacity_increasing_rate = increasing_rate;
	},
	
	update : function(){
		if(this.start_time <= game.frame && game.frame <= this.end_time){
			this.targets.forEach(function(target){
				target.opacity += this.opacity_increasing_rate;
			}, this);
		}
	}
});

/**
 * だんだんオブジェクトを消していくエフェクト。opacityプロパティーを持ったものならなんにでも適用できる
 */
var FadeOutEffect = enchant.Class.create(Effect, {
	initialize : function(targets, time_to_start_affecting, time_to_end_affecting, decreasing_rate){
		Effect.call(this, time_to_end_affecting, time_to_start_affecting);
		
		this.targets = targets;
		this.targets.forEach(function(target){
			target.opacity = 1;
		});
		this.opacity_decreasing_rate = decreasing_rate;
	},
	
	update : function(){
		if(this.start_time <= game.frame && game.frame <= this.end_time){
			this.targets.forEach(function(target){
				target.opacity -= this.opacity_decreasing_rate;
			}, this);
		}
	}
});

/**
 * 特定の座標を最小値から最大値の間で行ったり来たりするように更新するクラス。x,yプロパティーを持つものならなんにでも適用できる
 */
var TimeIndependentVibrationEffect = enchant.Class.create(Effect, {
	initialize : function(target, min_x, max_x, min_y, max_y, max_rate, time_to_end_affecting, time_to_start_affecting){
		Effect.call(this, time_to_end_affecting, time_to_start_affecting);
		
		this.target = target;								//座標を更新する対象となるピース
		this.min_val = {"x" : min_x, "y" : min_y};							//最小値
		this.max_val = {"x" : max_x, "y" : max_y};							//最大値
		this.average_val = {"x" : (min_x + max_x) / 2, "y" : (min_y + max_y) / 2};
		this.max_rate = max_rate;						//1回の更新で更新できる最大値
	},
	
	update : function(){
		var diff_x = mersenne.nextInt(this.max_rate), diff_y = mersenne.nextInt(this.max_rate);
		this.target.x += (this.target.x >= this.average_val.x) ? -diff_x : diff_x;
		this.target.y += (this.target.y >= this.average_val.y) ? -diff_y : diff_y;
	}
});

/**
 * Piece.frameをいじるエフェクト
 */
var PieceFrameEffect = enchant.Class.create(Effect, {
	initialize : function(pieces, frame, time_to_start_affecting){
		Effect.call(this, time_to_start_affecting + 1, time_to_start_affecting);
		
		this.targets = pieces;
		this.frame = frame;
	},
	
	update : function(){
		if(this.start_time <= game.frame && game.frame <= this.end_time){
			this.targets.forEach(function(piece){
				piece.frame = this.frame;
			}, this);
		}
	}
});

/**
 * オブジェクトの透明度を変更するエフェクト
 */
var OpacityChangeEffect = enchant.Class.create(Effect, {
	initialize : function(pieces, value, time_to_start_affecting){
		Effect.call(this, time_to_start_affecting + 1, time_to_start_affecting);
		
		this.targets = pieces;
		this.value = value;
	},
	
	update : function(){
		if(this.start_time <= game.frame && game.frame <= this.end_time){
			this.targets.forEach(function(piece){
				piece.opacity = this.value;
			}, this);
		}
	}
});

/**
 * 音を鳴らすエフェクト
 */
var SoundEffect = enchant.Class.create(Effect, {
	initialize : function(buffer_num, time_to_start_affecting){
		Effect.call(this, time_to_start_affecting + 1, time_to_start_affecting);
		
		this.buffer_num = buffer_num;
	},
	
	update : function(){
		if(this.start_time <= game.frame && game.frame <= this.end_time){
			sound_manager.play(this.buffer_num);
		}
	}
});

var PiecesEffect = enchant.Class.create(Effect, {
	initialize : function(pieces, targets, score, num_successive_disappearance, average_coords, section_x, section_width){
		Effect.call(this, 0);
		
		this.sub_effects = new Array();
		
		xml_manager.pieces = pieces;
		xml_manager.targets = targets;
		xml_manager.average_coords = average_coords;
		
		var effects = new Array();
		effects.push({"type" : "Label", "font" : "large 'うずらフォント', 'MS ゴシック'", "x" : Math.floor(average_coords.x - 50),
			"y" : Math.floor(average_coords.y - 20), "text" : "+" + score, "end_time" : 30, "background_color" : "#ffffff",
			"color" : ColorTable[pieces[0].type], "num" : -1});
		
		effects.push({"type" : "Label", "font" : "bold large 'うずらフォント', 'MS ゴシック'", "x" : Math.floor(average_coords.x - 50),
			"y" : Math.floor(average_coords.y - 40), "text" : num_successive_disappearance + "COMBO!", "end_time" : 30,
			"background_color" : "#ffffff", "color" : ColorTable[num_successive_disappearance % PieceTypes.MAX], "num" : -1});
		
		var piece_type = getPropertyName(PieceTypes, pieces[0].type)
		, target_type = getPropertyName(PieceTypes, (targets != undefined) ? targets[0].type : undefined);
		effects = effects.concat(xml_manager.getDefinitions(piece_type, target_type));
		var selected_effect_num = mersenne.nextInt(xml_manager.getMaxNum(piece_type, target_type));
		var selected_effects = effects.mapWithArray(function(definition, cur_index){
			return (definition.num != selected_effect_num && definition.num != -1) ? new Array() : 
				   (section_x == undefined || cur_index < 2) ? xml_manager.interpret(definition) : 
					   xml_manager.interpret(definition, {"x" : section_x, "width" : section_width});
		});
		
		var end_time = 0;
		this.sub_effects = selected_effects.filter(function(effect){
			if(effect != null){end_time = Math.max(end_time, effect.end_time);}		//sub_effectsの中からend_timeの最大値を算出する
			return(effect != null);
		});
		
		this.end_time = end_time;
	},
	
	update : function(){
		this.sub_effects.forEach(function(effect){
			effect.update();
		});
	}
});

var PlayerPieces = enchant.Class.create({
	initialize : function(pieces, x, y, width, height, v_y){
		this.pieces = pieces;
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
		this.v_y = v_y;
	}
});

var Panel = enchant.Class.create(enchant.Sprite, {
	initialize : function(width, height, x, y){
		enchant.Sprite.call(this, width, height);
		
		this.x = x;
		this.y = y;
		this.pieces = new Array();	//メインの格子状のエリアに配置されている全ピース
		for(var i = 0; i < NUM_VERTICAL_BLOCKS * NUM_HORIZONTAL_BLOCKS; ++i){this.pieces.push(null);}
		this.moving_pieces = new Array();	//前フレームから移動したピース
		this.is_ready_for_next_piece = true;	//次のピースを出現させるかどうか	
		this.pieces_moving_rate = 30;	//現在のピースが1ます分落下する頻度
		this.cur_falling_pieces = null;	//現在プレイヤーが操作しているシェイプの情報
		this.size_of_block = {"width" : 32, "height" : 32};						//1ますのサイズ
		this.next_appearing_pieces = {"pieces" : null, "width" : 0, "height" : 0};		//次に出現するシェイプの情報
		this.next_piece_label = new NextPieceLabel(0, this.y, this.x, this.height);
		this.candidates_for_disappearing_pieces = new Array();		//消える可能性のあるピースをグループごとに入れておく
		this.disappearing_pieces = new Array();						//パネルから外されたピース
		this.is_in_normal_state = true;								//ピースを消す処理が終わって普通の処理ルーチンに戻ってもいいかどうか
		this.score_label = new Score();								//スコアを画面に表示するラベル
		this.num_successive_disappearance = 1;						//現在の連鎖の数
		this.effect_manager = new EffectManager();					//エフェクトマネージャー
		this.manual_button = new enchant.Label('<a href="manual.html" target="_blank">MANUAL</a>');			//マニュアルを表示するボタン
		this.manual_button.x = 20;
		this.manual_button.y = this.height - 100;
		this.manual_button.width = this.x / 2;
		
		this.shapes = {"shapes" : [
			           [new Piece(32, 32, this), null, null, null,
			            new Piece(32, 32, this), new Piece(32, 32, this), new Piece(32, 32, this), null],
		               [null, new Piece(32, 32, this), null, null,
		                new Piece(32, 32, this), new Piece(32, 32, this), new Piece(32, 32, this), null],
		               [null, null, new Piece(32, 32, this), null,
		                new Piece(32, 32, this), new Piece(32, 32, this), new Piece(32, 32, this), null],
		               [new Piece(32, 32, this), new Piece(32, 32, this), null, null,
		                new Piece(32, 32, this), new Piece(32, 32, this), null, null],
		               [new Piece(32, 32, this), new Piece(32, 32, this), new Piece(32, 32, this), new Piece(32, 32, this),
		                null, null, null, null],
		               [new Piece(32, 32, this), null, null, null,
		                new Piece(32, 32, this), new Piece(32, 32, this), null, null],
		               [null, new Piece(32, 32, this), null, null,
		                new Piece(32, 32, this), new Piece(32, 32, this), null, null],
		               [new Piece(32, 32, this), new Piece(32, 32, this), new Piece(32, 32, this), null,
		                null, null, null, null],
		               [new Piece(32, 32, this), null, null, null,
		                new Piece(32, 32, this), null, null, null],
		               [new Piece(32, 32, this), new Piece(32, 32, this), null, null,
		                null, null, null, null]
		               ],
		               "widths" : [32 * 3, 32 * 3, 32 * 3, 32 * 2, 32 * 4, 32 * 2, 32 * 2, 32 * 3, 32, 32 * 2],
		               "heights" : [32 * 2, 32 * 2, 32 * 2, 32 * 2, 32, 32 * 2, 32 * 2, 32, 32 * 2, 32]};
		
		this.addEventListener('enterframe', function(){
			this.effect_manager.update();
			label_manager.update();
			
			if(!this.is_in_normal_state){
				this.updateDisappearingPieces();
			}else{
				if(this.moving_pieces.length == 0){
					this.num_successive_disappearance = 1;
					this.tryToCreatePieces();
					this.updatePlayerInput();
					this.updatePieces();
				}else{
					this.makePiecesDisappear();
				}
			}
		});
	},
	
	/**
	 * 現在プレイヤーが操作しているシェイプを反時計回りに90度回転させる
	 */
	rotateLeft : function(){
		with(this){
			var rotated_pieces = cur_falling_pieces.pieces.map(function(piece){
				var return_piece = createNewPiece(piece.type);
				return_piece.copyMembersFrom(piece);
					
				var before = {"x" : piece.position_in_shape.x, "y" : piece.position_in_shape.y};
				return_piece.position_in_shape.x = Math.round(before.y * 1);	//回転行列にθ=pi/2を代入したもの
				return_piece.position_in_shape.y = Math.round(-(before.x * 1));	//cos(pi/2)=0,sin(pi/2)=1となるため
					
				return_piece.convertPositionLocalToGlobal();
					
				return_piece.neighbors.swapAntiClockwise();
				return return_piece;
			}, this);
			
			if(rotated_pieces.every(function(piece){
				return (piece.tryToMove(0, 0) && piece.tryToMove(0, 1));
			})){
				cur_falling_pieces.pieces.forEach(function(piece){
					game.currentScene.removeChild(piece);
				});
				rotated_pieces.forEach(function(piece){
					game.currentScene.addChild(piece);
				});
				cur_falling_pieces.pieces = rotated_pieces;
				var tmp = cur_falling_pieces.width;
				cur_falling_pieces.width = cur_falling_pieces.height;
				cur_falling_pieces.height = tmp;
			}
		}
	},
	
	/**
	 * 現在プレイヤーが操作しているシェイプを時計回りに90度回転させる
	 */
	rotateRight : function(){
		with(this){
			var rotated_pieces = cur_falling_pieces.pieces.map(function(piece){
				var return_piece = createNewPiece(piece.type);
				return_piece.copyMembersFrom(piece);
					
				var before = {"x" : piece.position_in_shape.x, "y" : piece.position_in_shape.y};
				return_piece.position_in_shape.x = Math.round(-(before.y * 1));	//回転行列にθ=pi/2を代入したもの
				return_piece.position_in_shape.y = Math.round(before.x * 1);	//cos(pi/2)=0,sin(pi/2)=1となるため
					
				return_piece.convertPositionLocalToGlobal();
				return_piece.neighbors.swapClockwise();
				return return_piece;
			}, this);
			
			if(rotated_pieces.every(function(piece){
				return (piece.tryToMove(0, 0) && piece.tryToMove(0, 1));
			})){
				cur_falling_pieces.pieces.forEach(function(piece){
					game.currentScene.removeChild(piece);
				});
				rotated_pieces.forEach(function(piece){
					game.currentScene.addChild(piece);
				});
				cur_falling_pieces.pieces = rotated_pieces;
				var tmp = cur_falling_pieces.width;
				cur_falling_pieces.width = cur_falling_pieces.height;
				cur_falling_pieces.height = tmp;
			}
		}
	},
	
	/**
	 * プレイヤーの入力を受け付ける
	 */
	updatePlayerInput : function(){
		with(this){
			if(game.input.left){
				var tmp_x = cur_falling_pieces.x - size_of_block.width;
				cur_falling_pieces.x = (cur_falling_pieces.pieces.every(function(piece){
					return (piece.tryToMove(-1, 0) && piece.tryToMove(-1, 1));
				})) ? tmp_x : cur_falling_pieces.x;
				game.input['left'] = false;
			}else if(game.input.right){
				var tmp_x = cur_falling_pieces.x + size_of_block.width;
				cur_falling_pieces.x = (cur_falling_pieces.pieces.every(function(piece){
					return (piece.tryToMove(1, 0) && piece.tryToMove(1, 1));
				})) ? tmp_x : cur_falling_pieces.x;
				game.input['right'] = false;
			}else if(game.input.up){
				rotateLeft();
				game.input['up'] = false;
			}else if(game.input.down){
				rotateRight();
				game.input['down'] = false;
			}else if(game.input.a){
				this.cur_falling_pieces.pieces.sort(function(lhs, rhs){		//下側にある要素を先に調べるためにy座標の順に並べ替える
					return (lhs.position_in_shape.y > rhs.position_in_shape.y) ? -1 :
						(lhs.position_in_shape.y < rhs.position_in_shape.y) ? 1 : 0;
				}).forEach(function(piece, index, array){
					piece.landOn();
					this.moving_pieces.push(piece);
					delete array[index];
				}, this);
				
				this.is_ready_for_next_piece = true;
				game.input["a"] = false;
			}else if(game.input.b){			//Bボタンを押されたらポーズする
				var pause_scene = new PauseScene((this.x + this.width) / 2, (this.y + this.height) / 2);
				game.pushScene(pause_scene);
			}
		}
	},
	
	/**
	 * ピースを更新する
	 */
	updatePieces : function(){
		this.cur_falling_pieces.y += this.cur_falling_pieces.v_y;
		this.cur_falling_pieces.pieces.forEach(function(piece){		//シェイプの位置座標を元に操作しているピースを移動させる
			piece.convertPositionToCoordinates();
			piece.convertCoordinatesToPosition();
			piece.setCoords();
		}, this);
		
		this.cur_falling_pieces.pieces.every(function(piece, index, array){
			if(!piece.tryToMove(0, 1)){	//自分の下1ますが空いているかどうか確かめる
				if(piece.position.y <= 2){		//上から数えて3段目までピースがたまってしまっていたら、ゲームオーバー
					var gameover_scene = new GameOverScene((this.x + this.width) / 2, this.y + 10, this.score_label.getScore()
							, this.x, this.width, this.height);
					game.pushScene(gameover_scene);
					return false;
				}
				
				piece.position.y = Math.round(piece.position.y);
				this.setPieceToPanel(piece);	//1ピースでも落下限界に達したら他のピースも一気に落とせるところまで落とす
				if(game.is_debug){
					console.log("["+game.frame+"]"+"piece touched another one!");
					console.log(piece.logPosition());
				}
				
				this.moving_pieces.push(piece);
				delete array[index];

				array.sort(function(lhs, rhs){		//下側にある要素を先に調べるためｙ座標の大きい順で並べ替える
					return (lhs.position_in_shape.y > rhs.position_in_shape.y) ? -1 :
						(lhs.position_in_shape.y < rhs.position_in_shape.y) ? 1 : 0;
				}).forEach(function(piece, index, array){
					piece.landOn();
					delete array[index];
					this.moving_pieces.push(piece);
					if(game.is_debug){console.log(piece.logPosition());}
				}, this);
				
				this.is_ready_for_next_piece = true;
			}
			
			return true;
		}, this);
	},
	
	/**
	 * 新しいピースを出現させる
	 */
	tryToCreatePieces : function(){
		if(this.is_ready_for_next_piece){	//新しいピースを出現させる準備が整ったので、次のピースを所定の位置に出現させる
			
			//あらかじめ設定しておいたピースをプレイヤーが操作するピースに設定し、その他のパラメーターを設定する
			this.cur_falling_pieces = new PlayerPieces(this.next_appearing_pieces.pieces, this.x + this.size_of_block.width * 5,
					this.y, this.next_appearing_pieces.width, this.next_appearing_pieces.height, this.size_of_block.height / this.pieces_moving_rate);
			this.cur_falling_pieces.pieces.forEach(function(piece){
				if(piece != null){game.currentScene.addChild(piece);}
			});
			
			//乱数をつかって次のピースの形を決め、初期位置を設定しておく
			this.setNextAppearingPieces();
			var next_pieces = this.next_appearing_pieces.pieces.map(function(piece){
				return (piece != null) ? this.createNewPiece(piece.type) : null;
			}, this);
			this.next_piece_label.setPieces(next_pieces, this.size_of_block);	//次に出現するピース欄に次のピースのコピーを渡す
			
			//個々のピースに隣接したピースの参照を持たせる
			this.cur_falling_pieces.pieces.forEach(function(piece, cur_index, array){
				/*if(piece != null){
					[-1, 1, -4, 4].forEach(function(index, cur_index2){
						if(0 <= cur_index + index && cur_index + index < 8){piece.neighbors[cur_index2] = array[cur_index + index];}
					});
				}else{*/
				if(piece == null){
					delete array[cur_index];	//nullのピースは削除する
				}
			});
			
			this.is_ready_for_next_piece = false;
		}
	},
	
	/**
	 * パネル上から外されたピースにエフェクトをかけるなどの処理を行う
	 */
	updateDisappearingPieces : function(){
		if(game.frame > label_manager.getMaxEndTime()){		//エフェクトをかけおわるフレームになったので、その後処理をする
			this.disappearing_pieces.forEach(function(piece){
				this.removePiece(piece);
				if(game.is_debug){console.log("the piece at"+piece.logPosition()+"which is a(n) \""+getPropertyName(PieceTypes, piece.type)
						+"\" is going to disappear.");}
				game.currentScene.removeChild(piece);
			}, this);
			
			this.moving_pieces.sort(function(lhs, rhs){			//下にあるものから動かすためにY座標で並び替える
				return (lhs.position.y > rhs.position.y) ? -1 :
					(lhs.position.y < rhs.position.y) ? 1 : 0;
			}).forEach(function(piece){		//動くピースリストに追加されたピースを着地させる
				this.removePiece(piece);
				piece.makeUnconnected();
				if(piece.neighbors[0] != null){piece.neighbors[0].makeUnconnected();}
				if(piece.neighbors[1] != null){piece.neighbors[1].makeUnconnected();}
				this.effect_manager.removeEffect(piece);
				if(game.is_debug){
					console.log("the piece at"+piece.logPosition()+"which is a(n) \""+getPropertyName(PieceTypes, piece.type)
							+"\" is moving to");
				}
				piece.landOn();
				if(game.is_debug){
					console.log(piece.logPosition()+".");
				}
			}, this);
			
			this.disappearing_pieces.splice(0);
			this.is_in_normal_state = true;
			this.is_ready_for_next_piece = true;
		}
	},
	
	/**
	 * パネル内から消せるピースを探して得点を追加する
	 */
	makePiecesDisappear : function(){
		var start_searching_pieces = new Array();			//探索の起点とするピースたち
		this.moving_pieces.forEach(function(piece, i, array){			//動いてきたピースに周りのピースへの参照を持たせる
			this.addNeighborsReference(piece);
			if(!start_searching_pieces.contains(piece)){start_searching_pieces.push(piece);}
			
			piece.neighbors.forEach(function(neighbor){		//動いてきたピースの周りにいるピースにも再度参照を追加する
				if(neighbor == null){return;}
				this.addNeighborsReference(neighbor);
				
				if(!start_searching_pieces.contains(neighbor) && !array.contains(neighbor)){
					start_searching_pieces.push(neighbor);	//動いてきたピースの３つ隣のピースまで探索の起点にする
				}
				
				neighbor.neighbors.forEach(function(w_neighbor){
					if(w_neighbor == null){return;}
					this.addNeighborsReference(w_neighbor);
					
					if(!start_searching_pieces.contains(w_neighbor) && !array.contains(w_neighbor)){
						start_searching_pieces.push(w_neighbor);
					}
					w_neighbor.neighbors.forEach(function(t_neighbor){
						if(t_neighbor == null){return;}
						this.addNeighborsReference(t_neighbor);
						
						if(!start_searching_pieces.contains(t_neighbor) && !array.contains(t_neighbor)){
							start_searching_pieces.push(t_neighbor);
						}
					}, this);
				}, this);
			}, this);
		}, this);
		
		this.pieces.forEach(function(piece){
			if(piece != null){piece.neighbors_buffer = piece.neighbors.slice(0);}
		});
		
		start_searching_pieces.forEach(function(piece, i, array){		//同じ種類のピースの塊を探す
			var group = new Array();
			piece.searchForSameTypeOfPiece(group, array);
			
			if(group.length >= 3){this.candidates_for_disappearing_pieces.push(group);}
		}, this);
		this.moving_pieces.splice(0);
		
		var pieces_searching_for_couple = new Array(), couple_indices = new Array(), prev_score = this.score_label.getScore();
		this.candidates_for_disappearing_pieces.sort(function(lhs, rhs){	//同一種のグループを優先して探せるように並べ替えを行う
			return (lhs.length > rhs.length) ? 1 :
				(lhs.length == rhs.length) ? 0 : -1;
		}).forEach(function(group, cur_index){
			if(group.length >= 4){		//4個以上は同一種からのみなるグループを探す
				group.forEach(function(piece, i, array){
					this.disappearing_pieces.push(piece);
					
					var index = this.moving_pieces.indexOf(piece);	//動くピースに指定されていたらその指定を外す
					if(index != -1){delete this.moving_pieces[index];}
					
					piece.makeUnconnected();
					this.effect_manager.removeEffect(piece);
					
					for(var upper = piece.neighbors[2];; upper = upper.neighbors[2]){
						if(upper == null){break;}
						
						if(!array.contains(upper) && !this.disappearing_pieces.contains(upper)){/*自分の上にいるピースの中で消えてしまうもの以外をこれから動くピースリストに追加する
																								同時に2カ所以上で消えるピースが出てくる可能性があるため*/
							this.moving_pieces.push(upper);
						}else{
							break;
						}
					}
				}, this);
				
				var score_diff = 100 * Math.pow(2, this.num_successive_disappearance) * group.length;
				this.score_label.addScore(score_diff);	//スコアを追加する
				var average_coords = this.calcPiecesAverageCoordinates(group);
				this.effect_manager.addEffect(new PiecesEffect(group.slice(0), undefined, score_diff, this.num_successive_disappearance
						, average_coords));
				if(game.is_debug){console.log("score added! "+score_diff+"points added!");}
				sound_manager.play(this.num_successive_disappearance % 8 - 1);
				this.is_in_normal_state = false;
			}else if(group.length == 3){		//3個の場合はカップリングを探す
				group.forEach(function(piece){
					pieces_searching_for_couple.push(piece);		//カップリングを探すピース
					couple_indices.push(cur_index);						//上記のピースが所属するグループ番号
				});
			}
		}, this);
		
		var candidates = this.candidates_for_disappearing_pieces;
		pieces_searching_for_couple.forEach(function(piece_info, cur_index, couples_array){
			if(this.disappearing_pieces.contains(piece_info)){return;}
			
			piece_info.neighbors.every(function(neighbor){
				if(neighbor == null){return true;}
				var result = true;
				var index0 = couples_array.indexOf(neighbor);	//pieceの周りにカップリングを探しているピースがいないか調べる
				if(index0 != -1 && couple_indices[cur_index] != couple_indices[index0] 	//同じグループに存在しておらず、すでにカップリングが見つかったピースではない
				&& !this.disappearing_pieces.contains(neighbor)){
					result = false;
					var target_index = couple_indices[index0];
					var disappearing_pieces = candidates[couple_indices[cur_index]].concat(candidates[couple_indices[index0]]);
					disappearing_pieces.forEach(function(piece, i, array){
						this.disappearing_pieces.push(piece);
						
						var index = this.moving_pieces.indexOf(piece);	//動くピースに指定されていたらその指定を外す
						if(index != -1){delete this.moving_pieces[index];}
						
						piece.makeUnconnected();
						this.effect_manager.removeEffect(piece);
						
						for(var upper = piece.neighbors[2];; upper = upper.neighbors[2]){
							if(upper == null){break;}
							
							if(!array.contains(upper) && !this.disappearing_pieces.contains(upper)){/*自分の上にいるピースの中で消えてしまうもの以外をこれから動くピースリストに追加する
																									同時に2カ所以上で消えるピースが出てくる可能性があるため*/
								this.moving_pieces.push(upper);
							}else{
								break;
							}
						}
					}, this);
					
					var score_diff = Math.floor(75 * Math.pow(1.5, this.num_successive_disappearance) * disappearing_pieces.length);
					this.score_label.addScore(score_diff);		//スコアを追加する
					var pieces = candidates[couple_indices[cur_index]].slice(0), targets = candidates[target_index].slice(0);
					var average_coords = this.calcPiecesAverageCoordinates(pieces), average_coords2 = this.calcPiecesAverageCoordinates(targets);
					var section_x = (average_coords.x < average_coords2.x) ? this.x : this.x + this.width / 2;
					var section_x2 = (average_coords.x < average_coords2.x) ? this.x + this.width / 2 : this.x;
					this.effect_manager.addEffect(new PiecesEffect(pieces, targets, score_diff / 2, this.num_successive_disappearance
							, average_coords, section_x, this.width / 2));	//それぞれのグループのピースの種類に対応するエフェクトを追加する
					this.effect_manager.addEffect(new PiecesEffect(targets, pieces, score_diff / 2, this.num_successive_disappearance
							, average_coords2, section_x2, this.width / 2));
					if(game.is_debug){console.log("score added! "+score_diff+"points added!");}
					sound_manager.play(this.num_successive_disappearance % 8 - 1);
					this.is_in_normal_state = false;
				}
				
				return result;
			}, this);
		}, this);
		
		if(this.score_label.getScore() - prev_score > 0){	//スコアが増えてたら連鎖数を増やして、まだ新しいピースが出現しないようにする
			++this.num_successive_disappearance;
			this.is_ready_for_next_piece = false;
		}
		
		this.candidates_for_disappearing_pieces.splice(0);
	},
	
	/**
	 * 引数のピースの周りに存在するピースの参照を追加する
	 */
	addNeighborsReference : function(piece){
		[{"x" : -1, "y" : 0}, {"x" : 1, "y" : 0}, {"x" : 0, "y" : -1}, {"x" : 0, "y" : 1}].forEach(function(pos, index){
			piece.neighbors[index] = this.getPieceOnPanelAt(piece.position.x + pos.x, piece.position.y + pos.y);
		}, this);
	},
	
	/**
	 * 次に出現するピースを設定する
	 */
	setNextAppearingPieces : function(){
		var shape_type = mersenne.nextInt(this.shapes.shapes.length);
		this.next_appearing_pieces.pieces = this.shapes.shapes[shape_type].map(function(piece, cur_index){
			var return_piece = null;
			if(piece != null){
				return_piece = this.createNewPiece(mersenne.nextInt(PieceTypes.MAX));
				return_piece.position.x = 5 + (cur_index % 4);
				return_piece.position.y = Math.floor(cur_index / 4);
				return_piece.position_in_shape.x = cur_index % 4;
				return_piece.position_in_shape.y = Math.floor(cur_index / 4);
				return_piece.real_coords.x = this.coordsAt('x', return_piece.position.x);
				return_piece.real_coords.y = this.coordsAt('y', return_piece.position.y);
				return_piece.setCoords(return_piece.real_coords.x, return_piece.real_coords.y);
			}
			
			return return_piece;
		}, this);
		this.next_appearing_pieces.width = this.shapes.widths[shape_type];
		this.next_appearing_pieces.height = this.shapes.heights[shape_type];
	},
	
	/**
	 * 新しいピースオブジェクトを作成して戻り値として返す
	 */
	createNewPiece : function(type){
		with(this){
			switch(type){
			case PieceTypes.AKARI :
				return new Piece(size_of_block.width, size_of_block.height, this, PieceTypes.AKARI, 'images/piece_akari.png');
				break;
				
			case PieceTypes.AYANO :
				return new Piece(size_of_block.width, size_of_block.height, this, PieceTypes.AYANO, 'images/piece_ayano.png');
				break;
				
			case PieceTypes.CHINATSU :
				return new Piece(size_of_block.width, size_of_block.height, this, PieceTypes.CHINATSU, 'images/piece_chinatsu.png');
				break;
				
			case PieceTypes.CHITOSE :
				return new Piece(size_of_block.width, size_of_block.height, this, PieceTypes.CHITOSE, 'images/piece_chitose.png');
				break;
				
			case PieceTypes.HIMAWARI :
				return new Piece(size_of_block.width, size_of_block.height, this, PieceTypes.HIMAWARI, 'images/piece_himawari.png');
				break;
				
			case PieceTypes.KYOKO :
				return new Piece(size_of_block.width, size_of_block.height, this, PieceTypes.KYOKO, 'images/piece_kyoko.png');
				break;
				
			case PieceTypes.SAKURAKO :
				return new Piece(size_of_block.width, size_of_block.height, this, PieceTypes.SAKURAKO, 'images/piece_sakurako.png');
				break;
				
			case PieceTypes.YUI :
			case 8 :
				return new Piece(size_of_block.width, size_of_block.height, this, PieceTypes.YUI, 'images/piece_yui.png');
				break;
			}
		}
		
		throw new TypeError();
	},
	
	/**
	 * 絶対座標を相対座標に変換する
	 */
	positionAt : function(type, value){
		switch(type){
		case 'x' :
			return ((value - this.x) / this.size_of_block.width);
			break;
			
		case 'y' :
			return ((value - this.y) / this.size_of_block.height);
			break;
		}
	},
	
	/**
	 * 相対座標を絶対座標に変換する
	 */
	coordsAt : function(type, value){
		switch(type){
		case 'x' : 
			return (this.x + this.size_of_block.width * value);
			break;
			
		case 'y' :
			return (this.y + this.size_of_block.height * value);
			break;
		}
	},
	
	/**
	 * パネル上の指定した位置にピースがあるかどうかを返す
	 */
	anyPieceExistsAt : function(x, y){
		return isInRange(0, NUM_HORIZONTAL_BLOCKS, x) && isInRange(0, NUM_VERTICAL_BLOCKS, y)
		&& (this.pieces[NUM_HORIZONTAL_BLOCKS * y + x] != null);
	},
	
	/**
	 * 指定した位置のピースの参照を返す
	 * 内部でvalidityを確かめているので使用前にanyPieceExistsAtを呼び出す必要はない
	 */
	getPieceOnPanelAt : function(x, y){
		return (isInRange(0, NUM_HORIZONTAL_BLOCKS, x) && isInRange(0, NUM_VERTICAL_BLOCKS, y)) 
		? this.pieces[NUM_HORIZONTAL_BLOCKS * y + x] : null;
	},
	
	/**
	 * 引数のピースをパネル上に固定する
	 */
	setPieceToPanel : function(piece){
		this.pieces[NUM_HORIZONTAL_BLOCKS * piece.position.y + piece.position.x] = piece;
	},
	
	/**
	 * 指定したピースをパネルから取り除く
	 */
	removePiece : function(piece){
		this.pieces[NUM_HORIZONTAL_BLOCKS * piece.position.y + piece.position.x] = null;
	},
	
	calcPiecesAverageCoordinates : function(pieces){
		var average_coords = {"x" : 0, "y" : 0};
		pieces.forEach(function(piece){
			average_coords.x += piece.real_coords.x;
			average_coords.y += piece.real_coords.y;
		})
		average_coords.x /= pieces.length;
		average_coords.y /= pieces.length;
		return average_coords;
	},
	
	setIsInNormalState : function(state){
		this.is_in_normal_state = state;
	}
});

var Stage = enchant.Class.create(enchant.Scene, {
	initialize : function(){
		enchant.Scene.call(this);
		
		mersenne = new MersenneTwister();		//乱数生成器の初期化
		
		var panel = new Panel(32 * NUM_HORIZONTAL_BLOCKS, 32 * NUM_VERTICAL_BLOCKS, game.width * 1 / 3, 80);
		panel.setNextAppearingPieces();
		xml_manager = new XmlManager("Effects.xml", panel.height);	//XmlManagerの初期化
		var panel_background = new enchant.Surface(panel.width, panel.height);
		var ctx = panel_background.context;
		ctx.fillStyle = "#ebebeb";
		ctx.fillRect(0, 0, panel.width, panel.height);
		ctx.strokeStyle = "rgb(0, 0, 0)";
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(panel.width, 0);
		ctx.lineTo(panel.width, panel.height);
		ctx.lineTo(0, panel.height);
		ctx.closePath();
		ctx.stroke();
		if(game.is_debug){
			(function(){
				ctx.strokeStyle = "rgb(0, 0, 0)";
				ctx.beginPath();
				for(var x = panel.size_of_block.width; x < panel.width; x += panel.size_of_block.width){
					ctx.moveTo(x, 0);
					ctx.lineTo(x, panel.height);
				}
				ctx.stroke();
				ctx.beginPath();
				for(var y = panel.size_of_block.height; y < panel.height; y += panel.size_of_block.height){
					ctx.moveTo(0, y);
					ctx.lineTo(panel.width, y);
				}
				ctx.stroke();
			})();
		}
		panel.image = panel_background;
		this.addChild(panel.next_piece_label.next_label);
		this.addChild(panel.score_label);
		this.addChild(panel.manual_button);
		this.addChild(panel);
		
		this.backgroundColor = "#ebebeb";
		
		if(game.is_debug){
			this.addEventListener('enterframe', function(){
				if(game.frame % 5 == 0){
					console.log("["+game.frame+"] ");
					panel.cur_falling_pieces.pieces.forEach(function(piece, index){
						if(piece != null){console.log(index+":("+piece.position.x+", "+piece.position.y+") ");}
					});
				}
			});
		}
		
		var prev_touched_pos = {"x" : 0, "y" : 0}, touched = false, prev_touched_frame = 0, amount_of_moving = 5;
		var isInPlayerPieces = function(x, y){
			var player_pieces = panel.cur_falling_pieces;
			return (player_pieces.x <= x && x <= player_pieces.x + player_pieces.width && player_pieces.y <= y 
					&& y <= player_pieces.y + player_pieces.height);
		}
		
		this.addEventListener('touchstart', function(e){
			if(isInPlayerPieces(e.x, e.y)){
				prev_touched_pos.x = e.x;
				prev_touched_pos.y = e.y;
				prev_touched_frame = game.frame;
				touched = true;
			}
		});
		
		this.addEventListener('touchmove', function(e){
			if(touched){
				var pos_diff = {"x" : e.x - prev_touched_pos.x, "y" : e.y - prev_touched_pos.y}, player_pieces = panel.cur_falling_pieces;
				if(pos_diff.x >= amount_of_moving){
					game.input["right"] = true;
				}else if(pos_diff.x <= -amount_of_moving){
					game.input["left"] = true;
				}else if(e.x >= player_pieces.x + player_pieces.width / 2 && pos_diff.y >= amount_of_moving 
						|| e.x <= player_pieces.x + player_pieces.width / 2 && pos_diff.y <= -amount_of_moving){
					game.input["down"] = true;
				}else if(e.x >= player_pieces.x + player_pieces.width / 2 && pos_diff.y <= -amount_of_moving 
						|| e.x <= player_pieces.x + player_pieces.width / 2 && pos_diff.y >= amount_of_moving){
					game.input["up"] = true;
				}else{
					['left', 'right', 'up', 'down', 'a', 'b'].forEach(function(type){
						if(game.input[type]){
							game.input[type] = false;
						}
					});
				}
				
				prev_touched_pos.x = e.x;
				prev_touched_pos.y = e.y;
			}
		});
		
		this.addEventListener('touchend', function(e){
			if(touched){
				if(game.frame - prev_touched_frame <= 10){
					game.input["a"] = true;
				}else{
					if(game.input["a"]){
						game.input["a"] = false;
					}
				}
			}
		});
	}
});

window.onload = function(){
	game = new enchant.Game(480, 760);
	game.fps = 30;
	game.preload(['images/piece_akari.png', 'images/piece_ayano.png', 'images/piece_chinatsu.png', 'images/piece_chitose.png',
	              'images/piece_himawari.png', 'images/piece_kyoko.png', 'images/piece_sakurako.png', 'images/piece_yui.png']);
	game.is_debug = true;
	game.onload = function(){
		sound_manager = new SoundManager();
		label_manager = new LabelManager();
		var stage = new Stage();
		game.pushScene(stage);
	};
	
	game.keybind(32, 'a');
	game.keybind(80, 'b');
	game.start();
};
