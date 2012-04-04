/**
 * calc.js
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
 */


/**
 * ユーザー定義変数を管理するクラス
 */
var VarStore = enchant.Class.create({
	initialize: function(){
		var store = {};
		this.addVar = function(name, value, is_inner_use){
			if(name.search(/\./) != -1){
				var elems = name.split(/\./);
				if(!is_inner_use && game.running && (!store[elems[0]] || !store[elems[0]][elems[1]])){	//ゲーム開始後の変数定義を禁止する
					console.log(["The variable \"", name, "\" isn't defined. You must first define variables in the header before using them."].join(""));
					return false;
				}
				if(store[elems[0]]){
					store[elems[0]][elems[1]] = value;
				}else{
					var elem = {};
					elem[elems[1]] = value;
					store[elems[0]] = elem;
				}
			}else{
				if(!is_inner_use && game.running && !store[name]){		//ゲーム開始後の変数定義を禁止する
					console.log(["The variable \"", name, "\" isn't defined. You must first define variables in the header before using them."].join(""));
					return false;
				}
				store[name] = value;
			}

			return true;
		};

		this.getVar = function(name){
			var result = undefined;
			if(name.search(/\./) != -1){
				var elems = name.split(/\./);
				result = store[elems[0]][elems[1]];
			}else{
				result = store[name];
			}

			if(result == undefined){throw new ParserError(["The variable named ", name, " is not defined!"].join(""));}
			return result;
		};

		this.removeVar = function(name){
			if(name.search(/\./) != -1){
				var elems = name.split(/\./);
				if(store[elems[0]] && store[elems[0]][elems[1]]){delete store[elems[0]][elems[1]];}
			}else{
				if(store[name]){delete store[name];}
			}
		};
	}
});

/**
 * 数式ライクなExpressionを解析して評価するクラス
 */
var ExpressionEvaluator = enchant.Class.create({
	initialize : function(var_store){
		var parser = new Parse.Parser();
		parser.variable_store = var_store;
		parser.days = {Sun : 0, Mon : 1, Tue : 2, Wed : 3, Thu : 4, Fri : 5, Sat : 6};

		with(parser) {
			parser.def({	//パーサーの定義
				expr: Ref("statement"),
				statement: Any(Seq(Ref("assignment"), Repeat(Token(";"), Ref("statement"))),
				Seq(Any(Ref("get"), Ref("assignment"), Ref("logical_or")), End())),
				get: Seq(Token("return"),
				Any(Ref("add"), Token("variable"))),
				assignment: Seq(Token("variable"), 
				Token(":"), Ref("logical_or")),
				logical_or: Seq(Ref("logical_and"),
				Repeat(Token("or"), Ref("logical_and"))),
				logical_and: Seq(Ref("comp"),
				Repeat(Token("and"), Ref("comp"))),
				comp: Seq(Ref("add"),
				Maybe(Any(Token("<"), Token(">"), Token("!="), Token("="), Token("<="), Token(">=")), Ref("add"))),
				add: Seq(Ref("mul"),
				Repeat(Any(Token("+"), Token("-")), Ref("mul"))),
				mul: Seq(Ref("pow"),
				Repeat(Any(Token("*"), Token("/"), Token("%")), Ref("pow"))),
				pow: Seq(Ref("fact"),
				Repeat(Token("^"), Ref("fact"))),
				fact: Seq(Label("sign", Maybe(Any(Token("+"), Token("-")))),
				Any(Token("num"), Token("variable"), Token("string"),
				Seq(Token("("), Ref("logical_or"), Token(")"))))
			});
		}
		parser.callback({		//セマンティックアクションの定義
			expr: function(m) {
				return m[0];
			},
			statement: function(m){
				return (m.g[";"]) ? m[0][1].inject(m[0][0], function(acc, v){
					return v[1];
				}) : m[0][0];
			},
			get: function(m){
				return (m.g.variable != undefined) ? this.parser.variable_store.getVar(m.g.variable) : m[1];
			},
			assignment: function(m){
				if(!this.parser.variable_store.addVar(m[0], m[2])){
					throw new ParserError(["The left operand of assignment must be a variable! Do you really intend to assign something to ",
					                       m[0], "? Or you just forget the $ sign before the name."].join(""));
				}
				return "successful assignment";
			},
			logical_or: function(m){
				return m[1].inject(m[0], function(acc, v){
					return acc || v[1];
				});
			},
			logical_and: function(m){
				return m[1].inject(m[0], function(acc, v){
					return acc && v[1];
				});
			},
			comp: function(m){
				return (m[1] != null) ? (function(acc, v){
					return (v[0] == '<') ? acc < v[1] :
							(v[0] == '>') ? acc > v[1] :
							(v[0] == '=') ? acc == v[1] :
							(v[0] == "!=") ? acc != v[1] :
							(v[0] == "<=") ? acc <= v[1] : acc >= v[1];
				})(m[0], m[1]) : m[0];
			},
			add: function(m) {
				return m[1].inject(m[0], function(acc, v){
					return (v[0] == "-") ? (acc - v[1]) : (acc + v[1]);
				});
			},
			mul: function(m) {
				return m[1].inject(m[0], function(acc, v){
					return (v[0] == "%") ? (acc % v[1]) : 
                            (v[0] == "/") ? (acc / v[1]) : (acc * v[1]);
				});
			},
			pow: function(m) {
				return m[1].inject(m[0], function(acc, v){
					return Math.pow(acc, v[1]);
				});
			},
			fact: function(m){
				var v = (m.g.num != undefined) ? m.g.num :
					(m.g.logical_or != undefined) ? m.g.logical_or : m.g.string && m.g.string.replace(/\\s/g, " ")
							|| this.parser.variable_store.getVar(m.g.variable);
				if(isString(v)){
					v = (v == "true") ? true :
						(v == "false") ? false : this.parser.days[v] || v;
				}
				return (m.g.sign == "-")? -v : v;
			},
		});

		this.eval = function(str){
			var tokens = this.tokenize(str);
			if(tokens == null){return null;}
			var r = parser.parse(tokens, "expr");
			return r && r.value;
		};
	},

	tokenize : function(str){
		// 字句解析
		var tokens = [];
		while(str) {
			var m;
			if (m = str.match(/^[ \t]+/)) {
				//
			} else if(m = str.match(/^(\+|\-)?((\d+)(\.(\d+)?)?|\.(\d+))(E(\+|\-)?(\d+))?/i)) {	//数値リテラル
				tokens.push({type:"num", value:parseInt(m[0])});
			} else if(m = str.match(/^[\+\-\*\/\^\(\)=:;%]|^!=|^<=?|^>=?|^and|^or|^return/i)){	//組み込みの演算子
				tokens.push({type:m[0], value:m[0]});
			} else if(m = str.match(/^\$([^\s\(\)\+\-\*\/\^=:!;<>%]+)/)){		//$マークで始まる文字列は演算子以外、変数名とみなす
				tokens.push({type:"variable", value:m[1]});
			} else if(m = str.match(/^\\?(\S+)/)){								//文字列
				tokens.push({type:"string", value:m[1]});
			} else {
				throw new ParserError(["Unknown token found in ", str].join(""));
			}
			str = str.slice(m[0].length);
		}
		return tokens;
	}
});

var ParserError = enchant.Class.create(Error, {
	initialize : function(message, file_name, line_number){
		Error.call(this, message, file_name, line_number);

		this.name = "ParserError";
	}
});
