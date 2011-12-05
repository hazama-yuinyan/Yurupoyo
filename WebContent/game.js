/**
 * ゆるゆり＋ぷよぷよ風のゲーム
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
 * 文字列とRulerに指定したスタイルからその文字列を表示するのに最低限必要な幅を算出する
 */
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
	var elem = document.getElementById("ruler");
	var new_style = "visibility: hidden; position: absolute;" + style;
	elem.setAttribute("style", new_style);
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
	initialize : function(x, y){
		enchant.Scene.call(this);
		
		var gameover_label = new enchant.Label("GAME OVER");
		gameover_label.font = "bold xx-large 'うずらフォント','MS ゴシック'";
		gameover_label.x = x;
		gameover_label.y = y;
		setRulerStyle(" font: " + gameover_label.font);
		gameover_label.width = gameover_label.text.getExtent();
		gameover_label.backgroundColor = "#ffffff";
		gameover_label.color = "#ff1512";
		this.addChild(gameover_label);
		this.addEventListener('enterframe', function(){
			if(game.input.a){
				var stage = new Stage();
				game.popScene();
				game.popScene();
				game.pushScene(stage);
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
		pause_label.width = pause_label.text.getExtent();
		pause_label.backgroundColor = "#ffffff";
		pause_label.color = "#ff1512";
		this.addChild(pause_label);
		this.addEventListener('enterframe', function(){
			if(game.input.up){		//upボタンを押されたらポーズシーンを抜ける
				game.popScene();
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
		this.next_label.width = this.next_label.text.getExtent();
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
	
	searchForSameTypeOfPiece : function(group){
		group.push(this);
		this.neighbors_buffer.forEach(function(piece, cur_index, array){
			if(piece != null && this.isOfSameType(piece)){
				delete array[cur_index];		//一周して戻ってきたときのためにすでに行った経路の参照を消しておく
				
				var index = piece.neighbors_buffer.indexOf(this);	//相手側からこのピースに到達されて二重探索にならないように相手側の参照を消しておく
				delete piece.neighbors_buffer[index];
				
				piece.searchForSameTypeOfPiece(group);
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

var EffectManager = enchant.Class.create({
	initialize : function(){
		this.effects = new Array();
	},

	addEffect : function(effect){
		this.effects.push(effect);
	},
	
	update : function(){
		this.effects = this.effects.filter(function(effect){
			return (game.frame <= effect.end_time + 30);
		});
		
		this.effects.forEach(function(effect){
			effect.update();
		});
	}
});

var Effect = enchant.Class.create({
	initialize : function(time_to_end_effecting){
		this.end_time = time_to_end_effecting;
	}
});

var LabelEffect = enchant.Class.create(Effect, {
	initialize : function(font, x, y, text, time_to_end_effecting, background_color, color){
		Effect.call(this, time_to_end_effecting);
		
		this.label = new enchant.Label(text);
		this.label.font = font;
		this.label.x = x;
		this.label.y = y;
		this.label.backgroundColor = background_color;
		setRulerStyle(" font: " + this.label.font);
		this.label.width = this.label.text.getExtent();
		if(arguments.length > 6){this.label.color = color;}
		
		game.currentScene.addChild(this.label);
	},
	
	update : function(){
		if(game.frame >= this.end_time){
			game.currentScene.removeChild(this.label);
		}
	}
});

var FadeInLabelEffect = enchant.Class.create(LabelEffect, {
	initialize : function(font, x, y, text, time_to_end_effecting, background_color, color, increasing_rate){
		LabelEffect.call(this, font, x, y, text, time_to_end_effecting, background_color, color);
		
		this.label.opacity = 0;
		this.opacity_increasing_rate = increasing_rate;
	},
	
	update : function(){
		this.__proto__.__proto__.update.call(this);
		
		this.label.opacity += this.opacity_increasing_rate;
	}
});

var PieceEffect = enchant.Class.create(Effect, {
	initialize : function(pieces, score, num_successive_disappearance, time_to_end_effecting, average_coords, score_label_color){
		Effect.call(this, time_to_end_effecting);
		
		this.targets = pieces;
		this.sub_effects = new Array();
		
		this.sub_effects.push(new LabelEffect("large 'うずらフォント', 'MS ゴシック'", Math.floor(average_coords.x - 50)
				, Math.floor(average_coords.y), "+" + score, time_to_end_effecting, "#ffffff", score_label_color));
		
		this.sub_effects.push(new LabelEffect("bold large 'うずらフォント', 'MSゴシック'", Math.floor(average_coords.x - 50)
				, Math.floor(average_coords.y - 25), num_successive_disappearance + "COMBO!", time_to_end_effecting
				, "#ffffff", ColorTable[num_successive_disappearance % PieceTypes.MAX]));
	},
	
	update : function(){
		this.sub_effects.forEach(function(effect){
			effect.update();
		});
	}
});

var EffectAkari = enchant.Class.create(PieceEffect, {
	initialize : function(pieces, score, num_successive_disappearance, time_to_end_effecting, average_coords){
		PieceEffect.call(this, pieces, score, num_successive_disappearance, time_to_end_effecting, average_coords
				, ColorTable[PieceTypes.AKARI]);
		
		this.sub_effects.push(new FadeInLabelEffect("large 'うずらフォント', 'MS ゴシック'", Math.floor(average_coords.x)
				, Math.floor(average_coords.y), "＼ｱｯｶﾘ~ﾝ／", time_to_end_effecting, "#ffffff", ColorTable[PieceTypes.AKARI]));
		
		this.targets.forEach(function(piece){
			piece.frame = 1;
		});
		
		sound_manager.play(sound_manager.sound_types.AKKARIN);
	},
	
	update : function(){
		this.__proto__.__proto__.update.call(this);
		
		this.targets.forEach(function(piece){
			piece.opacity -= 0.05;
		});
	}
});

var EffectAyano = enchant.Class.create(PieceEffect, {
	initialize : function(pieces, score, num_successive_disappearance, time_to_end_effecting, average_coords){
		PieceEffect.call(this, pieces, score, num_successive_disappearance, time_to_end_effecting, average_coords
				, ColorTable[PieceTypes.AYANO]);
		
		/*this.targets.forEach(function(piece){
			piece.frame = 1;
		});*/
	},
	
	update : function(){
		this.__proto__.__proto__.update.call(this);
		
		/*this.targets.forEach(function(piece){
			piece.opacity -= 0.05;
		});*/
	}
});

var EffectChinatsu = enchant.Class.create(PieceEffect, {
	initialize : function(pieces, score, num_successive_disappearance, time_to_end_effecting, average_coords){
		PieceEffect.call(this, pieces, score, num_successive_disappearance, time_to_end_effecting, average_coords
				, ColorTable[PieceTypes.CHINATSU]);
		
		/*this.targets.forEach(function(piece){
			piece.frame = 1;
		});*/
	},
	
	update : function(){
		this.__proto__.__proto__.update.call(this);
		
		/*this.targets.forEach(function(piece){
			piece.opacity -= 0.05;
		});*/
	}
});

var EffectChitose = enchant.Class.create(PieceEffect, {
	initialize : function(pieces, score, num_successive_disappearance, time_to_end_effecting, average_coords){
		PieceEffect.call(this, pieces, score, num_successive_disappearance, time_to_end_effecting, average_coords
				, ColorTable[PieceTypes.CHITOSE]);
		
		/*this.targets.forEach(function(piece){
			piece.frame = 1;
		});*/
	},
	
	update : function(){
		this.__proto__.__proto__.update.call(this);
		
		/*this.targets.forEach(function(piece){
			piece.opacity -= 0.05;
		});*/
	}
});

var EffectHimawari = enchant.Class.create(PieceEffect, {
	initialize : function(pieces, score, num_successive_disappearance, time_to_end_effecting, average_coords){
		PieceEffect.call(this, pieces, score, num_successive_disappearance, time_to_end_effecting, average_coords
				, ColorTable[PieceTypes.HIMAWARI]);
		
		/*this.targets.forEach(function(piece){
			piece.frame = 1;
		});*/
	},
	
	update : function(){
		this.__proto__.__proto__.update.call(this);
		
		/*this.targets.forEach(function(piece){
			piece.opacity -= 0.05;
		});*/
	}
});

var EffectKyoko = enchant.Class.create(PieceEffect, {
	initialize : function(pieces, score, num_successive_disappearance, time_to_end_effecting, average_coords){
		PieceEffect.call(this, pieces, score, num_successive_disappearance, time_to_end_effecting, average_coords
				, ColorTable[PieceTypes.KYOKO]);
		
		/*this.targets.forEach(function(piece){
			piece.frame = 1;
		});*/
	},
	
	update : function(){
		this.__proto__.__proto__.update.call(this);
		
		/*this.targets.forEach(function(piece){
			piece.opacity -= 0.05;
		});*/
	}
});

var EffectSakurako = enchant.Class.create(PieceEffect, {
	initialize : function(pieces, score, num_successive_disappearance, time_to_end_effecting, average_coords){
		PieceEffect.call(this, pieces, score, num_successive_disappearance, time_to_end_effecting, average_coords
				, ColorTable[PieceTypes.SAKURAKO]);
		
		/*this.targets.forEach(function(piece){
			piece.frame = 1;
		});*/
	},
	
	update : function(){
		this.__proto__.__proto__.update.call(this);
		
		/*this.targets.forEach(function(piece){
			piece.opacity -= 0.05;
		});*/
	}
});

var EffectYui = enchant.Class.create(PieceEffect, {
	initialize : function(pieces, score, num_successive_disappearance, time_to_end_effecting, average_coords){
		PieceEffect.call(this, pieces, score, num_successive_disappearance, time_to_end_effecting, average_coords
				, ColorTable[PieceTypes.YUI]);
		
		/*this.targets.forEach(function(piece){
			piece.frame = 1;
		});*/
	},
	
	update : function(){
		this.__proto__.__proto__.update.call(this);
		
		/*this.targets.forEach(function(piece){
			piece.opacity -= 0.05;
		});*/
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
		this.next_normal_state_frame = -1;							//ピースを消す処理が終わって普通の処理ルーチンに戻るフレーム数
		this.score_label = new Score();								//スコアを画面に表示するラベル
		this.num_successive_disappearance = 1;						//現在の連鎖の数
		this.effect_manager = new EffectManager();					//エフェクトマネージャー
		
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
			if(this.next_normal_state_frame != -1){
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
				var return_piece = null;
				if(piece != null){
					return_piece = createNewPiece(piece.type);
					return_piece.copyMembersFrom(piece);
					
					var before = {"x" : piece.position_in_shape.x, "y" : piece.position_in_shape.y};
					return_piece.position_in_shape.x = Math.round(before.y * 1);	//回転行列にθ=pi/2を代入したもの
					return_piece.position_in_shape.y = Math.round(-(before.x * 1));	//cos(pi/2)=0,sin(pi/2)=1となるため
					
					return_piece.convertPositionLocalToGlobal();
					
					return_piece.neighbors.swapAntiClockwise();
				}
				return return_piece;
			}, this);
			
			if(rotated_pieces.every(function(piece){
				if(piece != null){
					console.log("["+game.frame+"]");
					console.log(piece.logPosition());
					return piece.tryToMove(0, 0) && piece.tryToMove(0, 1);
				}else{
					return true;
				}
			})){
				cur_falling_pieces.pieces.forEach(function(piece){
					game.currentScene.removeChild(piece);
				});
				rotated_pieces.forEach(function(piece){
					if(piece != null){game.currentScene.addChild(piece);}
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
				var return_piece = null;
				if(piece != null){
					return_piece = createNewPiece(piece.type);
					return_piece.copyMembersFrom(piece);
					
					var before = {"x" : piece.position_in_shape.x, "y" : piece.position_in_shape.y};
					return_piece.position_in_shape.x = Math.round(-(before.y * 1));	//回転行列にθ=pi/2を代入したもの
					return_piece.position_in_shape.y = Math.round(before.x * 1);	//cos(pi/2)=0,sin(pi/2)=1となるため
					
					return_piece.convertPositionLocalToGlobal();
					return_piece.neighbors.swapClockwise();
				}
				return return_piece;
			}, this);
			
			if(rotated_pieces.every(function(piece){
				return (piece != null) ? piece.tryToMove(0, 0) && piece.tryToMove(0, 1) : true;
			})){
				cur_falling_pieces.pieces.forEach(function(piece){
					game.currentScene.removeChild(piece);
				});
				rotated_pieces.forEach(function(piece){
					if(piece != null){game.currentScene.addChild(piece);}
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
					return (piece != null) ? (piece.tryToMove(-1, 0) && piece.tryToMove(-1, 1)) : true;
				})) ? tmp_x : cur_falling_pieces.x;
			}else if(game.input.right){
				var tmp_x = cur_falling_pieces.x + size_of_block.width;
				cur_falling_pieces.x = (cur_falling_pieces.pieces.every(function(piece){
					return (piece != null) ? (piece.tryToMove(1, 0) && piece.tryToMove(1, 1)) : true;
				})) ? tmp_x : cur_falling_pieces.x;
			}else if(game.input.up){
				rotateLeft();
			}else if(game.input.down){
				rotateRight();
			}else if(game.input.a){
				this.cur_falling_pieces.pieces.sort(function(lhs, rhs){		//下側にある要素を先に調べるためにy座標の順に並べ替える
					if(lhs != null && rhs != null){
						return (lhs.position_in_shape.y > rhs.position_in_shape.y) ? -1 :
							(lhs.position_in_shape.y < rhs.position_in_shape.y) ? 1 : 0;
					}else if(rhs != null){
						return 1;
					}else if(lhs != null){
						return -1;
					}
				}).forEach(function(piece, index, array){
					if(piece != null){
						piece.landOn();
						array[index] = null;
						this.moving_pieces.push(piece);
					}
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
			if(piece != null){
				piece.convertPositionToCoordinates();
				piece.convertCoordinatesToPosition();
				piece.setCoords();
			}
		}, this);
		
		this.cur_falling_pieces.pieces.forEach(function(piece, index, array){
			if(piece != null && !piece.tryToMove(0, 1)){	//自分の下1ますが空いているかどうか確かめる
				if(piece.position.y <= 2){		//上から数えて3段目までピースがたまってしまっていたら、ゲームオーバー
					var gameover_scene = new GameOverScene((this.x + this.width) / 2, (this.y + this.height) / 2);
					game.pushScene(gameover_scene);
					return;
				}
				
				piece.position.y = Math.round(piece.position.y);
				this.setPieceToPanel(piece);	//1ピースでも落下限界に達したら他のピースも一気に落とせるところまで落とす
				if(game.is_debug){
					console.log("["+game.frame+"]"+"piece touched another one!");
					console.log(piece.logPosition());
				}
				
				this.moving_pieces.push(piece);
				array[index] = null;

				array.sort(function(lhs, rhs){		//※下側にある要素を先に調べるためｙ座標の大きい順で並べ替える
					if(lhs != null && rhs != null){
						return (lhs.position_in_shape.y > rhs.position_in_shape.y) ? -1 :
							(lhs.position_in_shape.y < rhs.position_in_shape.y) ? 1 : 0;
					}else if(rhs != null){
						return 1;
					}else if(lhs != null){
						return -1;
					}
				}).forEach(function(piece, index, array){
					if(piece != null){
						piece.landOn();
						array[index] = null;
						this.moving_pieces.push(piece);
						if(game.is_debug){console.log(piece.logPosition());}
					}
				}, this);
				
				this.is_ready_for_next_piece = true;
			}
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
				if(piece != null){
					[-1, 1, -4, 4].forEach(function(index, cur_index2){
						if(0 <= cur_index + index && cur_index + index < 8){piece.neighbors[cur_index2] = array[cur_index + index];}
					});
				}
			});
			
			this.is_ready_for_next_piece = false;
		}
	},
	
	/**
	 * パネル上から外されたピースにエフェクトをかけるなどの処理を行う
	 */
	updateDisappearingPieces : function(){
		if(game.frame > this.next_normal_state_frame){		//エフェクトをかけおわるフレームになったので、その後処理をする
			this.disappearing_pieces.forEach(function(piece){
				this.removePiece(piece);
				if(game.is_debug){console.log("the piece at"+piece.logPosition()+"is going to disappear.");}
				game.currentScene.removeChild(piece);
			}, this);
			
			this.moving_pieces.forEach(function(piece){		//動くピースリストに追加されたピースを着地させる
				this.removePiece(piece);
				if(game.is_debug){
					console.log("the piece at"+piece.logPosition()+"is moving to");
				}
				piece.landOn();
				if(game.is_debug){
					console.log(piece.logPosition()+".");
				}
			}, this);
			
			this.disappearing_pieces.splice(0);
			this.next_normal_state_frame = -1;
			this.is_ready_for_next_piece = true;
		}else{
			this.effect_manager.update();
		}
	},
	
	/**
	 * パネル内から消せるピースを探して得点を追加する
	 */
	makePiecesDisappear : function(){
		var start_searching_pieces = new Array();			//探索の起点とするピースたち
		this.moving_pieces.forEach(function(piece, i, array){			//動いてきたピースに周りのピースへの参照を持たせる
			this.addNeighborsReference(piece);
			start_searching_pieces.push(piece);
			piece.neighbors.forEach(function(neighbor){		//動いてきたピースの周りにいるピースにも再度参照を追加する
				if(neighbor != null){
					this.addNeighborsReference(neighbor);
					
					var index2 = start_searching_pieces.indexOf(neighbor), index3 = array.indexOf(neighbor);
					if(index2 == -1 && index3 == -1){start_searching_pieces.push(neighbor);}	//動いてきたピースの３つ隣のピースまで探索の起点にする
					
					neighbor.neighbors.forEach(function(w_neighbor){
						if(w_neighbor != null){
							this.addNeighborsReference(w_neighbor);
							
							var index = start_searching_pieces.indexOf(w_neighbor), index2 = array.indexOf(w_neighbor);
							if(index == -1 && index2 == -1){start_searching_pieces.push(w_neighbor);}
							w_neighbor.neighbors.forEach(function(t_neighbor){
								if(t_neighbor != null){
									var index = start_searching_pieces.indexOf(t_neighbor), index2 = array.indexOf(t_neighbor);
									if(index == -1 && index2 == -1){start_searching_pieces.push(t_neighbor);}
								}
							});
						}
					}, this);
				}
			}, this);
		}, this);
		
		this.pieces.forEach(function(piece){
			if(piece != null){piece.neighbors_buffer = piece.neighbors.slice(0);}
		});
		
		start_searching_pieces.forEach(function(piece){		//同じ種類のピースの塊を探す
			var group = new Array();
			piece.searchForSameTypeOfPiece(group);
			
			if(group.length >= 3){this.candidates_for_disappearing_pieces.push(group);}
		}, this);
		this.moving_pieces.splice(0);
		
		var pieces_searching_for_couple = new Array(), couple_indices = new Array(), prev_score = this.score_label.getScore();
		this.candidates_for_disappearing_pieces.sort(function(lhs, rhs){	//同一種のグループを優先して探せるように並べ替えを行う
			return (lhs.length > rhs.length) ? 1 :
				(lhs.length == rhs.length) ? 0 : -1;
		}).forEach(function(group, index){
			if(group.length >= 4){		//4個以上は同一種からのみなるグループを探す
				group.sort(function(lhs, rhs){		//下にあるピースから調べるために並べ替えを行う
					return (lhs.position.y > rhs.position.y) ? -1 :
						(lhs.position.y < rhs.position.y) ? 1 : 0;
				}).forEach(function(piece, i, array){
					this.disappearing_pieces.push(piece);
					
					for(var upper = piece.neighbors[2];; upper = upper.neighbors[2]){
						if(upper == null){break;}
						
						var index = array.indexOf(upper);		//自分の上にいるピースの中で消えてしまうもの以外をこれから動くピースリストに追加する
						var index2 = this.moving_pieces.indexOf(upper);	//同時に2カ所以上で消えるピースが出てくる可能性があるため
						if(index == -1 && index2 == -1){
							this.moving_pieces.push(upper);
							console.log("the piece at"+upper.logPosition()+"is going to move.");
						}else{
							break;
						}
					}
				}, this);
				
				var score_diff = 100 * Math.pow(2, this.num_successive_disappearance) * group.length;
				this.score_label.addScore(score_diff);	//スコアを追加する
				this.effect_manager.addEffect(this.createNewEffect(group.slice(0), score_diff, group[0].type));
				if(game.is_debug){console.log("score added! "+score_diff+"points added!");}
				sound_manager.play(this.num_successive_disappearance % PieceTypes.MAX - 1);
				this.next_normal_state_frame = game.frame + 30;
			}else if(group.length >= 3){		//3個の場合はカップリングを探す
				group.forEach(function(piece){
					pieces_searching_for_couple.push(piece);		//カップリングを探すピース
					couple_indices.push(index);						//上記のピースが所属するグループ番号
				});
			}
		}, this);
		
		var candidates = this.candidates_for_disappearing_pieces;
		pieces_searching_for_couple.forEach(function(piece_info, i, couples_array){
			if(this.disappearing_pieces.indexOf(piece_info) != -1){return;}
			
			piece_info.neighbors.forEach(function(neighbor){
				if(neighbor == null){return;}
				var index0 = couples_array.indexOf(neighbor);	//pieceの周りにカップリングを探しているピースがいないか調べる
				if(index0 != -1 && couple_indices[i] != couple_indices[index0] 	//同じグループに存在しておらず、グループのピース数が同じ
				&& candidates[couple_indices[i]].length == candidates[couple_indices[index0]].length){
					var target_index = couple_indices[index0];
					var disappearing_pieces = candidates[couple_indices[i]].concat(candidates[couple_indices[index0]]);
					disappearing_pieces.sort(function(lhs, rhs){			//下にあるピースから調べるために並べ替える
						return (lhs.position.y > rhs.position.y) ? -1 :
							(lhs.position.y < rhs.position.y) ? 1 : 0;
					}).forEach(function(piece, i, array){
						this.disappearing_pieces.push(piece);
						
						for(var upper = piece.neighbors[2];; upper = upper.neighbors[2]){
							if(upper == null){break;}
							
							var index = array.indexOf(upper);		//自分の上にいるピースの中で消えてしまうもの以外をこれから動くピースリストに追加する
							var index2 = this.moving_pieces.indexOf(upper);	//同時に2カ所以上で消えるピースが出てくる可能性があるため
							if(index == -1 && index2 == -1){
								this.moving_pieces.push(upper);
								console.log("the piece at"+upper.logPosition()+"is going to move.");
							}else{
								break;
							}
						}
					}, this);
					
					var score_diff = Math.floor(75 * Math.pow(1.5, this.num_successive_disappearance) * disappearing_pieces.length);
					this.score_label.addScore(score_diff);		//スコアを追加する
					this.effect_manager.addEffect(this.createNewEffect(candidates[couple_indices[i]].slice(0), score_diff / 2,
							piece_info.type));	//それぞれのグループのピースの種類に対応するエフェクトを追加する
					this.effect_manager.addEffect(this.createNewEffect(candidates[target_index].slice(0), score_diff / 2,
							neighbor.type));
					if(game.is_debug){console.log("score added! "+score_diff+"points added!");}
					sound_manager.play(this.num_successive_disappearance % 8 - 1);
					this.next_normal_state_frame = game.frame + 30;
				}
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
		var shape_type = Math.floor(Math.random() * this.shapes.shapes.length);
		this.next_appearing_pieces.pieces = this.shapes.shapes[shape_type].map(function(piece, cur_index){
			var return_piece = null;
			if(piece != null){
				return_piece = this.createNewPiece(Math.floor(Math.random() * PieceTypes.MAX));
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
	
	createNewEffect : function(group, score, type){
		var coordinates = {"x" : 0, "y" : 0};
		group.forEach(function(piece){
			coordinates.x += piece.real_coords.x;
			coordinates.y += piece.real_coords.y;
		})
		coordinates.x /= group.length;
		coordinates.y /= group.length;
		
		with(this){
			switch(type){
			case PieceTypes.AKARI : 
				return new EffectAkari(group, score, num_successive_disappearance, game.frame + 30, coordinates);
				break;
				
			case PieceTypes.AYANO : 
				return new EffectAyano(group, score, num_successive_disappearance, game.frame + 30, coordinates);
				break;
				
			case PieceTypes.CHINATSU : 
				return new EffectChinatsu(group, score, num_successive_disappearance, game.frame + 30, coordinates);
				break;
				
			case PieceTypes.CHITOSE : 
				return new EffectChitose(group, score, num_successive_disappearance, game.frame + 30, coordinates);
				break;
				
			case PieceTypes.HIMAWARI : 
				return new EffectHimawari(group, score, num_successive_disappearance, game.frame + 30, coordinates);
				break;
				
			case PieceTypes.KYOKO : 
				return new EffectKyoko(group, score, num_successive_disappearance, game.frame + 30, coordinates);
				break;
				
			case PieceTypes.SAKURAKO : 
				return new EffectSakurako(group, score, num_successive_disappearance, game.frame + 30, coordinates);
				break;
				
			case PieceTypes.YUI : 
				return new EffectYui(group, score, num_successive_disappearance, game.frame + 30, coordinates);
				break;
			}
		}
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
});

var Stage = enchant.Class.create(enchant.Scene, {
	initialize : function(){
		enchant.Scene.call(this);
		
		var panel = new Panel(32 * NUM_HORIZONTAL_BLOCKS, 32 * NUM_VERTICAL_BLOCKS, game.width * 1 / 3, 80);
		panel.setNextAppearingPieces();
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
		
		var prev_touched_pos = {"x" : 0, "y" : 0}, touched = false, prev_touched_frame = 0;
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
				if(pos_diff.x >= 10){
					game.input["right"] = true;
				}else if(pos_diff.x <= -10){
					game.input["left"] = true;
				}else if(e.x >= player_pieces.x + player_pieces.width / 2 && pos_diff.y >= 10 
						|| e.x <= player_pieces.x + player_pieces.width / 2 && pos_diff.y <= -10){
					game.input["down"] = true;
				}else if(e.x >= player_pieces.x + player_pieces.width / 2 && pos_diff.y <= -10 
						|| e.x <= player_pieces.x + player_pieces.width / 2 && pos_diff.y >= 10){
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
	game = new enchant.Game(480, 720);
	game.fps = 30;
	game.preload(['images/piece_akari.png', 'images/piece_ayano.png', 'images/piece_chinatsu.png', 'images/piece_chitose.png',
	              'images/piece_himawari.png', 'images/piece_kyoko.png', 'images/piece_sakurako.png', 'images/piece_yui.png']);
	game.is_debug = true;
	game.onload = function(){
		sound_manager = new SoundManager();
		var stage = new Stage();
		game.pushScene(stage);
	};
	
	game.keybind(32, 'a');
	game.keybind(80, 'b');
	game.start();
};
