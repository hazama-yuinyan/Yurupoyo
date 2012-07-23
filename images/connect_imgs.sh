#!/bin/bash

if [ $1 = "-h" ] ; then
	cat <<-__EOF__;
Usage: ./connect_imgs.sh [target_names]

このシェルスクリプトは個別に描いた画像を結合するためのものです。
必ず画像を変更したらこのスクリプトを実行してください。
なお、背景の透過処理は自動では行いませんので、GIMP等を使用して手動で(r,g,b)=(235,235,235)の色を透過色にしてください。

コマンドラインの引数にターゲットとなるキャラ名を入力することでそのキャラの画像のみ結合処理を行うことができます。
ちなみに、引数を省略した場合には全員の結合処理を行います。
__EOF__

exit 1
fi

if [ $# -eq 0 ]; then
    targets=(akari ayano chinatsu chitose himawari kyoko sakurako yui)
else
    i=0
    while [ "$1" != "" ] ; do
	targets[$i]=$1
	shift 1
	i=`expr $i + 1`
    done
fi

for name in ${targets[@]} ; do
    echo "processing " $name
    case $name in
	"akari")
	    arg="piece_akari_o.png piece_akari_c_t_r.png piece_akari_c_t_l.png piece_akari_c_t_lr.png piece_akari_t.png piece_akari_confused.png piece_akari_crying.png piece_akari_shocked.png piece_akari_fs.png piece_akari_b.png piece_akari_p.png piece_akari_smiling.png"
	    ;;
	"ayano")
	    arg="piece_ayano_o.png piece_ayano_c_t_r.png piece_ayano_c_t_l.png piece_ayano_c_t_lr.png piece_ayano_e.png piece_ayano_a.png piece_ayano_r.png piece_ayano_f.png"
	    ;;
	"chinatsu")
	    arg="piece_chinatsu_o.png piece_chinatsu_c_t_r.png piece_chinatsu_c_t_l.png piece_chinatsu_c_t_lr.png piece_chinatsu_h.png piece_chinatsu_e.png piece_chinatsu_s.png piece_chinatsu_a.png piece_chinatsu_d.png piece_chinatsu_t.png piece_chinatsu_r.png"
	    ;;
	"chitose")
	    arg="piece_chitose_o.png piece_chitose_c_t_r.png piece_chitose_c_t_l.png piece_chitose_c_t_lr.png piece_chitose_g.png piece_chitose_s.png"
	    ;;
	"himawari")
	    arg="piece_himawari_o.png piece_himawari_c_t_r.png piece_himawari_c_t_l.png piece_himawari_c_t_lr.png piece_himawari_a.png piece_himawari_disgusted.png piece_himawari_doubting.png"
	    ;;
	"kyoko")
	    arg="piece_kyoko_o.png piece_kyoko_c_t_r.png piece_kyoko_c_t_l.png piece_kyoko_c_t_lr.png piece_kyoko_c.png piece_kyoko_scared.png piece_kyoko_smiling.png piece_kyoko_a.png piece_kyoko_t.png piece_kyoko_w_t_k.png piece_kyoko_w.png"
	    ;;
	"sakurako")
	    arg="piece_sakurako_o.png piece_sakurako_c_t_r.png piece_sakurako_c_t_l.png piece_sakurako_c_t_lr.png piece_sakurako_a.png piece_sakurako_t.png piece_sakurako_e.png"
	    ;;
	"yui")
	    arg="piece_yui_o.png piece_yui_c_t_r.png piece_yui_c_t_l.png piece_yui_c_t_lr.png piece_yui_a.png piece_yui_c.png piece_yui_bs.png piece_yui_s.png piece_yui_s_d.png"
	    ;;
	*)
	    echo "Unknown name!"
	    exit 1
    esac
    output_name=`echo "piece_"$name".png"`
    echo "output file name : "$output_name
    if [ -f $output_name ]; then
	echo "a file named "$output_name" found. So remove that file first."
	rm $output_name
    fi
    ./ImageConnector -o png -n $output_name $arg
done

exit $?
