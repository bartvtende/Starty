package starty.gen.api.request;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import starty.gen.api.request.handlers.GraphHandler;

@Path("/request")
public class RequestListener {
	
	@GET
	@Path("graph/{sprintId}")
	@Produces(MediaType.APPLICATION_JSON)
	public String getGraph(@PathParam("sprintId") String sprintId){
		GraphHandler handler = new GraphHandler();
		String g = handler.getGraph(sprintId); 
		return g;
	}
	
}
