package yurupoyo;

import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.Class;
import java.lang.reflect.Member;

import net.arnx.jsonic.JSON;
import net.arnx.jsonic.JSONException;
import net.arnx.jsonic.NamingStyle;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.jdo.Transaction;
import javax.servlet.http.*;

@SuppressWarnings("serial")
public class YurupoyoGAEServlet extends HttpServlet {
	private static final Logger log = Logger.getLogger(YurupoyoGAEServlet.class.getName());
	
	@SuppressWarnings("unchecked")
	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		JSON json = new JSON(){
			protected boolean ignore(Context context, Class c, Member m){
				return(super.ignore(context, c, m) || c.getSimpleName().equals("RankingData") && m.getName().equals("getKey"));
			}
		};
		json.setPropertyStyle(NamingStyle.LOWER_UNDERSCORE);
		String header = req.getHeader("Content-Type");
		if(!header.equals("application/json; charset=UTF-8")){
			resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}
		
		BufferedReader br = req.getReader();
		PrintWriter pw = null;
		List<RankingData> ranking = null;
		
		try{	
			String json_str = br.readLine();
			RankingData new_data = json.parse(json_str, RankingData.class);
			
			PersistenceManager pm = PMF.get().getPersistenceManager();
			String query_str = new String("select from " + RankingData.class.getName() + " order by score desc, key desc");
			String ranking_str = new String();
			Query query = pm.newQuery(query_str);
			Transaction tx = pm.currentTransaction();
			try{
				ranking = (List<RankingData>)query.execute();
				if(ranking.isEmpty()){		//ランキングの初期化処理
					query.closeAll();
					initializeDataStore();
					pm.refreshAll();
					query = pm.newQuery(query_str);
					ranking = (List<RankingData>)query.execute();
				}
				
				boolean should_add = false;
				List<RankingData> encoding_list = ranking.subList(0, ranking.size() - 1);	//データベースから返ってきたリストからあらかじめ最後の要素を削除しておく
				ListIterator<RankingData> encoding_itr = encoding_list.listIterator();
				for(RankingData data : ranking){	//データベース内のすべてのスコアと新しいスコアを比較して新しいデータを追加すべきかどうか調べる
					if(new_data.getScore() >= data.getScore()){
						should_add = true;
						encoding_itr.add(new_data);		//新しいデータを挿入する
						break;
					}
					if(encoding_itr.hasNext()){
						encoding_itr.next();
					}
				}
				
				if(should_add){		//新しいデータを追加すべきなら、データを追加して一番最後のデータをデータベースから削除する
					tx.begin();
					new_data.setKey(KeyBuilderManager.instance().getNextKey());
					RankingData last_data = (RankingData) pm.getObjectById(RankingData.class, ranking.get(ranking.size() - 1).getKey());		//最後の要素をデータベースから削除する
					pm.deletePersistent(last_data);
					pm.makePersistent(new_data);
					ranking_str = json.format(encoding_list);
					tx.commit();
				}else{
					ranking_str = json.format(ranking);
				}
			}catch(Exception e){
				resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "something wrong has happened when it tries to read or write some data to the data store");
			}finally{
				if(tx.isActive()){
					tx.rollback();
				}
				query.closeAll();
				pm.close();
			}
			
			resp.setContentType("application/json; charset=UTF-8");
			pw = resp.getWriter();
			pw.print(ranking_str);
			
		}catch(IOException e){
			log.log(Level.SEVERE, "an IO error occurred");
			resp.sendError(HttpServletResponse.SC_ACCEPTED, "something wrong has happened when it tries to write or read some data.");
		}catch(JSONException e){
			log.log(Level.SEVERE, "a JSON parse error occurred at " + e.getLineNumber() + ", " + e.getColumnNumber() + " : " + e.getMessage());
			resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "failed to parse JSON.");
		}finally{
			br.close();
			if(pw != null){
				pw.close();
			}
		}
	}
	
	private void initializeDataStore(){
		ArrayList<RankingData> initial_ranking = new ArrayList<RankingData>(50);
		String[] names = {"あかり", "綾乃", "ちなつ", "千歳", "向日葵", "京子", "櫻子", "結衣", "test"};
		PersistenceManager pm = PMF.get().getPersistenceManager();
		Transaction tx = pm.currentTransaction();
		try{
			tx.begin();
			
			for(int i = 0; i < 50; ++i){
				RankingData data = new RankingData(names[i % names.length], 1000, false, KeyBuilderManager.instance().getNextKey());
				initial_ranking.add(data);
			}
	
			pm.makePersistentAll(initial_ranking);
			tx.commit();
		}finally{
			if(tx.isActive()){
				tx.rollback();
			}
			pm.close();
		}
	}
}
