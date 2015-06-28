package starty.gen.api.util.jsonadapters;

import java.lang.reflect.Type;

import starty.gen.api.model.Sprint;
import starty.gen.api.util.CalendarParser;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
/**
 * json adapter for sprints
 * @author Henderikus Harms
 * @date 22 jun. 2015
 */
public class SprintAdapter implements JsonSerializer<Sprint> {
	private String dateFormat = "yyyy-MM-dd HH:mm:ss";
	private CalendarParser calendarParser = new CalendarParser(dateFormat);
	
	/**
	 * create a json object of a sprint 
	 */
	@Override
	public JsonElement serialize(Sprint p, Type arg1, JsonSerializationContext arg2){
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("projectid", p.getProject().getId());
		jsonObject.addProperty("name", p.getName());
		jsonObject.addProperty("startAt", this.calendarParser.parseDateToString(p.getStartAt()));
		jsonObject.addProperty("endAt", this.calendarParser.parseDateToString(p.getEndAt()));
		return jsonObject;
	}
	
	
}
