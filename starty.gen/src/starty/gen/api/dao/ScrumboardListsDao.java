package starty.gen.api.dao;

import java.util.ArrayList;
import java.util.Map;

import starty.gen.api.model.ScrumboardList;
import starty.gen.api.model.Sprint;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;

/**
 * Database acessObject to ensures access to db for scrumboardlists
 * @author Henderikus Harms
 * @date 22 jun. 2015
 */
public class ScrumboardListsDao extends MongoDao {
	private Sprint sprint;
	
	/**
	 * construtor
	 */
	public ScrumboardListsDao(){
		super("scrumboard_lists");
	}
	
	/**
	 * find lists by sprintid 
	 * @param sprint
	 * @return ArrayList<Object>
	 */
	public ArrayList<Object> findListsBySprint(Sprint sprint){
		this.sprint = sprint;
		BasicDBObject query = new BasicDBObject();
			query.put("sprintid", sprint.getId());
		return this.executeQuery(query);
	}
	
	/**
	 * execut the query and get the data
	 * @return ArrayList<Object
	 */
	@Override
	protected ArrayList<Object> executeQuery(BasicDBObject query) {
		DBCursor cursor = this.getCollection("scrumboard_lists").find(query);
		ArrayList<Object> lists = new ArrayList<Object>();
		try{
			while(cursor.hasNext()){
				DBObject object = cursor.next();
				ScrumboardList list = (ScrumboardList) this.parse(object);
				lists.add(list);
			}
		}finally{
			cursor.close();
		}
		if(lists.size() == 0){
			System.out.println("ScrumboardList 404");
		}
		return lists;
	}

	/**
	 * parse DBObject to list
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	@Override
	protected Object parse(DBObject obj) {
		ScrumboardList list = new ScrumboardList();
		Map map = obj.toMap();
		if(map.size() > 0 && this.sprint != null){
			list.setId(map.get("_id").toString());
			list.setSprint(this.sprint);
			list.setName(map.get("name").toString());
			list.setCreatedAt(super.getCalendarParser().parseStringToCalendar(map.get("createdAt").toString()));
			list.setUpdatedAt(super.getCalendarParser().parseStringToCalendar(map.get("updatedAt").toString()));
			list.setCompleted(Boolean.parseBoolean(map.get("completed").toString()));
		}
		return list;
	}
}
