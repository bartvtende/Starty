package starty.gen.api.util.jsonadapters;

import java.lang.reflect.Type;
import java.util.ArrayList;

import starty.gen.api.dao.ProjectsDao;
import starty.gen.api.model.ProjectUsers;
import starty.gen.api.model.Projects;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

/**
 * Json adapter example for a project
 * @author Henderikus Harms
 * @date 17 jun. 2015
 */
public class ProjectAdapter implements JsonSerializer<Projects> {
	ProjectsDao projectsDao = new ProjectsDao();
	/**
	 * parse a project to jsons
	 */
	@Override
	public JsonElement serialize(Projects p, Type arg1, JsonSerializationContext arg2) {
		Gson gson = new Gson();
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("id", p.getId());
		jsonObject.addProperty("organizationId", p.getOrganizationId());
		jsonObject.addProperty("shortcode", p.getShortcode());
		jsonObject.addProperty("name", p.getName());
		jsonObject.addProperty("description", p.getDescription());
		jsonObject.addProperty("createdAt", p.getCreatedAt().toString());
		jsonObject.addProperty("updatedAt", p.getUpdatedAt().toString());
		//projectsDao.openCurrentSession();
		//jsonObject.addProperty("ProjectUsers", gson.toJson(p.getProjectUsers()));
		//projectsDao.closeCurrentSession();
		// TODO Auto-generated method stub
		return jsonObject;
	}
	
	
}
