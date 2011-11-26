/**
 * ゆるゆり＋ぷよぷよ風のゲーム
 */



enchant();

const NUM_VERTICAL_BLOCKS = 20;
const NUM_HORIZONTAL_BLOCKS = 10;
var PieceTypes = {"AKARI" : 0, "AYANO" : 1, "CHINATSU" : 2, "CHITOSE" : 3, "HIMAWARI" : 4, "KYOKO" : 5, "SAKURAKO" : 6, "YUI" : 7, "MAX" : 8};

/**
 * 四捨五入する関数
 */
Math.round = function(number){
	return Math.floor(number + 0.5);
}

var GameOverScene = enchant.Class.create(enchant.Scene, {
	initialize : function(x, y){
		enchant.Scene.call(this);
		
		var gameover_label = new enchant.Label("GAME OVER");
		gameover_label.font = "bold xx-large 'うずらフォント','MS ゴシック'";
		gameover_label.x = x;
		gameover_label.y = y;
		gameover_label.backgroundColor = "#ffffff";
		gameover_label.color = "#ff1512";
		this.addChild(gameover_label);
		this.addEventListener('enterframe', function(){
			if(game.input.a){
				var stage = new Stage();
				game.popScene();
				game.popScene();
				game.pushScene(stage);
				//game.start();
			}
		});
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
		this.next_label.width = width - 35;
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
		this.neighbors = [null, null, null, null];	//自分の周りにいるピースへの参照:[Left, Up, Right, Down]の順番
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
	
	/**
	 * 一気に着地するまでピースを下に移動させる
	 */
	landOn : function(index, array){
		this.position.y = Math.round(this.position.y);
		for(var i = 1; this.tryToMove(0, i); ++i) ;
		this.position.y += (i - 1);
		this.panel.setPieceToPanel(this);
		this.real_coords.y = this.panel.coordsAt('y', this.position.y);
		this.convertCoordinatesToPosition();
		this.setCoords();
		array[index] = null;
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
	}
});

var Panel = enchant.Class.create(enchant.Sprite, {
	initialize : function(width, height, x, y){
		enchant.Sprite.call(this, width, height);
		
		this.x = x;
		this.y = y;
		this.pieces = new Array(NUM_VERTICAL_BLOCKS * NUM_HORIZONTAL_BLOCKS);	//メインの格子状のエリアに配置されている全ピース
		this.pieces.forEach(function(obj){obj = null;});
		this.next_a_button_acceptable_frame = 0;	//次にＡボタン（スペース）を押されたときに反応するフレーム数
		this.moving_pieces = {"pieces" : new Array(NUM_VERTICAL_BLOCKS * NUM_HORIZONTAL_BLOCKS), "next_index" : 0};	//移動したピース
		this.moving_pieces.pieces.forEach(function(obj){obj = null;});
		this.is_ready_for_next_piece = true;	//次のピースを出現させるかどうか	
		this.pieces_moving_rate = 30;	//現在のピースが1ます分落下する頻度
		this.cur_falling_pieces = {"pieces" : null, "width" : 0, "height" : 0, "x" : 0, "y" : 0, "v_y" : 0.0};	//現在プレイヤーが操作しているシェイプの情報
		this.size_of_block = {"width" : 32, "height" : 32};						//1ますのサイズ
		this.next_appearing_pieces = {"pieces" : null, "width" : 0, "height" : 0};		//次に出現するシェイプのピースたち
		this.next_piece_label = new NextPieceLabel(0, this.y, this.x, this.height);
		
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
			this.tryToCreatePieces();
			this.updatePlayerInput();
			this.updatePieces();
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
				}
				return return_piece;
			}, this);
			
			if(rotated_pieces.every(function(piece){
				if(piece != null){
					console.log("["+game.frame+"]");
					console.log("("+piece.position.x+", "+piece.position.y+")");
					return piece.tryToMove(0, 0);
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
				}
				return return_piece;
			}, this);
			
			if(rotated_pieces.every(function(piece){
				return (piece != null) ? piece.tryToMove(0, 0) : true;
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
			}else if(game.input.a && game.frame >= this.next_a_button_acceptable_frame){
				this.cur_falling_pieces.pieces.reverse().forEach(function(piece, index, array){
					if(piece != null){piece.landOn(index, array);}
				});
				
				this.is_ready_for_next_piece = true;
				this.next_a_button_acceptable_frame = game.frame + 10;
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
					//game.pause();
					return;
				}
				piece.position.y = Math.round(piece.position.y);
				this.setPieceToPanel(piece);	//1ピースでも落下限界に達したら他のピースも一気に落とせるところまで落とす
				if(game.is_debug){
					console.log("["+game.frame+"]"+"piece touched something!");
					console.log("("+piece.position.x+", "+piece.position.y+")");
				}
				array[index] = null;
				array.reverse().forEach(function(piece, index, array){
					if(piece != null){
						piece.landOn(index, array);
						if(game.is_debug){console.log("("+piece.position.x+", "+piece.position.y+")");}
					}
				});		//※下の要素を先に調べるため逆順に並べ替えてから調べている
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
			this.cur_falling_pieces.pieces = this.next_appearing_pieces.pieces;
			this.cur_falling_pieces.pieces.forEach(function(piece){
				if(piece != null){game.currentScene.addChild(piece);}
			});
			this.cur_falling_pieces.x = this.x + this.size_of_block.width * 5;
			this.cur_falling_pieces.y = this.y;
			this.cur_falling_pieces.v_y = this.size_of_block.height / this.pieces_moving_rate;
			this.cur_falling_pieces.width = this.next_appearing_pieces.width;
			this.cur_falling_pieces.height = this.next_appearing_pieces.height;
			
			//乱数をつかって次のピースの形を決め、初期位置を設定しておく
			this.setNextAppearingPieces();
			var next_pieces = this.next_appearing_pieces.pieces.map(function(piece){
				return (piece != null) ? this.createNewPiece(piece.type) : null;
			}, this);
			this.next_piece_label.setPieces(next_pieces, this.size_of_block);	//次に出現するピース欄に次のピースのコピーを渡す
			
			//個々のピースに隣接したピースの参照を持たせる
			this.cur_falling_pieces.pieces.forEach(function(piece, cur_index, array){
				if(piece != null){
					var search_index = [-1, -4, 1, 4];
					search_index.forEach(function(index, cur_index2){
						if(0 <= cur_index + index && cur_index + index < 8){piece.neighbors[cur_index2] = array[cur_index + index];}
					});
				}
			});
			
			this.is_ready_for_next_piece = false;
		}
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
		return (this.pieces[NUM_HORIZONTAL_BLOCKS * y + x] != null);
	},
	
	/**
	 * 引数のピースをパネル上に固定する
	 */
	setPieceToPanel : function(piece){
		this.pieces[NUM_HORIZONTAL_BLOCKS * Math.floor(piece.position.y) + Math.floor(piece.position.x)] = piece;
	},
	
	/**
	 * 移動するピースリストに引数のピースを追加する
	 */
	pushToMovingPieces : function(piece){
		with(this.moving_pieces){
			pieces[next_index] = piece;
			++next_index;
		}
	},
	
	/**
	 * 移動するピースリストから引数のピースを取り除く
	 */
	popFromMovingPieces : function(target_piece){
		this.moving_pieces.pieces.forEach(function(piece, cur_index, array){
			if(piece == target_piece){array[cur_index] = null;}
		});
	},
	
	/**
	 * 次に移動するピースリストに追加する位置をリセットする
	 */
	resetNextIndex : function(){
		this.moving_pieces.next_index = 0;
	}
});

var Stage = enchant.Class.create(enchant.Scene, {
	initialize : function(){
		enchant.Scene.call(this);
		
		var panel = new Panel(32 * NUM_HORIZONTAL_BLOCKS, 32 * NUM_VERTICAL_BLOCKS, game.width * 1 / 3, 80);
		panel.setNextAppearingPieces();
		var panel_background = new enchant.Surface(panel.width, panel.height);
		var ctx = panel_background.context;
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
		this.addChild(panel);
		
		var score_label = new enchant.Label("SCORE:0");
		score_label.score = 0;
		score_label.x = 0;
		score_label.y = 0;
		score_label.font = "bold xx-large 'うずらフォント','MS ゴシック'";
		score_label.backgroundColor = "#ffffff";
		score_label.color = "#ff1512";
		this.addChild(score_label);
		
		this.backgroundColor = "#ffffff";
		
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
	}
});

window.onload = function(){
	game = new enchant.Game(480, 720);
	game.fps = 30;
	game.preload(['images/piece_akari.png', 'images/piece_ayano.png', 'images/piece_chinatsu.png', 'images/piece_chitose.png',
	              'images/piece_himawari.png', 'images/piece_kyoko.png', 'images/piece_sakurako.png', 'images/piece_yui.png']);
	game.is_debug = true;
	game.onload = function(){
		var stage = new Stage();
		game.pushScene(stage);
	};
	
	game.keybind(32, 'a');
	game.start();
};
