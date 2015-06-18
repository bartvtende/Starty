package starty.gen.api.util;

import starty.gen.api.model.Projects;
import starty.gen.api.util.jsonadapters.ProjectAdapter;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * This class contain methods to parse json
 * @author Henderikus Harms
 * @date 16 jun. 2015
 */
public class JsonParser {
	
	/**
	 * Parse object to json wit GSON (google json)
	 * only for non hibernatobject
	 * @param obj
	 * @return JsonString
	 */
	public String getJSON(Object obj){
		String json = "";
		if(obj != null && obj instanceof java.io.Serializable == false ){
			Gson gson = new Gson();
			json = gson.toJson(obj);
		}
		return json;
	}
	
	/**
	 * Project to json
	 * @param p
	 * @return
	 */
	public String projectToJson(Projects p){
		GsonBuilder gsonBuilder = new GsonBuilder();
		Gson gson = gsonBuilder.registerTypeAdapter(Projects.class, new ProjectAdapter()).create();
		return gson.toJson(p);
	}
}
