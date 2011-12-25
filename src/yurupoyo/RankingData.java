package yurupoyo;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import com.google.appengine.api.datastore.Key;


@PersistenceCapable
public class RankingData {
	@PrimaryKey
	@Persistent
	private Key key;
	
	@Persistent
	private String user_name;
	
	@Persistent
	private int score;
	
	public RankingData(String UserName, int Score){
		user_name = UserName;
		score = Score;
	}
	
	public RankingData(String UserName, int Score, Key key){
		user_name = UserName;
		score = Score;
		this.key = key;
	}
	
	public void setKey(Key key){
		this.key = key;
	}
	
	public Key getKey(){
		return key;
	}
	
	public String getUserName(){
		return user_name;
	}
	
	public int getScore(){
		return score;
	}
	
	public void setUserName(String UserName){
		user_name = UserName;
	}
	
	public void setScore(int Score){
		score = Score;
	}
}
