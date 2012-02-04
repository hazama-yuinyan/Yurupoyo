var VarStore = enchant.Class.create({
    initialize: function(){
        var store = {};
        this.addVar = function(name, value){
            if(name.search(/\./) != -1){
                var elems = name.split("\.");
                if(store[elems[0]]){
                    store[elems[0]][elems[1]] = value;
                }else{
                    var elem = {};
                    elem[elems[1]] = value;
                    store[elems[0]] = elem;
                }
            }else{
                store[name] = value;
            }
        }
        this.getVar = function(name){
            if(name.search(/\./) != -1){
                var elems = name.split("\.");
                return store[elems[0]][elems[1]];
            }else{
                return store[name];
            }
        }
    }
});

var ExpressionEvaluator = enchant.Class.create({
	initialize : function(){},
	tokenize : function(str){
	    // 字句解析
	    var tokens = [];
	    while(str) {
	        var m;
	        if (m = str.match(/^[ \t]+/)) {
	            //
	        } else if(m = str.match(/^(\+|\-)?((\d+)(\.(\d+)?)?|\.(\d+))(E(\+|\-)?(\d+))?/i)) {
	            tokens.push({type:"num", value:parseInt(m[0])});
	        } else if(m = str.match(/^[\+\-\*\/\^\(\)=]|^[<>](?!=)|^<=|^>=|^and|^or/i)){
	            tokens.push({type:m[0], value:m[0]});
	        } else if(m = str.match(/^(\$[a-zA-z0-9\.]+)/)){
	            tokens.push({type:"variable", value:m[0].replace(/\$/, "")});
	        } else {
	            return null;
	        }
	        str = str.slice(m[0].length);
	    }
	    return tokens;
	},
	
	eval : function(s){
	    //構文解析
	    var parser = new Parse.Parser();
	    
	    //defにはobjectを渡す事も出来ます。
	    //withでDSLっぽく
	    with(parser) {
	        parser.def({
	            expr: Seq(Any(Ref("logical_or"), Ref("logical_and"), Ref("comp"), Ref("add")), End()),
	            logical_or: Seq(Ref("logical_and"),
	                        Repeat(Token("or"), Ref("logical_and"))),
	            logical_and: Seq(Ref("comp"),
	                         Repeat(Token("and"), Ref("comp"))),
	            comp: Seq(Ref("add"),
	            	  Any(Token("<"), Token(">"), Token("="), Token("<="), Token(">=")), Ref("add")),
	            add: Seq(Ref("mul"),
	                 Repeat(Any(Token("+"), Token("-")), Ref("mul"))),
	            mul: Seq(Ref("pow"),
	                 Repeat(Any(Token("*"), Token("/")), Ref("pow"))),
	            pow: Seq(Ref("fact"),
	                 Repeat(Token("^"), Ref("fact"))),
	            fact: Seq(Label("sign", Maybe(Any(Token("+"), Token("-")))),
	                    Any(Token("num"), Token("variable"),
	                    Seq(Token("("), Ref("add"), Token(")"))))
	        });
	    }
	    parser.callback({
	        expr: function(m) {
	            return m[0];
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
	        	return (m[1] == '<') ? m[0] < m[2] :
	        	       (m[1] == '>') ? m[0] > m[2] :
	        	       (m[1] == '=') ? m[0] == m[2] :
	        	       (m[1] == "<=") ? m[0] <= m[2] : m[0] >= m[2];
	        },
	        add:function(m) {
	            return m[1].inject(m[0], function(acc, v){
	                return (v[0] == "-") ? (acc - v[1]) : (acc + v[1]);
	            });
	        },
	        mul: function(m) {
	            return m[1].inject(m[0], function(acc, v){
	                return (v[0] == "/") ? (acc / v[1]) : (acc * v[1]);
	            });
	        },
	        pow: function(m) {
	            return m[1].inject(m[0], function(acc, v){
	                return Math.pow(acc, v[1]);
	            });
	        },
	        fact: function(m){
	            var v = m.g.num || m.g.add || variable_store.getVar(m.g.variable);
	            return (m.g.sign == "-")? -v : v;
	        },
	    });
	    var tokens = this.tokenize(s);
	    if(tokens == null) { 
	        return null; 
	    }
	    var r = parser.parse(tokens, "expr");
	    return r && r.value;
	}
});
