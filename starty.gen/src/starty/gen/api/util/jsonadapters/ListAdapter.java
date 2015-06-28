package starty.gen.api.util.jsonadapters;

import java.lang.reflect.Type;

import starty.gen.api.model.ScrumboardList;
import starty.gen.api.util.CalendarParser;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

/**
 * json adapter for a scrumboardlist
 * @author Henderikus Harms
 * @date 23 jun. 2015
 */
public class ListAdapter implements JsonSerializer<ScrumboardList> {
	private String dateFormat = "yyyy-MM-dd HH:mm:ss";
	private CalendarParser calendarParser = new CalendarParser(dateFormat);
	
	/**
	 * create a json object of a scrumboardlist
	 */
	@Override
	public JsonElement serialize(ScrumboardList l, Type arg1, JsonSerializationContext arg2){
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("sprintid", l.getSprint().getId());
		jsonObject.addProperty("name", l.getName());
		jsonObject.addProperty("startAt", this.calendarParser.parseDateToString(l.getCreatedAt()));
		jsonObject.addProperty("updatedAt", this.calendarParser.parseDateToString(l.getUpdatedAt()));
		return jsonObject;
	}
}
