/**
 * ゆるゆり＋ぷよぷよ風のゲーム
 *
 * game.js
 *
 * Copyright (c) HAZAMA
 * http://funprogramming.ojaru.jp
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
 * enchant.js v0.4.3
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
var ImagePaths = ['images/piece_akari.png', 'images/piece_ayano.png', 'images/piece_chinatsu.png', 'images/piece_chitose.png',
                  'images/piece_himawari.png', 'images/piece_kyoko.png', 'images/piece_sakurako.png', 'images/piece_yui.png'];
var PieceTypes = {AKARI : 0, AYANO : 1, CHINATSU : 2, CHITOSE : 3, HIMAWARI : 4, KYOKO : 5, SAKURAKO : 6, YUI : 7, MAX : 8};

var shapes = {shapes : [                                                        //static変数がないための苦肉の策
    		           [1, 0, 0, 0,                                             //本当はCreateShapeTaskのstaticメンバにすべき
			            1, 1, 1, 0],
		               [0, 1, 0, 0,
		                1, 1, 1, 0],
		               [0, 0, 1, 0,
		                1, 1, 1, 0],
		               [1, 1, 0, 0,
		                1, 1, 0, 0],
		               [1, 1, 1, 1,
		                0, 0, 0, 0],
		               [1, 0, 0, 0,
		                1, 1, 0, 0],
		               [0, 1, 0, 0,
		                1, 1, 0, 0],
		               [1, 1, 1, 0,
		                0, 0, 0, 0],
		               [1, 0, 0, 0,
		                1, 0, 0, 0],
		               [1, 1, 0, 0,
		                0, 0, 0, 0]
		               ],
		               widths : [32 * 3, 32 * 3, 32 * 3, 32 * 2, 32 * 4, 32 * 2, 32 * 2, 32 * 3, 32, 32 * 2],
		               heights : [32 * 2, 32 * 2, 32 * 2, 32 * 2, 32, 32 * 2, 32 * 2, 32, 32 * 2, 32]};

var system_lang = navigator.language;


if(navigator.userAgent.toLowerCase().search("chrome") != -1){   //Chromeだと、funのコンテキストを変えられないようなので、そのWorkaround
    Array.prototype.every = function(fun/*, thisp*/){
        var len = this.length;
        if(typeof fun != "function"){throw new TypeError();}
        
        var thisp = arguments[1];
        for(var i = 0; i < len; ++i){
            if(i in this && !fun.call(thisp, this[i], i, this)){
                return false;
            }
        }
        
        return true;
    };
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
	var expansion = {width : e.offsetWidth, height : e.offsetHeight};
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
 * valがtargetからrangeの範囲内にあるかどうか調べる
 * @param range
 * @param target
 * @param val
 * @returns {Boolean}
 */
function isInRangeOnValue(range, target, val){
    return(Math.abs(val - target) < range);
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

	var result = [];
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

if(!Array.prototype.deepCopy){
    Array.prototype.deepCopy = function(){
        var cloned = [];
        this.forEach(function(obj, index){
            if(obj instanceof Array){
                cloned[index] = obj.slice(0);
            }else if(obj && typeof obj == "object"){
                cloned[index] = obj.clone();
            }else{
                cloned[index] = obj;
            }
        })
        
        return cloned;
    }
}

var StartScreen = enchant.Class.create(enchant.Group, {
	initialize : function(input_manager, task_manager, xml_manager){
		enchant.Group.call(this);

        var back = new enchant.Sprite(game.width, game.height);
		back.backgroundColor = "rgba(100, 100, 100, 0.6)";
        this.addChild(back);
        
        this.moveTo(0, 0);
        this.width = game.width;
        this.height = game.height;

		var selected_menu_num = 0, last_selected = 0;
		var menu_label = new enchant.Label("MENU");
		menu_label.x = game.width / 2 - 50;
		menu_label.y = 100;
		menu_label.font = "normal xx-large 'うずらフォント', 'MS ゴシック'";
		setRulerStyle(" font: " + menu_label.font);
		menu_label.width = menu_label.text.getExpansion().width;
		menu_label.color = "#1212fb";
		menu_label.backgroundColor = "#ffffff";
		this.addChild(menu_label);

        var start_texts = xml_manager.getText("texts")[system_lang].start;
		var explain_label = new enchant.Label(start_texts.explanation);
		explain_label.x = 0;
		explain_label.y = 350;
		explain_label.font = "normal x-large 'うずらフォント', 'MS ゴシック'";
		setRulerStyle(" font: " + explain_label.font);
		explain_label.width = game.width;
		explain_label.backgroundColor = "#ffffff";
		this.addChild(explain_label);

		this.mode_labels = [];
		var slow_mode_label = new enchant.Label(start_texts.slow_mode);
		slow_mode_label.x = game.width / 2 - 90;
		slow_mode_label.y = 200;
		slow_mode_label.color = "rgb(233, 109, 140)";
		slow_mode_label.font = "normal x-large 'うずらフォント', 'MS ゴシック'";
		slow_mode_label.width = slow_mode_label.text.getExpansion().width;
		slow_mode_label.backgroundColor = "#ffffff";
        slow_mode_label._style.cursor = "pointer";
		this.mode_labels.push(slow_mode_label);
		this.addChild(this.mode_labels[0]);

		var fast_mode_label = new enchant.Label(start_texts.fast_mode);
		fast_mode_label.x = game.width / 2 - 90;
		fast_mode_label.y = 250;
		fast_mode_label.color = "#000000";
		fast_mode_label.font = "normal x-large 'うずらフォント', 'MS ゴシック'";
		fast_mode_label.width = fast_mode_label.text.getExpansion().width;
		fast_mode_label.backgroundColor = "#ffffff";
        fast_mode_label._style.cursor = "pointer";
		this.mode_labels.push(fast_mode_label);
		this.addChild(this.mode_labels[1]);

		function isInArea(x, y, obj){
			return(obj.x <= x && x <= obj.x + obj.width && obj.y <= y && y <= obj.y + obj._element.clientHeight);
		}
        
        input_manager.setOperator(new StartOperator(this.mode_labels, this));

		var touched = false, prev_touched_frame = 0;
		this.addEventListener('touchstart', function(e){
			if(isInArea(e.x, e.y, this.mode_labels[0]) || isInArea(e.x, e.y, this.mode_labels[1])){
				touched = true;
				prev_touched_frame = game.frame;
			}
		});

		this.addEventListener('touchend', function(e){
			if(touched && game.frame - prev_touched_frame <= 20){
				if(isInArea(e.x, e.y, this.mode_labels[0])){
					selected_menu_num = 0;
				}else if(isInArea(e.x, e.y, this.mode_labels[1])){
					selected_menu_num = 1;
				}

				if(selected_menu_num == last_selected){
					game.is_survival = (selected_menu_num == 1);
                    game.input.a = true;
				}else{
                    task_manager.add(new UpdateMenuTask(task_manager, this.mode_labels, selected_menu_num, last_selected));
                    last_selected = selected_menu_num;
				}
			}
		});
	}
});

var GameOver = enchant.Class.create({
	initialize : function(xml_manager, score){
        game.memory.player.data = {is_survival : game.is_survival};
        game.memory_update();
        
        var result_texts = xml_manager.getText("texts").common.results;
        var evalScoreSlow = function(score){
            return (score < 5000) ? result_texts[0] :
                   (score < 15000) ? result_texts[1] :
                   (score < 30000) ? result_texts[2] : 
                   (score < 60000) ? result_texts[3] :
                   (score < 100000) ? result_texts[4] :
                   (score < 200000) ? result_texts[5] : result_texts[6];
        };
        var evalScoreFast = function(score){
            return evalScoreSlow(Math.floor(score / 2));
        };
        
        game.end(score, (game.is_survival) ? evalScoreFast(score) : evalScoreSlow(score));
	}
});

var PauseScreen = enchant.Class.create(enchant.Group, {
	initialize : function(xml_manager, y, panel_height){
		enchant.Group.call(this);

        var back = new enchant.Sprite(game.width, game.height);
        back.backgroundColor = "rgba(100, 100, 100, 0.6)";
        this.addChild(back);
        
        this.moveTo(0, 0);
        this.width = game.width;
        this.height = game.height;
        
        var pause_label = new enchant.Label("PAUSED");
		pause_label.font = "bold xx-large 'うずらフォント','MS ゴシック'";
		pause_label.y = (y + 100) + panel_height / 2 + 40;
		setRulerStyle(" font: " + pause_label.font);
		pause_label.width = pause_label.text.getExpansion().width;
        pause_label.x = game.width / 2 - pause_label.width / 2;
		pause_label.backgroundColor = "#ffffff";
		pause_label.color = "#ff1512";

        var pause_texts = xml_manager.getText("texts")[system_lang].pause;
		var explain_label = new enchant.Label(pause_texts.explanation);
		explain_label.x = 0;
		explain_label.y = pause_label.y + 40;
		explain_label.font = "bold large 'うずらフォント', 'MS ゴシック'";
		explain_label.width = game.width;
		explain_label.backgroundColor = "#ffffff";
		explain_label.color = "#000000";
        
        var ranking_label = new enchant.Label("");
    	ranking_label.x = 0;
		ranking_label.y = y + 100;
		ranking_label.width = game.width;
		ranking_label.backgroundColor = "#ffffff";

		var ranking_list = document.createElement("div");
		ranking_list.setAttribute("style", "height: " + panel_height / 2 + "px; border: inset 5px #ff1012; overflow: hidden");
		ranking_list.setAttribute("id", "ranking");
		var ranking_title = document.createElement("p");
		ranking_title.setAttribute("style", "text-align: center; font: bold large 'うずらフォント', 'MS ゴシック'");
		ranking_title.textContent = "RANKING";
		ranking_list.appendChild(ranking_title);
		ranking_list.appendChild(document.createElement("br"));
        
        var user_name = game.memory.player.name, json_obj = game.memories.ranking;
        for(var i = 0; i < json_obj.length; ++i){
        	var line = document.createElement("span"), obj = json_obj[i];
			var is_survival = (obj.data.is_survival) ? "（サバイバル）" : "（ゆったり）";
			line.textContent = (i + 1) + " " + obj.name + " " + obj.score + " " + is_survival;
			var style;
			if(user_name && obj.name.search(user_name.replace(/[\(\)\$\[\]\.\?\*\+\^\!\{\}\\\|\/]/g, "\\$&")) != -1){
				style = "color: #ff1012; font: bold large 'うずらフォント'";
			}else{
				style = "color: #000000; font: italic large 'うずらフォント'";
			}
			line.setAttribute("style", style);
			ranking_list.appendChild(line);
			ranking_list.appendChild(document.createElement("br"));
		}

		ranking_label._element.appendChild(ranking_list);
        this.addChild(ranking_label);

		this.addChild(explain_label);
		this.addChild(pause_label);

		var touched = false;
		this.addEventListener('touchstart', function(){
			touched = true;
		});

		this.addEventListener('touchend', function(){
			if(touched && !game.input.b){
				game.input["b"] = true;
				touched = false;
			}
		});

		this.addEventListener('enterframe', function(){
    		if(ranking_list != null){
				if(ranking_list.scrollTop != ranking_list.scrollHeight - ranking_list.clientHeight){
					++ranking_list.scrollTop;	//ランキングを少しずつスクロールさせる
				}else{
					ranking_list.scrollTop = 0;
				}
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
		this.backgroundColor = "#ebebeb";
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
		this.piece_up_left_pos = {x : x + 16, y : y + 50};
		this.next_label = new enchant.Label("NEXT");
		this.next_label.font = "bold xx-large 'うずらフォント','MS ゴシック'";
		this.next_label.backgroundColor = "#ebebeb";
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
	initialize : function(width, height, type, image_path){
		enchant.Sprite.call(this, width, height);
        
		this.type = type;							//このピースのタイプ
		this.image = image_path && game.assets[image_path];
		this.frame = 0;
		this.position = {x : 0, y : 0};		//自分のいる位置をブロック単位で表したもの
		this.real_coords = {x : 0.0, y : 0.0};	//このピースの座標を少数で表したもの
		this.position_in_shape = {x : 0, y : 0};	//現在のシェイプ内での相対的な位置をブロック単位で表したもの:左上が(0,0)右下が(4,2)
		this.neighbors = [null, null, null, null];	//自分の周りにいるピースへの参照:[Left, Right, Up, Down]の順番
		this.neighbors_buffer = null;				//消せるピースを探すときに使用するneighborsの一時保存領域
		this.connecting_to = 0x00;		//どの方向のピースと連結しているかを表す。4ビットのフラグとして管理し、その順番はneighborsと同じく右端のビットがDownとなる
	},
    
    clone : function(){
        var tmp = new Piece(this.width, this.height, this.type);
        tmp.image = this.image;
        tmp.frame = this.frame;
        tmp.position = this.position.clone(this.position);
        tmp.real_coords = this.real_coords.clone(this.real_coords);
        tmp.position_in_shape = this.position_in_shape.clone(this.position_in_shape);
        tmp.neighbors = this.neighbors.slice(0);
        tmp.neighbors_buffer = this.neighbors_buffer;
        tmp.connecting_to = this.connecting_to;
        return tmp;
    },

	/**
	 * 自分と相手のピースのタイプが同じかどうか返す
	 */
	isOfSameType : function(other_piece){
		return (this.type == other_piece.type);
	},

	makeConnected : function(index, effect_manager){
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
				effect_manager.addEffect(new TimeIndependentVibrationEffect(this, Math.floor(this.real_coords.x) - 3
						, Math.floor(this.real_coords.x) + 3, Math.floor(this.real_coords.y) - 6, Math.floor(this.real_coords.y)
						, 2, 0));
			}
			break;

		case 3:
			if((this.connecting_to & 0x01) != 0x01){
				this.connecting_to |= 0x01;		//0001
				effect_manager.addEffect(new TimeIndependentVibrationEffect(this, Math.floor(this.real_coords.x) - 3
						, Math.floor(this.real_coords.x) + 3, Math.floor(this.real_coords.y), Math.floor(this.real_coords.y) + 6
						, 2, 0));
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

	searchForSameTypeOfPiece : function(group, starting_pieces, effect_manager){
		if(group.contains(this)){return;}
		group.push(this);
		this.neighbors_buffer.forEach(function(piece, cur_index){
			if(piece != null && this.isOfSameType(piece)){
				var index2 = starting_pieces.indexOf(piece);		//見つかったものは起点となるピースから削除する
				if(index2 != -1){delete starting_pieces[index2];}

				this.makeConnected(cur_index, effect_manager);
				piece.makeConnected((cur_index % 2 == 0) ? cur_index + 1 : cur_index - 1, effect_manager);

				piece.searchForSameTypeOfPiece(group, starting_pieces, effect_manager);
			}
		}, this);
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

var PieceFactory = enchant.Class.create({
    initialize : function(){
        
    },
    
    create : function(type, size_of_block){
		return new Piece(size_of_block.width, size_of_block.height, type, ImagePaths[type]);
    }
})

var Manager = enchant.Class.create({
    initialize : function(stage){
        this.stage = stage;
        this.is_available = true;
    }
});

var XmlManager = enchant.Class.create(Manager, {
	initialize : function(stage, url){
        Manager.call(this, stage);
        
		var http_obj = new XMLHttpRequest(), http_obj2 = new XMLHttpRequest();
		var definitions = [], headers = [], max_nums = {}, texts = null, expr_evaluator = new ExpressionEvaluator();
		var variable_store = new VarStore();
		this.pieces = null;
		this.average_coords = 0;
		var now = new Date();
		variable_store.addVar("now", {year : now.getFullYear(), month : now.getMonth() + 1, date : now.getDate(), day : now.getDay(),
			hour : now.getHours()}, true);
		this.panel_bottom = 0;

		http_obj.onload = function(){
			var squeezeValues = function(elem){
				var obj = {};
				for(var attrs = elem.attributes, i = 0; i < attrs.length; ++i){
					obj[attrs[i].name] = (attrs[i].value.search(/^\d+\.?\d*$/) != -1) ? parseFloat(attrs[i].value) : attrs[i].value;	//数値だけのものはNumber型にする
				}

				return obj;
			};
            
            var getKeyString = function(tag){
                return tag["with"] && [tag.type, "_with_", tag["with"]].join("") || tag.type;
            };
            
            var createObjFromChild = function(type, obj, elem){    //DOMツリーをたどってタグをオブジェクト化する
				if(!elem){return obj;}

				var child_obj = squeezeValues(elem);
				if(type != "header" && elem.childElementCount !== 0){
					var content = createObjFromChild(type, [], elem.firstElementChild, child_obj);
					child_obj['children'] = content;
				}

				child_obj['type'] = elem.tagName;
				if(elem.textContent.length !== 0){child_obj['text'] = elem.textContent.replace(/[\t\n\r]+/g, "");}
                if(child_obj.num){
                    var key = child_obj.children && getKeyString(content[0]) || getKeyString(child_obj);
                    max_nums[key] = child_obj.num;
                }
				obj.push(child_obj);
				return createObjFromChild(type, obj, elem.nextElementSibling);
			};
            
			var xml = http_obj.responseXML, doc = xml.documentElement;
			var header_elem = doc.getElementsByTagName("header")[0];

            headers = createObjFromChild("header", [], header_elem.firstElementChild);
            
            headers.forEach(function(header, index, array){    	//ヘッダー部分の要素をオブジェクトの形に変換する
				switch(header.type){
				case "characters" :
				case "colors" :
					var tags = header.tags.split(/\s*,\s*/);
					var bodies = header.text.split(/\s*;\s*/), name = header.type.slice(0, header.type.length-1);
					array[index] = {type : header.type};
					for(var i = 0; i < tags.length; ++i){
						variable_store.addVar([tags[i], ".", name].join(""), bodies[i], true);
						array[index][tags[i]] = bodies[i];
					}
					break;

				case "paths" :
				case "settings" :
					var names = header.names.split(/\s*,\s*/), bodies = header.text.split(/\s*;\s*/);
					array[index] = {type : header.type};
					for(var i = 0; i < names.length; ++i){
						variable_store.addVar([header.type, ".", names[i]].join(""), bodies[i], true);
						array[index][names[i]] = bodies[i];
					}
					break;

				case "variables" :
				case "flags" :
					var exprs = header.text.split(/\s*;\s*/);
					exprs.forEach(function(expr){
						var tokens = expr.split(/\s*:\s*/);
						variable_store.addVar([(header.type == "flags") ? "flags." : "", tokens[0]].join(""), tokens[1], true);
					});
					break;
				}
			});
            
            definitions = createObjFromChild("body", [], header_elem.nextElementSibling);
		}

		http_obj.open("get", url, false);
		http_obj.send(null);
        
        http_obj2.onload = function(){
            texts = JSON.parse(http_obj2.responseText);
        };
        
        http_obj2.open("get", "./texts.json", false);
        http_obj2.setRequestHeader("Content-Type", "application/json charset=utf-8;");
        http_obj2.send(null);
        
        this.getText = function(name){
            return texts[name];
        };

		this.getDefinitions = function(name, target){
			if(target != undefined){
				var results = definitions.filter(function(definition){
					return(definition.name == name && definition['with'] == target);
				});
				if(results.length != 0){
                    return results;
				}
			}
            
			var results = definitions.filter(function(definition){
				return(definition.name == name && definition['with'] == undefined);
			});

			return results;
		};
        
        this.getVarStore = function(){
            return variable_store;
        };
        
        var replaceVarImpl = function(str, name){
    		return variable_store.getVar(name);
		};

		this.replaceVars = function(str){
			return str.replace(/\$([^\s;]+)/g, replaceVarImpl);
		};
        
        var getMaxNumImpl = function(effect, target, level){
            if(!effect || level > 1){return 1;}
            var key = (target != undefined) ? [effect, "_with_", target].join("") : effect;
            return max_nums[key] || getMaxNumImpl(target, effect, level + 1);
        }

		this.getMaxNum = function(effect_name, target){
			return getMaxNumImpl(effect_name, target, 0);
		};

		this.getHeader = function(type_name, name){
			var header_obj = null;
			headers.every(function(header){
				if(header.type == type_name){
					header_obj = header;
					return false;
				}

				return true;
			});

			return name && header_obj[name] || header_obj;
		}

		this.verify = function(condition){
			if(condition == undefined){return true;}
			return expr_evaluator.eval(condition.replace(/&lt;/g, "<").replace(/&gt;/g, ">"));
		}
	}
});

/**
 * タグ「マネージャー」と言いながらその実態はタグインタプリター。InterpretTagTaskの要請を受けてタグを解釈し
 * 適切なオブジェクトを生成、他のマネージャーにセットする
 */
var TagManager = enchant.Class.create(Manager, {
    initialize : function(stage){
        Manager.call(this, stage);
        
        this.last_obj = null;
        this.xml_manager = null;
        this.label_manager = null;
        this.sound_manager = null;
        this.effect_manager = null;
        this.panel = null;
        this.info = null;
        this.max_end_time = 0;
        
        var Interpreter = enchant.Class.create({
            initialize : function(manager){
                this.manager = manager;
            }
        });
        
        var LabelInterpreter = enchant.Class.create(Interpreter, {
            initialize : function(manager){
                Interpreter.call(this, manager);
                
                this.xml_manager = null;
                this.label_manager = null;
            },
            
            setStyle : function(obj, str){
                //var style = tag.style ;//|| this.xml_manager.getHeader("profile", tag.type).style;
    	        var styles = this.manager.stage.interpretStyle(str);

		        styles.forEach(function(style){
                    if(style.name == "width" || style.name == "height" || style.name == "left" || style.name == "top"){return;}
        			obj._style[style.name] = style.content;
        		}, this);
            },
            
            createNewLabel : function(style, x, y, width, text){
                var tmp = new enchant.Label(text);
                tmp.moveTo(x, y);
                tmp.width = width;
                this.setStyle(tmp, style);
                return tmp;
            },
            
            interpret : function(tag_obj){
                if(!this.xml_manager){this.xml_manager = this.manager.xml_manager;}
                if(!this.label_manager){this.label_manager = this.manager.label_manager;}
                
                var position = {x : this.manager.info.x && this.manager.info.x || 0, y : 0};
    			var style = this.xml_manager.replaceVars(tag_obj.style);
				setRulerStyle(style);
				var text = tag_obj.text.slice(0), num_lines = {val : 1};
				if(this.manager.info.width){text = text.fitInWidth(this.manager.info.width, num_lines);}
				var size = text.getExpansion();
				position.x = this.manager.interpretX(tag_obj.x, size.width);
				position.y = this.manager.interpretY(tag_obj.y, size.height * num_lines.val);

				var label = this.createNewLabel(style, position.x, position.y, 
                    (this.manager.info.width && size.width >= this.manager.info.width) ? this.manager.info.width : size.width, text);
				this.label_manager.add(label, game.frame + tag_obj.start_time, game.frame + tag_obj.end_time);
                this.manager.setMaxEndTime(tag_obj.end_time);
                return label;
            }
        });
        
        var EffectInterpreter = enchant.Class.create(Interpreter, {
            initialize : function(manager){
                Interpreter.call(this, manager);
                
                this.xml_manager = null;
                this.effect_manager = null;
                this.objs = null;
            },
            
            setObjs : function(objs){
                this.objs = objs;
            },
            
            interpret : function(tag_obj){
                if(!this.xml_manager){this.xml_manager = this.manager.xml_manager;}
                if(!this.effect_manager){this.effect_manager = this.manager.effect_manager;}
                
                switch(tag_obj.type){
                case "PieceFrame":
        			var frame = this.xml_manager.replaceVars(tag_obj.frame);
    				this.effect_manager.add(new PieceFrameEffect(this.objs, frame, game.frame + tag_obj.start_time));
    				break;
    
    			case "OpacityChange":
    				this.effect_manager.add(new OpacityChangeEffect(this.objs, tag_obj.value, game.frame + tag_obj.start_time));
    				break;
    
    			case "FadeIn":
    				this.effect_manager.add(new FadeInEffect(this.objs, game.frame + tag_obj.start_time, game.frame + tag_obj.end_time,
                        tag_obj.rate));
    				break;
    
    			case "FadeOut":
    				this.effect_manager.add(new FadeOutEffect(this.objs, game.frame + tag_obj.start_time, game.frame + tag_obj.end_time,
                        tag_obj.rate));
    				break;
    
    			case "TimeIndependentVibration":
    				this.effect_manager.add(new TimeIndependentVibrationEffect(this.objs[0], this.objs[0].x - tag_obj.amplitude_x
    						, this.objs[0].x + tag_obj.amplitude_x, this.objs[0].y - tag_obj.amplitude_y, this.objs[0].y + tag_obj.amplitude_y
    						, tag_obj.max_rate, game.frame + tag_obj.end_time, game.frame + tag_obj.start_time));
    				break;
			    }
                
                this.manager.setMaxEndTime(tag_obj.end_time);
                return null;
            }
        });
        
        var SoundInterpreter = enchant.Class.create(Interpreter, {
            initialize : function(manager){
                Interpreter.call(this, manager);
                
                this.sound_manager = null;
                this.xml_manager = null;
            },
            
            interpret : function(tag_obj){
                if(!this.sound_manager){this.sound_manager = this.manager.sound_manager;}
                if(!this.xml_manager){this.xml_manager = this.manager.xml_manager;}
                this.manager.setMaxEndTime(this.sound_manager.add(this.xml_manager.replaceVars(tag_obj.src)));
                return null;
            }
        });
        
        this.child_interpreters = {
            label : new LabelInterpreter(this), effect : new EffectInterpreter(this), sound : new SoundInterpreter(this)
        }
    },
    
    setMaxEndTime : function(end_time){
        this.max_end_time = Math.max(this.max_end_time, Math.round(end_time));
    },
    
    getMaxEndTime : function(){
        return this.max_end_time;
    },
    
    interpretX : function(val, width){
    	if(this.info.x){
            return this.info.x;
    	}else if(val == "average"){
			return Math.floor(this.info.average_coords.x);
		}else if(val == "average with margin"){
			return (this.info.average_coords.x + width > game.width) ? game.width - width : this.info.average_coords.x;
		}

		return val;
	},

	interpretY : function(val, height){
		if(val == "average"){
			return Math.floor(this.info.average_coords.y);
		}else if(val == "average with margin"){
			return (this.info.average_coords.y + height > game.height) ? game.height - height :
				(this.info.average_coords.y >= (this.panel.y + this.panel.height) / 2) ? this.info.average_coords.y - height : 
                this.info.average_coords.y + height;
		}

		return val;
	},
    
    interpret : function(pieces, info, tag_objs){
        if(!this.xml_manager){this.xml_manager = this.stage.getManager("xml");}
        if(!this.label_manager){this.label_manager = this.stage.getManager("label");}
        if(!this.sound_manager){this.sound_manager = this.stage.getManager("sound");}
        if(!this.effect_manager){this.effect_manager = this.stage.getManager("effect");}
        if(!this.panel){this.panel = this.stage.getPanel();}
        this.max_end_time = 0;
        this.info = info;
        
        tag_objs.forEach(function(tag_obj){
            var label = null, types = tag_obj.type.toLowerCase().split(/\s*\+\s*/);
            types.forEach(function(type){
                if(type.search(/effect$/) != -1){
                    tag_obj.type = type.substring(0, -6);
                    type = "effect";
                    this.child_interpreters["effect"].setObjs(label && [label] || pieces);
                }
                
                label = this.child_interpreters[type].interpret(tag_obj);
            }, this);
        }, this);
    }
});

var SoundManager = enchant.Class.create(Manager, {
	initialize : function(stage){
        Manager.call(this, stage);
        
        this.queue = [];
	},
    
    add : function(path){
        var tmp = game.assets[path];
        this.queue.push(tmp);
        return game.fps * tmp.duration;
    },
    
    update : function(){
        if(!this.is_available || !this.stage.is_in_game){return;}
        
        this.queue.forEach(function(sound){
            sound.play();
        });
        
        this.queue.splice(0);
    }
});

/**
 * ラベルを管理するクラス
 */
var LabelManager = enchant.Class.create(Manager, {
	initialize : function(stage){
        Manager.call(this, stage);
        
		this.labels = [];
	},

	add : function(label, start_time, end_time){
		this.labels.push({obj : label, start_time : (isNaN(start_time)) ? 0 : start_time, end_time : end_time, is_added : false});
	},

	update : function(){
        if(!this.is_available || this.stage.is_in_game){return;}
        
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
var EffectManager = enchant.Class.create(Manager, {
	initialize : function(stage){
        Manager.call(this, stage);
        
		this.effects = [];
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
        if(!this.is_available || !this.is_in_game){return;}
        
		this.effects = this.effects.filter(function(effect){
			return (game.frame <= effect.end_time || effect.end_time === 0);
		});

		this.effects.forEach(function(effect){
			effect.update();
		});
	}
});

/**
 * エフェクトの基底クラス
 * end_timeに0をセットすると、明示的にEffectManagerのremoveEffectを呼び出して削除しなければ、そのエフェクトはいつまでも効果が持続することになる
 */
var Effect = enchant.Class.create({
	initialize : function(time_to_end_affecting, time_to_start_affecting, is_dummy){
		this.start_time = (isNaN(time_to_start_affecting)) ? 0 : time_to_start_affecting;
		this.end_time = time_to_end_affecting || 0;
		var is_dummy = (is_dummy != undefined) ? is_dummy : false;
		this.isDummy = function(){return is_dummy;}
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
		this.min_val = {x : min_x, y : min_y};							//最小値
		this.max_val = {x : max_x, y : max_y};							//最大値
		this.average_val = {x : (min_x + max_x) / 2, y : (min_y + max_y) / 2};
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

var PlayerPieces = enchant.Class.create({
	initialize : function(pieces, x, y, width, height, v_y){
		this.pieces = pieces;
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
		this.v_y = v_y;
        this.is_movable = true;
	}
});

var Panel = enchant.Class.create(enchant.Sprite, {
	initialize : function(width, height, x, y, xml_manager){
		enchant.Sprite.call(this, width, height);

		this.x = x;
		this.y = y;
		this.pieces = [];	//メインの格子状のエリアに配置されている全ピース
		for(var i = 0; i < NUM_VERTICAL_BLOCKS * NUM_HORIZONTAL_BLOCKS; ++i){this.pieces.push(null);}
		this.pieces_moving_rate = 30;	    //現在のピースが1ます分落下する頻度
		this.next_speed_up_score = 10000;	//サバイバルモードで次にピースの落下速度が上がる得点
		this.cur_falling_pieces = null;	    //現在プレイヤーが操作しているシェイプの情報
		this.size_of_block = {width : 32, height : 32};		//1ますのサイズ
		this.next_appearing_pieces = null;		            //次に出現するシェイプの情報
		this.next_piece_label = new NextPieceLabel(0, this.y, this.x, this.height);
		this.score_label = new Score();					    //スコアを画面に表示するラベル
		this.num_successive_disappearance = 1;				//現在の連鎖の数
		this.shows_conversation = false;
        
        var texts = xml_manager.getText("texts");
		this.home_button = new enchant.Label(texts.common.home_button);	//ホームに戻るリンクボタン
		this.home_button.x = 0;
		this.home_button.y = this.y + (this.height - 10);
		this.home_button.width = this.x / 2;
		this.manual_button = new enchant.Label(texts.common.manual_base.replace(/TARGET_URL/, texts[system_lang].panel.manual_link));		//マニュアルを表示するボタン
		this.manual_button.x = this.x / 2;
		this.manual_button.y = this.y + (this.height - 10);
		this.manual_button.width = this.x / 2;

		var TOUCH_ENABLED = (function() {
		    var div = document.createElement('div');
		    div.setAttribute('ontouchstart', 'return');
		    return typeof div.ontouchstart == 'function';
		})();

		var platform_num = (TOUCH_ENABLED) ? 2 : 1, references = xml_manager.getText("reference");
		this.quick_reference = new enchant.Label(
            ['<table>',
	    		'<caption>', references[system_lang][0][0], '</caption>',
	    		'<colgroup span="1" style="width:33.3%; font: normal small \'うずらフォント\', \'MS ゴシック\'">',
	    		'<colgroup span="1" style="width:66.6%; font: normal small \'うずらフォント\', \'MS ゴシック\'">',
	    		'<thead>',
	    		'	<tr><th>', references[system_lang][1][0], '</th><th>', references[system_lang][1][platform_num], '</th></tr>',
	    		'</thead>',
	    		'<tbody>',
	    		'	<tr><td>', references[system_lang][2][0], '</td><td>', references[system_lang][2][platform_num], '</td></tr>',
	    		'	<tr><td>', references[system_lang][3][0], '</td><td>', references[system_lang][3][platform_num], '</td></tr>',
	    		'	<tr><td>', references[system_lang][4][0], '</td><td>', references[system_lang][4][platform_num], '</td></tr>',
	    		'	<tr><td>', references[system_lang][5][0], '</td><td>', references[system_lang][5][platform_num], '</td>></tr>',
	    		'	<tr><td>', references[system_lang][6][0], '</td><td>', references[system_lang][6][platform_num], '</td></tr>',
	    		'	<tr><td>', references[system_lang][7][0], '</td><td>', references[system_lang][7][platform_num], '</td></tr>',
	    		'	<tr><td>', references[system_lang][8][0], '</td><td>', references[system_lang][8][platform_num], '</td></tr>',
	    		'</tbody>',
	    	'</table>'].join(""));
		this.quick_reference.x = 0;
		this.quick_reference.y = this.y + this.height / 5;
		this.quick_reference.width = this.x;
        
        var panel_background = new enchant.Surface(this.width, this.height), self = this;

    	(function(){
			var ctx = panel_background.context;
			ctx.fillStyle = "#ebebeb";
			ctx.fillRect(0, 0, self.width, self.height);
			ctx.strokeStyle = "rgb(0, 0, 0)";
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(self.width, 0);
			ctx.lineTo(self.width, self.height);
			ctx.lineTo(0, self.height);
			ctx.closePath();
			ctx.stroke();

			ctx.strokeStyle = "rgb(0, 0, 0)";		//パネル内にグリッドを描く
			ctx.beginPath();
			for(var x = self.size_of_block.width; x < self.width; x += self.size_of_block.width){
				ctx.moveTo(x, 0);
				ctx.lineTo(x, self.height);
			}
			ctx.stroke();
			ctx.beginPath();
			for(var y = self.size_of_block.height; y < self.height; y += self.size_of_block.height){
				ctx.moveTo(0, y);
				ctx.lineTo(self.width, y);
			}
			ctx.stroke();
		})();
        
		this.image = panel_background;
	},
    
    setPlayerPieces : function(){
        //あらかじめ設定しておいたピースをプレイヤーが操作するピースに設定し、その他のパラメーターを設定する
        this.cur_falling_pieces = new PlayerPieces(this.next_appearing_pieces.pieces, this.x + this.size_of_block.width * 5,
    			this.y, this.next_appearing_pieces.width, this.next_appearing_pieces.height, this.size_of_block.height / this.pieces_moving_rate);
		
        this.cur_falling_pieces.pieces = this.cur_falling_pieces.pieces.filter(function(piece){
            return(piece != null);    //nullのピースは削除する
        });
        
        this.cur_falling_pieces.pieces.forEach(function(piece){
			game.currentScene.addChild(piece);
		});
        
        this.num_successive_disappearance = 1;
    },
    
    setPieces : function(pieces){
        this.cur_falling_pieces.pieces.forEach(function(piece) {
            game.currentScene.removeChild(piece);
        });
        pieces.forEach(function(piece) {
            game.currentScene.addChild(piece);
        });
        this.cur_falling_pieces.pieces = pieces;
        var tmp = this.cur_falling_pieces.width;
        this.cur_falling_pieces.width = this.cur_falling_pieces.height;
        this.cur_falling_pieces.height = tmp;
    },

	/**
	 * 引数のピースの周りに存在するピースの参照を追加する
	 */
	addNeighborsReference : function(piece){
		[{x : -1, y : 0}, {x : 1, y : 0}, {x : 0, y : -1}, {x : 0, y : 1}].forEach(function(pos, index){
			piece.neighbors[index] = this.getPieceOnPanelAt(piece.position.x + pos.x, piece.position.y + pos.y);
		}, this);
	},

	/**
	 * 次に出現するピースを設定する
	 */
	setNextAppearingPieces : function(pieces){
		this.next_appearing_pieces = pieces;
        var next_pieces = pieces.pieces.deepCopy();
		this.next_piece_label.setPieces(next_pieces, this.size_of_block);	//次に出現するピース欄に次のピースのコピーを渡す
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
		var average_coords = {x : 0, y : 0};
		pieces.forEach(function(piece){
			average_coords.x += piece.real_coords.x;
			average_coords.y += piece.real_coords.y;
		});
		average_coords.x /= pieces.length;
		average_coords.y /= pieces.length;
		return average_coords;
	},
    
    /**
     * ピースが指定した方向に移動可能か返す
	 * (x, y)は移動する方向を表すベクトル
	 */
	tryToMove : function(piece_pos, x, y){
		return (isInRange(0, NUM_HORIZONTAL_BLOCKS, Math.floor(piece_pos.x + x)) &&
			    isInRange(0, NUM_VERTICAL_BLOCKS, Math.floor(piece_pos.y + y)) &&
				!this.anyPieceExistsAt(Math.floor(piece_pos.x + x), Math.floor(piece_pos.y + y)));
	},

	/**
	 * 画面の厳密な座標系からパネル内のローカル座標系へ座標変換する
	 */
	convertCoordinatesToPosition : function(piece_real_coords){
		return {x : this.positionAt('x', piece_real_coords.x), y : this.positionAt('y', piece_real_coords.y)};
	},

	/**
	 * ピース内のローカル座標系からパネルのローカル座標系へ座標変換する
	 */
	convertPositionLocalToGlobal : function(position_in_shape){
		return {x : this.positionAt('x', this.cur_falling_pieces.x) + position_in_shape.x,
        y : this.positionAt('y', this.cur_falling_pieces.y) + position_in_shape.y};
	},

	/**
	 * パネル内のローカル座標系から画面の厳密な座標系へ座標変換する
	 */
	convertPositionToCoordinates : function(position_in_shape){
		return {x : this.cur_falling_pieces.x + this.size_of_block.width * position_in_shape.x,
		y : this.cur_falling_pieces.y + this.size_of_block.height * position_in_shape.y};
	}
});

var TaskBase = enchant.Class.create({
    initialize : function(task_manager, name){
        this.task_manager = task_manager;
        this.name = name;
    }
});

var PanelTask = enchant.Class.create(TaskBase, {
    initialize : function(task_manager){
        TaskBase.call(this, task_manager, "Panel");
    },
    
    execute : function(){
        
    }
});

var ShapeTask = enchant.Class.create(TaskBase, {
    initialize : function(task_manager, shape, name){
        TaskBase.call(this, task_manager, name);
        
        this.target = shape;
    }
});

var FallShapeTask = enchant.Class.create(ShapeTask, {
    initialize : function(task_manager, shape){
        ShapeTask.call(this, task_manager, shape, "FallShape");
        
        this.panel = task_manager.stage.getPanel();
    },
    
    execute : function(){
        if(!this.target.is_movable){return;}
        
        this.target.y += this.target.v_y;
    	this.target.pieces.forEach(function(piece){		//シェイプの位置座標を元に操作しているピースを移動させる
			piece.real_coords = this.panel.convertPositionToCoordinates(piece.position_in_shape);
			piece.position = this.panel.convertCoordinatesToPosition(piece.real_coords);
			piece.setCoords();
		}, this);
        
        if(this.target.pieces.every(function(piece){
        	if(!this.panel.tryToMove(piece.position, 0, 1)){	//自分の下1ますが空いているかどうか確かめる
				if(piece.position.y <= 2){		//上から数えて3段目までピースがたまってしまっていたら、ゲームオーバー
					var gameover_scene = new GameOver(this.task_manager.stage.getManager("xml"), this.panel.score_label.getScore());
					return false;
				}

				if(game._debug){
					console.log(["[", game.frame, "] piece touched another one! :"].join(""));
					console.log(piece.logPosition());
				}

                this.task_manager.add(new DropPiecesTask(this.task_manager, this.target.pieces));
                this.target.is_movable = false;
                return false;
			}

			return true;
		}, this)){      //everyがtrueを返したらまだ地表に達しそうなピースはなかったという事。なので次のフレームも同じ事を繰り返す
    	    this.task_manager.add(new FallShapeTask(this.task_manager, this.target));
		}
    }
});

var MoveShapeTask = enchant.Class.create(ShapeTask, {
    initialize : function(task_manager, shape, diff_x){
        ShapeTask.call(this, task_manager, shape, "MoveShape");
        
        this.panel = task_manager.stage.getPanel();
        this.diff_x = diff_x;
    },
    
    execute : function(){
        if(!this.target.is_movable){return;}
        
        var tmp_x = this.target.x + this.panel.size_of_block.width * this.diff_x;
    	this.target.x = this.target.pieces.every(function(piece){
			return (this.panel.tryToMove(piece.position, this.diff_x, 0) && this.panel.tryToMove(piece.position, this.diff_x, 1));
		}, this) ? tmp_x : this.target.x;
    }
});

var RotateShapeTask = enchant.Class.create(ShapeTask, {
    initialize : function(task_manager, shape, panel, is_clockwise){
        ShapeTask.call(this, task_manager, shape, "RotateShape");
        
        this.is_clockwise = is_clockwise;
        this.panel = panel;
    },
    
    execute : function(){
        if(!this.target.is_movable){return;}
        
        var copies = this.target.pieces.deepCopy();
        var rotated_pieces = copies.map(function(piece) {   //ピースを回転させる。コピーを取るのは簡単に元に戻せるようにするため
	        var before = {x: piece.position_in_shape.x, y: piece.position_in_shape.y};
	        piece.position_in_shape.x = Math.round((!this.is_clockwise) ? before.y * 1 : -(before.y * 1)); //回転行列にθ=pi/2を代入したもの
	        piece.position_in_shape.y = Math.round((!this.is_clockwise) ? -(before.x * 1) : before.x * 1); //cos(pi/2)=0,sin(pi/2)=1となるため
	        piece.position = this.panel.convertPositionLocalToGlobal(piece.position_in_shape);
	
	        if (!this.is_clockwise) {
	            piece.neighbors.swapAntiClockwise();
	        } else {
	            piece.neighbors.swapClockwise();
	        }
	        return piece;
	    }, this);
	
	    if (rotated_pieces.every(function(piece) {
	        return (this.panel.tryToMove(piece.position, 0, 0) && this.panel.tryToMove(piece.position, 0, 1));
	    }, this)) {     //無事、すべてのピースが回転先へ移動できることが確認できたら、この移動を確定させる
	        this.panel.setPieces(rotated_pieces);
	    }
    }
});

var CreateShapeTask = enchant.Class.create(TaskBase, {
    initialize : function(task_manager, panel, piece_factory){
        TaskBase.call(this, task_manager, "CreateShape");
        
        this.panel = panel;
        this.factory = piece_factory;
    },
    
    setNextPieces : function(){
        var shape_type = mersenne.nextInt(shapes.shapes.length);
        var pieces = shapes.shapes[shape_type].map(function(num, cur_index){
			var return_piece = null;
			if(num > 0){
				return_piece = this.factory.create(mersenne.nextInt(PieceTypes.MAX), this.panel.size_of_block);
				return_piece.position.x = 5 + (cur_index % 4);
				return_piece.position.y = Math.floor(cur_index / 4);
				return_piece.position_in_shape.x = cur_index % 4;
				return_piece.position_in_shape.y = Math.floor(cur_index / 4);
				return_piece.real_coords.x = this.panel.coordsAt('x', return_piece.position.x);
				return_piece.real_coords.y = this.panel.coordsAt('y', return_piece.position.y);
				return_piece.setCoords();
			}

			return return_piece;
		}, this);
        
		var width = shapes.widths[shape_type], height = shapes.heights[shape_type];
        this.panel.setNextAppearingPieces({pieces : pieces, width : width, height : height});
    },
    
    execute : function(){
        this.panel.setPlayerPieces();
        this.task_manager.add(new FallShapeTask(this.task_manager, this.panel.cur_falling_pieces));
        this.task_manager.stage.getManager("input").is_available = true;

		//乱数をつかって次のピースの形を決め、初期位置を設定しておく
		this.setNextPieces();
    }
});

var PieceTask = enchant.Class.create(TaskBase, {
    initialize : function(task_manager, pieces, name){
        TaskBase.call(this, task_manager, name);
        
        this.targets = pieces;
    }
});

var DropPiecesTask = enchant.Class.create(PieceTask, {
    initialize : function(task_manager, pieces){
       PieceTask.call(this, task_manager, pieces, "DropPieces");
       
       this.panel = task_manager.stage.getPanel();
       this.input_manager = task_manager.stage.getManager("input");
       this.effect_manager = task_manager.stage.getManager("effect");
    },
    
    /**
     * 一気に着地するまでピースを下に移動させる
     */
	landOnPiece : function(piece){
		piece.position.y = Math.round(piece.position.y);
		for(var i = 1; this.panel.tryToMove(piece.position, 0, i); ++i) ;
		piece.position.y += (i - 1);
		this.panel.setPieceToPanel(piece);
	    piece.real_coords.y = this.panel.coordsAt('y', piece.position.y);
		piece.position = this.panel.convertCoordinatesToPosition(piece.real_coords);
		piece.setCoords();
	},
    
    execute : function(){
		this.targets.sort(function(lhs, rhs){		//下側にある要素を先に調べるためｙ座標の大きい順で並べ替える
            return (lhs.position.y > rhs.position.y) ? -1 :
				(lhs.position.y < rhs.position.y) ? 1 : 0;
		}).forEach(function(piece){
            this.panel.removePiece(piece);
    		piece.makeUnconnected();
			if(piece.neighbors[0]){piece.neighbors[0].makeUnconnected();}
			if(piece.neighbors[1]){piece.neighbors[1].makeUnconnected();}
			this.effect_manager.removeEffect(piece);
			if(game._debug){
				console.log(["the piece at", piece.logPosition(), "which is a(n) \"", getPropertyName(PieceTypes, piece.type),
						"\" is moving to"].join(""));
			}
            
			this.landOnPiece(piece);
			
			if(game._debug){console.log([piece.logPosition(), "."].join(""));}
		}, this);

		this.task_manager.add(new MakePiecesDisappearTask(this.task_manager, this.targets));
        this.input_manager.is_available = false;
    }
});

var UpdateDisappearingPiecesTask = enchant.Class.create(PieceTask, {
    initialize : function(task_manager, pieces, moving_pieces, panel, end_time){
        PieceTask.call(this, task_manager, pieces, "UpdateDisapprearingPieces");
        
        this.moving_pieces = moving_pieces;
        this.end_time = game.frame + end_time;
        this.panel = panel;
    },
    
    execute : function(){
        if(game.frame > this.end_time){    	//エフェクトをかけおわるフレームになったので、その後処理をする
			this.targets.forEach(function(piece){
				this.panel.removePiece(piece);
				if(game._debug){
                    console.log(["the piece at", piece.logPosition(), "which is a(n) \"", getPropertyName(PieceTypes, piece.type),
						"\" is going to disappear."].join(""));			
				}
				game.currentScene.removeChild(piece);
			}, this);

			this.targets.splice(0);
			if(game.is_survival && this.panel.score_label.getScore() >= this.panel.next_speed_up_score && this.panel.pieces_moving_rate > 10){
				this.panel.pieces_moving_rate -= 4;
				this.panel.next_speed_up_score = this.score_label.getScore() + 10000;
			}
			
            this.task_manager.add((this.moving_pieces.length) ?
                new DropPiecesTask(this.task_manager, this.moving_pieces) :   //動くピースリストが空でなければまずそれらを落下させる
                new CreateShapeTask(this.task_manager, this.panel, new PieceFactory()));    //それ以外なら次のピースを出現させる
		}else{
    	    this.task_manager.add(this);
		}
    }
});

var MakePiecesDisappearTask = enchant.Class.create(TaskBase, {
    initialize : function(task_manager, moving_pieces){
        TaskBase.call(this, task_manager, "MakePiecesDisappear");
        
        this.moving_pieces = moving_pieces;
        this.panel = task_manager.stage.getPanel();
        this.sound_manager = task_manager.stage.getManager("sound");
        this.label_manager = task_manager.stage.getManager("label");
        this.effect_manager = task_manager.stage.getManager("effect");
        this.xml_manager = task_manager.stage.getManager("xml");
        this.tag_manager = task_manager.stage.getManager("tag");
    },
    
    /**
     * 自分と相手のピースの種類に合わせたエフェクトを選択する
	 */
	chooseAppropriateEffects : function(pieces, targets){
		if(!this.panel.shows_conversation){return [];}

		var piece_type = getPropertyName(PieceTypes, pieces[0].type)
		, target_type = getPropertyName(PieceTypes, targets && targets[0].type);
		var effects = this.xml_manager.getDefinitions(piece_type, target_type), selected_effects, selected_effect_num;
		do{
			var max_num = this.xml_manager.getMaxNum(piece_type, target_type);
			selected_effect_num = mersenne.nextInt(0, max_num);
			selected_effects = effects.filter(function(definition){
				return (definition.num == selected_effect_num && this.xml_manager.verify(definition.enable_if));
			}, this);
		}while(!selected_effects.length || selected_effects);

		return selected_effects.children || [selected_effects];
	},
    
    createBasicEffects : function(piece_type, average_coords, score){
        return [{type : "Label", style : ["color: ", this.xml_manager.getHeader("colors", piece_type.toUpperCase()),
            "; font: large 'うずらフォント', 'MS ゴシック';"].join(""), x : Math.floor(average_coords.x - 50),
        	y : Math.floor(average_coords.y - 20), text : "+" + score, end_time : 30, num : -1},
            {type : "Label", style : ["color: ", this.xml_manager.getHeader("colors", getPropertyName(PieceTypes,
            this.panel.num_successive_disappearance % PieceTypes.MAX)), "; font: bold large 'うずらフォント', 'MS ゴシック';"].join(""),
            x : Math.floor(average_coords.x - 50), y : Math.floor(average_coords.y - 40),
            text : this.panel.num_successive_disappearance + "COMBO!", end_time : 30, num : -1},
            {type : "Sound", src : ["$paths.BANG", (this.panel.num_successive_disappearance - 1) % 8 + 1].join("")}];
    },
    
    execute : function(){
        var start_searching_pieces = this.moving_pieces.slice(0), self = this;    		//探索の起点とするピースたち
        var exploreAround = function(pieces, level){
            if(level > 3){return;}
            pieces.forEach(function(piece){
                if(!piece){return;}
                this.panel.addNeighborsReference(piece);
                piece.neighbors_buffer = piece.neighbors.slice(0);
                if(!start_searching_pieces.contains(piece) && !this.moving_pieces.contains(piece)){
                    start_searching_pieces.push(piece);
                }
                exploreAround(piece.neighbors, level + 1);
            }, self);
        }
		
        exploreAround(this.moving_pieces, 0);    //動いてきたピースの３つ隣のピースまで探索の起点にする

        var candidates = [];
		start_searching_pieces.forEach(function(piece, i, array){		//同じ種類のピースの塊を探す
			var group = [];
			piece.searchForSameTypeOfPiece(group, array, this.effect_manager);

			if(group.length >= 3){candidates.push(group);}
		}, this);
		this.moving_pieces.splice(0);

		var pieces_searching_for_couple = [], couple_indices = [], disappearing_pieces = [];
		candidates.sort(function(lhs, rhs){	    //同一種のグループを優先して探せるように並べ替えを行う
			return (lhs.length > rhs.length) ? 1 :
				(lhs.length == rhs.length) ? 0 : -1;
		}).forEach(function(group, cur_index){
			if(group.length >= 4){		    //4個以上は同一種からのみなるグループを探す
				group.forEach(function(piece, i, array){
					disappearing_pieces.push(piece);

					var index = this.moving_pieces.indexOf(piece);	//動くピースに指定されていたらその指定を外す
					if(index != -1){delete this.moving_pieces[index];}

					piece.makeUnconnected();
					this.effect_manager.removeEffect(piece);

					for(var upper = piece.neighbors[2];; upper = upper.neighbors[2]){
                        //自分の上にいるピースの中で消えてしまうもの以外をこれから動くピースリストに追加する
    					//同時に2カ所以上で消えるピースが出てくる可能性があるため
						if(!upper || array.contains(upper) || disappearing_pieces.contains(upper)){break;}

						this.moving_pieces.push(upper);
					}
				}, this);

				var score_diff = 100 * Math.pow(2, this.panel.num_successive_disappearance) * group.length;
				this.panel.score_label.addScore(score_diff);	//スコアを追加する
				var average_coords = this.panel.calcPiecesAverageCoordinates(group), piece_type = getPropertyName(PieceTypes, group[0].type);
				this.xml_manager.getVarStore().addVar(piece_type, average_coords, true);
				this.xml_manager.getVarStore().addVar("score", this.panel.score_label.getScore(), true);
                var effects = this.createBasicEffects(piece_type, average_coords, score_diff);
				effects = effects.concat(this.chooseAppropriateEffects(group));
                this.tag_manager.interpret(group.slice(0), {average_coords : average_coords}, effects);
				if(game._debug){console.log(["score added! ", score_diff, "points added!"].join(""));}
			}else if(group.length == 3){		//3個の場合はカップリングを探す
				group.forEach(function(piece){
					pieces_searching_for_couple.push(piece);		//カップリングを探すピース
					couple_indices.push(cur_index);					//上記のピースが所属するグループ番号
				});
			}
		}, this);

		pieces_searching_for_couple.forEach(function(piece_info, cur_index, couples_array){
			if(disappearing_pieces.contains(piece_info)){return;}   //すでに消えてしまうピースは探索対象外

			piece_info.neighbors.every(function(neighbor){
				if(neighbor == null){return true;}
				var result = true;
				var index0 = couples_array.indexOf(neighbor);	//pieceの周りにカップリングを探しているピースがいないか調べる
				if(index0 != -1 && couple_indices[cur_index] != couple_indices[index0] 	//同じグループに存在しておらず、すでにカップリングが見つかったピースではない
				&& !disappearing_pieces.contains(neighbor)){
					result = false;
					var target_index = couple_indices[index0];
					var disappearing_pieces2 = candidates[couple_indices[cur_index]].concat(candidates[couple_indices[index0]]);
					disappearing_pieces2.forEach(function(piece, i, array){
						disappearing_pieces.push(piece);

						var index = this.moving_pieces.indexOf(piece);	//動くピースに指定されていたらその指定を外す
						if(index != -1){delete this.moving_pieces[index];}

						piece.makeUnconnected();
						this.effect_manager.removeEffect(piece);

						for(var upper = piece.neighbors[2];; upper = upper.neighbors[2]){
                            //自分の上にいるピースの中で消えてしまうもの以外をこれから動くピースリストに追加する
    						//同時に2カ所以上で消えるピースが出てくる可能性があるため
							if(!upper || array.contains(upper) || disappearing_pieces.contains(upper)){break;}

							this.moving_pieces.push(upper);
						}
					}, this);

					var score_diff = Math.floor(75 * Math.pow(1.5, this.panel.num_successive_disappearance) * disappearing_pieces2.length);
					this.panel.score_label.addScore(score_diff);		//スコアを追加する
					var pieces = candidates[couple_indices[cur_index]].slice(0), targets = candidates[target_index].slice(0);
					var average_coords = this.panel.calcPiecesAverageCoordinates(pieces), average_coords2 = this.panel.calcPiecesAverageCoordinates(targets);
					var section_x = (average_coords.x < average_coords2.x) ? this.x : this.x + this.width / 2;
					var section_x2 = (average_coords.x < average_coords2.x) ? this.x + this.width / 2 : this.x;
					this.xml_manager.getVarStore().addVar(getPropertyName(PieceTypes, pieces[0].type), average_coords, true);
					this.xml_manager.getVarStore().addVar(getPropertyName(PieceTypes, targets[0].type), average_coords2, true);
					this.xml_manager.getVarStore().addVar("score", this.panel.score_label.getScore(), true);
                    var double_average_coords = {x : (average_coords.x + average_coords2.x) / 2, y : (average_coords.y + average_coords2.y) / 2};
                    var effects = this.createBasicEffects("COUPLING", double_average_coords, score_diff);
                    this.tag_manager.interpret(null, double_average_coords, effects);
					//effects.concat(this.chooseAppropriateEffects(pieces, targets));
					/*this.effect_manager.addEffect(new PiecesEffect(this.xml_manager, pieces, score_diff / 2,
                        this.num_successive_disappearance, average_coords, selected_effects1));	//それぞれのグループのピースの種類に対応するエフェクトを追加する
					this.effect_manager.addEffect(new PiecesEffect(this.xml_manager, targets, score_diff / 2, 
                        this.num_successive_disappearance, average_coords2, selected_effects2));*/
					if(game._debug){console.log(["score added! ", score_diff, "points added!"].join(""));}
				}

				return result;
			}, this);
		}, this);

		if(this.moving_pieces.length){	        //新しく動くピースがあったら連鎖数を増やす
			++this.panel.num_successive_disappearance;
            this.task_manager.add(new UpdateDisappearingPiecesTask(this.task_manager, disappearing_pieces, this.moving_pieces, 
                this.panel, this.tag_manager.getMaxEndTime()));
		}else{
    	    this.task_manager.add(new CreateShapeTask(this.task_manager, this.panel, new PieceFactory()))
		}
    }
});

var UpdateMenuTask = enchant.Class.create(TaskBase, {
    initialize : function(task_manager, mode_labels, selected, last){
        TaskBase.call(this, task_manager, "UpdateMenu");
        
        this.mode_labels = mode_labels;
        this.selected_menu_num = selected;
        this.last_selected = last;
    },
    
    execute : function(){
        if(this.selected_menu_num != this.last_selected){
    		this.mode_labels[this.last_selected].color = "#000000";
			this.mode_labels[this.selected_menu_num].color = "rgb(233, 109, 140)";
		}
    }
});

var InterpretTagTask = enchant.Class.create(TaskBase, {
    initialize : function(task_manager, tag_obj){
        TaskBase.call(this, task_manager, "InterpretTag");
        
        this.tag_manager = task_manager.stage.getManager("tag");
        this.tag_obj = tag_obj;
    },
    
    execute : function(){
        this.tag_manager.interpret(this.tag_obj);
    }
});

/**
 * そのフレームに処理すべきタスクを保持しておき、毎フレーム実行する
 * 実行が終わったタスクはすべてキューから取り除かれる
 */
var TaskManager = enchant.Class.create(Manager, {
    initialize : function(stage){
        Manager.call(this, stage);
        
        this.queue = [];    //処理すべきTaskQueue
        this.buffer = [];   //Task内からTaskを追加できるように一時保存領域を用意しておく
    },
    
    add : function(task){
        this.buffer.push(task);
        if(!this.is_available){this.is_available = true;}
    },
    
    update : function(){
        if(!this.is_available){return;}
        
        this.queue.forEach(function(task){
            task.execute();
        });
        
        this.queue = this.buffer;
        if(!this.buffer.length){this.is_available = false;}
        this.buffer = [];
    }
});

/**
 * ユーザーインプットを制御するクラス
 */
var InputOperator = enchant.Class.create({
    initialize : function(){
        this.input_manager = null;
    }
});

/**
 * 通常時のユーザー入力を処理するクラス
 */
var NormalOperator = enchant.Class.create(InputOperator, {
    initialize : function(){
        InputOperator.call(this);
        
        this.task_manager = null;
        this.panel = null;
    },
    
    setInputManager : function(input_manager){
        this.input_manager = input_manager;
        this.task_manager = input_manager.stage.getManager("task");
        this.panel = input_manager.stage.getPanel();
    },
    
    operateUp : function(){     //上ボタンを押されたらピースを反時計回りに回転させる
        this.task_manager.add(new RotateShapeTask(this.task_manager, this.panel.cur_falling_pieces, this.panel, false));
    },
    
    operateDown : function(){   //下ボタンを押されたらピースを時計回りに回転させる
        this.task_manager.add(new RotateShapeTask(this.task_manager, this.panel.cur_falling_pieces, this.panel, true));
    },
    
    operateLeft : function(){   //左ボタンを押されたらピースを１マス左に移動させる
        this.task_manager.add(new MoveShapeTask(this.task_manager, this.panel.cur_falling_pieces, -1));
    },
    
    operateRight : function(){  //右ボタンを押されたらピースを１マス右に移動させる
        this.task_manager.add(new MoveShapeTask(this.task_manager, this.panel.cur_falling_pieces, 1));
    },
    
    operateA : function(){      //Aボタンを押されたらピースを着地させる
        this.task_manager.add(new DropPiecesTask(this.task_manager, this.panel.cur_falling_pieces.pieces));
        this.panel.cur_falling_pieces.is_movable = false;
    },
    
    operateB : function(){      //Bボタンを押されたらポーズする
        this.input_manager.setOperator(new PauseOperator());
    },
    
    operateC : function(){      //Cボタンを押されたらエフェクトのオン・オフを切り替える
        this.panel.is_showing_coversation = !this.panel.is_showing_conversation;
    }
});

var StartOperator = enchant.Class.create(InputOperator, {
    initialize : function(mode_labels, screen){
        InputOperator.call(this);
        
        this.task_manager = null;
        this.selected_menu_num = 0;
        this.mode_labels = mode_labels;
        this.start_screen = screen;
    },
    
    setInputManager : function(input_manager){
        this.input_manager = input_manager;
        this.task_manager = input_manager.stage.getManager("task");
    },
    
    operateUp : function(){
        var last_selected_num = this.selected_menu_num;
    	this.selected_menu_num = (this.selected_menu_num + 1) % 2;
        this.task_manager.add(new UpdateMenuTask(this.task_manager, this.mode_labels, this.selected_menu_num, last_selected_num));
    },
    
    operateDown : function(){
        var last_selected_num = this.selected_menu_num;
        this.selected_menu_num = (this.selected_menu_num + 1) % 2;
        this.task_manager.add(new UpdateMenuTask(this.task_manager, this.mode_labels, this.selected_menu_num, last_selected_num));
    },
    
    operateA : function(){
        game.is_survival = (this.selected_menu_num == 1);
    	game.currentScene.removeChild(this.start_screen);
        this.task_manager.add(new CreateShapeTask(this.task_manager, this.input_manager.stage.getPanel(), new PieceFactory()));
        this.input_manager.setOperator(new NormalOperator());
        this.input_manager.stage.is_in_game = true;
    }
});

var PauseOperator = enchant.Class.create(InputOperator, {
    initialize : function(){
        InputOperator.call(this);
        
        this.pause_screen = null;
    },
    
    setInputManager : function(input_manager){
        this.input_manager = input_manager;
        var panel = input_manager.stage.getPanel();
        this.pause_screen = new PauseScreen(input_manager.stage.getManager("xml"), panel.y, panel.height);
        game.currentScene.addChild(this.pause_screen);
        input_manager.stage.is_in_game = false;
        this.task_manager = input_manager.stage.getManager("task");
        this.task_manager.is_available = false;
    },
    
    operateB : function(){      //Bボタンを押されたらポーズ画面を抜ける
        game.currentScene.removeChild(this.pause_screen);
        this.input_manager.setOperator(new NormalOperator());
        this.input_manager.stage.is_in_game = true;
        this.task_manager.is_available = false;
    }
});

var InputManager = enchant.Class.create(Manager, {
    initialize : function(stage){
        Manager.call(this, stage);
        
        this.operator = null;
    },
    
    setOperator : function(operator){
        this.operator = operator;
        operator.setInputManager(this);
    },
    
    update : function(){
        if(!this.is_available){return;}
        
        if(game.input.left && this.operator.operateLeft){
    		this.operator.operateLeft();
			game.input['left'] = false;
		}else if(game.input.right && this.operator.operateRight){
			this.operator.operateRight();
			game.input['right'] = false;
		}else if(game.input.up && this.operator.operateUp){
			this.operator.operateUp();
			game.input['up'] = false;
		}else if(game.input.down && this.operator.operateDown){
			this.operator.operateDown();
			game.input['down'] = false;
		}else if(game.input.a && this.operator.operateA){
			this.operator.operateA();
			game.input['a'] = false;
		}else if(game.input.b && this.operator.operateB){
			this.operator.operateB();
			game.input['b'] = false;
		}else if(game.input.c && this.operator.operateC){
			this.operator.operateC();
			game.input['c'] = false;
		}
    }
});

var Stage = enchant.Class.create(enchant.Group, {
	initialize : function(){
		enchant.Group.call(this);

        this.is_in_game = false;
		mersenne = new MersenneTwister();		//乱数生成器の初期化

        var xml_manager = new XmlManager(this, "Effects.xml");    //XmlManagerの初期化
        var managers = {xml : xml_manager, tag : new TagManager(this), sound : new SoundManager(this), label : new LabelManager(this),
            effect : new EffectManager(this), input : new InputManager(this), task : new TaskManager(this)
        };
		var panel = new Panel(32 * NUM_HORIZONTAL_BLOCKS, 32 * NUM_VERTICAL_BLOCKS, game.width * 1 / 3, 80, xml_manager);
        var piece_task = new CreateShapeTask(managers.task, panel, new PieceFactory());
        piece_task.setNextPieces();     //最初に出現するピースを設定しておく
        
		xml_manager.panel_bottom = panel.y + panel.height;
		xml_manager.getVarStore().addVar("panel", {width : panel.width, height : panel.height}, true);
        
        var array = [managers.input, managers.task, managers.effect, managers.label, managers.sound];
        var back = new enchant.Sprite(game.width, game.height);
    	back.backgroundColor = "#ebebeb";
        
		this.addChild(back);
		this.addChild(panel.next_piece_label.next_label);
		this.addChild(panel.score_label);
		this.addChild(panel.quick_reference);
		this.addChild(panel.home_button);
		this.addChild(panel.manual_button);
		this.addChild(panel);
        
        this.loadResources = function(path_header, paths){
    		var audio = new Audio();
			for(var name in path_header){		//各種リソースファイルを読み込む
				if(name != "type" && path_header.hasOwnProperty(name)){
					var path = path_header[name];
					if(path.search(/\.ogg/) != -1 && !audio.canPlayType("audio/ogg")){
						path = path.replace(/\.ogg/, ".wav");
						path_header[name] = path;
						paths[name] = path;
					}
					game.load(path);
				}
			}
		};
        
        this.loadResources(xml_manager.getHeader("paths"), xml_manager.getVarStore().getVar("paths"));

		if(game._debug){
			this.addEventListener('enterframe', function(){
                if(!this.is_in_game){return;}
				if(game.frame % 5 == 0){
					console.log(["[", game.frame, "] "].join(""));
					panel.cur_falling_pieces.pieces.forEach(function(piece, index){
						if(piece){console.log([index, ":", piece.logPosition()].join(""));}
					});
				}
			});
		}
        
        this.getManager = function(name){
            return managers[name];
        };
        
        this.getPanel = function(){
            return panel;
        }
        
        this.addEventListener('enterframe', function(){
            array.forEach(function(manager){
                manager.update();
            });
        })

        var pad = new enchant.Sprite(100, 100);
        pad.moveTo(50, panel.manual_button.y - pad.height - 30);
        pad.image = game.assets['images/pad.png'];
        this.addChild(pad);
        
		var touched = false, margin = 5;
		var isInPad = function(x, y){
			return (pad.x - margin <= x && x <= pad.x + pad.width + margin && pad.y - margin <= y && y <= pad.y + pad.height + margin);
		}

		this.addEventListener('touchstart', function(e){
			if(isInPad(e.x, e.y)){
				touched = true;
			}
		});

		this.addEventListener('touchend', function(e){
			if(touched){
                var center = {x : pad.x + pad.width / 2, y : pad.y + pad.height / 2};
				if(isInRangeOnValue(20, e.x, center.x) && isInRangeOnValue(20, e.y, center.y)){ //中心から20ピクセル以内にタッチしたらAボタン
					game.input.a = true;
				}else if(isInRange(pad.x, center.x, e.x) && isInRangeOnValue(20, e.y, center.y)){
				    game.input.left = true;
				}else if(isInRange(center.x, pad.x + pad.width, e.x) && isInRangeOnValue(20, e.y, center.y)){
                    game.input.right = true;
				}else if(isInRangeOnValue(20, e.x, center.x) && isInRange(pad.y, center.y, e.y)){
                    game.input.up = true;
				}else if(isInRangeOnValue(20, e.x, center.x) && isInRange(center.y, pad.y + pad.height, e.y)){
                    game.input.down = true;
				}

				touched = false;
			}else if(e.x <= panel.x && e.y <= panel.y){
				game.input["b"] = true;
			}
		});
	},
    
    /**
     * CSS形式で記述されたスタイル指定文字列を解析してプロパティー名をキー、その設定を値とするオブジェクトに変換する
     */
    interpretStyle : function(str){
    	str = this.getManager("xml").replaceVars(str);
		var styles = [];
		while(str){
			var result;
			if(result = str.match(/^[ \t]+/)){

			}else if((result = str.match(/^([\w\-]+)\s*:\s*([^;]+);?/)) && result[1] != "position"){
				styles.push({name : result[1], content : result[2]});
			}

			str = str.slice(result[0].length);
		}

		return styles;
	}
});

window.onload = function(){
	game = new enchant.nineleap.memory.Game(480, 760);
	game.fps = 30;
	game.preload(ImagePaths.concat('images/pad.png'));
	game._debug = true;
    enchant.nineleap.memory.LocalStorage.DEBUG_MODE = true;
    game.memory.player.preload();
    game.memories.ranking.preload();
    enchant.Sound.enabledInMobileSafari = true;
    
	game.onload = function(){
		var stage = new Stage();
		game.currentScene.addChild(stage);
        var start_screen = new StartScreen(stage.getManager("input"), stage.getManager("task"), stage.getManager("xml"));
        game.currentScene.addChild(start_screen);
	};

	game.keybind(32, 'a');
	game.keybind(80, 'b');
	game.keybind(77, 'c');

	['c'].forEach(function(type){
		this.addEventListener(type + 'buttondown', function(e) {
			if (!this.input[type]) {
				this.input[type] = true;
			}
		});
		this.addEventListener(type + 'buttonup', function(e) {
			if (this.input[type]) {
				this.input[type] = false;
			}
		});
	}, game);

	game.start();
};
