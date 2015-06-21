package starty.gen.api.request;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import starty.gen.api.controller.ProjectController;
import starty.gen.api.model.Graph;
import starty.gen.api.model.Projects;
import starty.gen.api.model.Test;
import starty.gen.api.request.handlers.GraphHandler;
import starty.gen.api.util.JsonParser;

@Path("/request")
public class RequestListener {
	
	@GET
	@Path("test/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public String handleRequest(@PathParam("id") int id){
		Test g = new Test();
		g.setTest("" + id);
		g.setTest2("Hello World");
		g.addMessage("mai");
		g.addMessage("ook mai");
		int[][] vectors = g.getVectors();
		for(int d = 0; d < vectors.length; d++){
			System.out.print(vectors[d][0] + ": ");
			for(int t = 1; t < vectors[d].length; t++){
	
				System.out.print(vectors[d][t] + " ");
			}
		}
		JsonParser json = new JsonParser();
		return json.getJSON(g);
	}
	
	@GET
	@Path("graph/{projectId}/{sprintId}")
	@Produces(MediaType.APPLICATION_JSON)
	public String getGraph(@PathParam("projectId") int projectId, @PathParam("sprintId") int sprintId){
		GraphHandler handler = new GraphHandler();
		String g = handler.getGraph(projectId, sprintId); 
		return g;
	}
	
	@GET
	@Path("project/{projectId}")
	@Produces(MediaType.APPLICATION_JSON)
	public String getProjectById(@PathParam("projectId") int projectId){
		ProjectController projectController = new ProjectController();
		Projects p = projectController.retreiveProjectById(projectId);
		
		JsonParser json = new JsonParser();
		return json.projectToJson(p);
	}
}
