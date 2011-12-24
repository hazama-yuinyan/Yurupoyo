package yurupoyo;

import javax.jdo.JDOHelper;
import javax.jdo.PersistenceManagerFactory;

public class PMF {
	private static final PersistenceManagerFactory instance = JDOHelper.getPersistenceManagerFactory("transactions-optional");
	
	private PMF(){};
	
	public static PersistenceManagerFactory get(){
		return instance;
	}
}
