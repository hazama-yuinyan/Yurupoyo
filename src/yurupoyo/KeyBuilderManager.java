package yurupoyo;

import java.util.List;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.KeyFactory.Builder;

public class KeyBuilderManager {
	private static final Builder builder = new Builder(KeyFactory.createKey("Ranking", 1));
	private static KeyBuilderManager inst = null;
	private long id = 1;
	
	@SuppressWarnings("unchecked")
	private KeyBuilderManager(){	//コンストラクタ内でデータベースから最新のIDを取得してくる
		PersistenceManager pm = PMF.get().getPersistenceManager();
		String query_str = new String("select key from " + RankingData.class.getName() + " order by key desc");
		Query query = pm.newQuery(query_str);
		List<Key> keys = (List<Key>)query.execute();
		if(!keys.isEmpty()){
			id = keys.get(0).getId() + 1;
		}
		query.closeAll();
	}
	
	public static KeyBuilderManager instance(){
		if(inst == null){
			inst = new KeyBuilderManager();
		}
		
		return inst;
	}
	
	public Key getNextKey(){
		return KeyFactory.createKey(builder.getKey(), "RankingData", id++);
	}
}
