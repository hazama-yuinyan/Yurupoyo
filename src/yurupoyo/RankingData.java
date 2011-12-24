package yurupoyo;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import com.google.appengine.api.datastore.Key;


@PersistenceCapable
public class RankingData {
	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	private Key key;
	
	@Persistent
	private String user_name;
	
	@Persistent
	private int score;
	
	public RankingData(String UserName, int Score){
		this.user_name = UserName;
		this.score = Score;
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
