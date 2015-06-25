package starty.gen.api.dao;

import java.util.ArrayList;
import java.util.Map;

import starty.gen.api.model.ScrumboardItem;
import starty.gen.api.model.ScrumboardList;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;

/**
 * Database access object for all scrumboarditems
 * @author Henderikus Harms
 * @date 22 jun. 2015
 */
public class ScrumboardItemsDao extends MongoDao {
	private ScrumboardList list;
	
	/**
	 * constructor
	 */
	public ScrumboardItemsDao(){
		super("scrumboard_Items");
	}
	
	/**
	 * get items by on list
	 * @param list
	 * @return ArrayList<Object> items
	 */
	public ArrayList<Object> getItemsbyListId(ScrumboardList list){
		this.list = list;
		BasicDBObject query = new BasicDBObject();
			query.put("_id", list.getId());
		return this.executeQuery(query);
	}

	/**
	 * Execute given query
	 * @param BasicDBObject query
	 * @return ArrayList<Object> items
	 */
	@Override
	protected ArrayList<Object> executeQuery(BasicDBObject query) {
		DBCursor cursor = this.getCollection("scrumboard_items").find(query);
		ArrayList<Object> items = new ArrayList<Object>();
		try{
			while(cursor.hasNext()){
				DBObject object = cursor.next();
				ScrumboardItem item = (ScrumboardItem) this.parse(object);
				items.add(item);
			}
		}finally{
			cursor.close();
		}
		return items;
	}

	/**
	 * parse bbobejct to object item
	 * @param DBObject obj
	 * @return Object item
	 */
	@SuppressWarnings("rawtypes")
	@Override
	protected Object parse(DBObject obj) {
		ScrumboardItem item = new ScrumboardItem();
		Map map = obj.toMap();
		if(map.size() > 0 && this.list != null){
			item.setId(map.get("_id").toString());
			item.setList(this.list);
			item.setShortCode(map.get("shortcode").toString());
			item.setTitle(map.get("title").toString());
			item.setDescription(map.get("description").toString());
			item.setStatus(map.get("status").toString());
			item.setCompletedAt(super.getCalendarParser().parseStringToCalendar(map.get("completedAt").toString()));
		}
		return item;
	}
}
