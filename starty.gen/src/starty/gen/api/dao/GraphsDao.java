package starty.gen.api.dao;

import java.util.ArrayList;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;

/**
 * All db actions special for graphs 
 * @author Henderikus Harms
 * @date 21 jun. 2015
 */
public class GraphsDao extends MongoDao {
	
	public GraphsDao(){
		super("graphs");
	}

	@Override
	protected ArrayList<Object> executeQuery(BasicDBObject query) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	protected Object parse(DBObject obj) {
		// TODO Auto-generated method stub
		return null;
	}
	
}
