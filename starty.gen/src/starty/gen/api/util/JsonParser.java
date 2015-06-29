package starty.gen.api.util;

import starty.gen.api.model.Graph;
import starty.gen.api.model.Projects;
import starty.gen.api.model.ScrumboardList;
import starty.gen.api.model.Sprint;
import starty.gen.api.util.jsonadapters.ListAdapter;
import starty.gen.api.util.jsonadapters.ProjectAdapter;
import starty.gen.api.util.jsonadapters.SprintAdapter;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * This class contain methods to parse json
 * @author Henderikus Harms
 * @date 16 jun. 2015
 */
public class JsonParser {
	
	/**
	 * Parse standard object to json wit GSON (google json)
	 * only for non hibernatobject
	 * @param obj
	 * @return JsonString
	 */
	public String objectToJSON(Object obj){
		String json = "";
		if(obj != null && obj instanceof java.io.Serializable == false ){
			Graph g  = (Graph) obj;
			System.out.println(g.toString());
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
	
	/**
	 * Parse sprint to json using SprintAdapter
	 * @param sprint
	 * @return
	 */
	public String sprintToJson(Sprint sprint){
		GsonBuilder gsonBuilder = new GsonBuilder();
		Gson gson = gsonBuilder.registerTypeAdapter(Sprint.class, new SprintAdapter()).create();
		return gson.toJson(sprint);
	}
	/**
	 * Parse list to json using ListAdapter
	 * @param list
	 * @return
	 */
	public String listToJson(ScrumboardList list){
		GsonBuilder gsonBuilder = new GsonBuilder();
		Gson gson = gsonBuilder.registerTypeAdapter(ScrumboardList.class, new ListAdapter()).create();
		return gson.toJson(list);
	}
}
