package starty.gen.api.controller;

import starty.gen.api.dao.ProjectUsersDao;
import starty.gen.api.dao.ProjectsDao;

public class Controller {
	
	ProjectsDao projectsDao;
	ProjectUsersDao projectsUserDao;
	
	public Controller(){
		this.setProjectsDao(new ProjectsDao());
		this.setProjectsUserDao(new ProjectUsersDao());
	}

	public ProjectsDao getProjectsDao() {
		return projectsDao;
	}

	public void setProjectsDao(ProjectsDao projectsDao) {
		this.projectsDao = projectsDao;
	}

	public ProjectUsersDao getProjectsUserDao() {
		return projectsUserDao;
	}

	public void setProjectsUserDao(ProjectUsersDao projectsUserDao) {
		this.projectsUserDao = projectsUserDao;
	}
	
	
	
	
}
