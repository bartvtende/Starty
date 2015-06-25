package starty.gen.api.dao;

import java.util.ArrayList;
import java.util.Map;

import starty.gen.api.controller.ProjectController;
import starty.gen.api.model.Projects;
import starty.gen.api.model.Sprint;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;

/**
 * database access object focused on sprints 
 * @author Henderikus Harms
 * @date 23 jun. 2015
 */
public class SprintsDao extends MongoDao {
	private ProjectController projectController;
	
	/**
	 * instantiate projectcontroller and calanderparser 
	 */
	public SprintsDao(){
		super("sprints");
		this.projectController = new ProjectController();
	}
	
	/**
	 * build query findById and invoke execute query
	 * @param id
	 * @return sprint
	 */
	public Sprint findSprindById(String id){
		BasicDBObject query = new BasicDBObject();
			query.put("_id", id);
		Sprint sprint = this.getFirstElement(this.executeQuery(query));
		return sprint;
	}
	
	/**
	 * build query findByStartAt and invoke execute query
	 * @param startAt
	 * @return Sprint
	 */
	public Sprint findSprintByStart(String startAt){
		BasicDBObject query = new BasicDBObject();
			query.put("startAt", startAt);
		return this.getFirstElement(this.executeQuery(query));
	}
	
	/**
	 * execute query
	 * @param query
	 * @return sprint
	 */
	@Override
	protected ArrayList<Object> executeQuery(BasicDBObject query){
		DBCursor cursor = this.getCollection("sprints").find(query);
		ArrayList<Object> sprints = new ArrayList<Object>();
		try{
			while(cursor.hasNext()){
				DBObject object = cursor.next();
				Sprint sprint = (Sprint) this.parse(object);
				sprints.add(sprint);
			}
		}finally{
			cursor.close();
		}
		return sprints;
	}
	
	/**
	 * parse dbobject to Sprint object 
	 * @param obj
	 * @return sprint
	 */
	@SuppressWarnings("rawtypes")
	@Override
	protected Object parse(DBObject obj){
		Sprint sprint = new Sprint();
		Map map = obj.toMap();
		Projects p = this.projectController.retreiveProjectById(Integer.parseInt(map.get("projectid").toString()));
		if(map.size() > 0 && p != null){
			sprint.setId(map.get("_id").toString());
			sprint.setProject(p);
			sprint.setName(map.get("name").toString());
			sprint.setStartAt(super.getCalendarParser().parseStringToCalendar(map.get("startAt").toString()));
			sprint.setEndAt(super.getCalendarParser().parseStringToCalendar(map.get("endAt").toString()));
		}
		return sprint;
	}
	
	/**
	 * Get first element from ArrayList
	 * @param lists
	 * @return sprint
	 */
	private Sprint getFirstElement(ArrayList<Object> lists){
		Sprint sprint = new Sprint();
		if(lists.size() == 1){
			sprint = (Sprint) lists.get(0);
		}
		return sprint;
	}
	
}
