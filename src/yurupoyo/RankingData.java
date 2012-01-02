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
	
	@Persistent
	private boolean is_survival = false;
	
	public RankingData(String UserName, int Score, Key key){
		user_name = UserName;
		score = Score;
		this.key = key;
	}
	
	public RankingData(String UserName, int Score, boolean IsSurvival){
		user_name = UserName;
		score = Score;
		is_survival = IsSurvival;
	}
	
	public RankingData(String UserName, int Score, boolean IsSurvival, Key key){
		user_name = UserName;
		score = Score;
		is_survival = IsSurvival;
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
	
	public boolean isSurvival(){
		return is_survival;
	}
	
	public void setUserName(String UserName){
		user_name = UserName;
	}
	
	public void setScore(int Score){
		score = Score;
	}
	
	public void setSurvival(boolean IsSurvival){
		is_survival = IsSurvival;
	}
}
