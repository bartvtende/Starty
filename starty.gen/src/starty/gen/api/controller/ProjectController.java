package starty.gen.api.controller;

import java.util.ArrayList;
import java.util.Iterator;

import starty.gen.api.model.ProjectUsers;
import starty.gen.api.model.Projects;

/**
 * This class controls all actions concerning a project
 * @author Henderikus Harms
 * @date 17 jun. 2015
 */
public class ProjectController extends Controller {
	
	public ProjectController(){
		super();
	}
	
	/**
	 * get all data from db
	 * @param projectId
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public Projects retreiveProjectById(int projectId){
		super.getProjectsDao().openCurrentSessionWithTransaction();
		Projects p = super.getProjectsDao().getProjectById(projectId);
		ArrayList<ProjectUsers> pu = new ArrayList<ProjectUsers>();
		Iterator itr = p.getProjectUserses().iterator();
		while(itr.hasNext()){
			ProjectUsers u = (ProjectUsers) itr.next();
			pu.add(u);
		}
		p.setProjectUsers(pu);
		this.projectsDao.closeCurrentSessionWithTransaction();
		return p;
	}
	
}
