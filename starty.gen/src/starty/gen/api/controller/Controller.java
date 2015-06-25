package starty.gen.api.controller;

import starty.gen.api.dao.ProjectsDao;
import starty.gen.api.dao.UsersDao;
/**
 * main class of hibernate controllers
 * @author Henderikus Harms
 * @date 22 jun. 2015
 */
public class Controller {
	
	ProjectsDao projectsDao;
	UsersDao usersDao;
	
	public Controller(){
		this.setProjectsDao(new ProjectsDao());
		this.setUsersDao(new UsersDao());
	
	}

	public ProjectsDao getProjectsDao() {
		return projectsDao;
	}

	public void setProjectsDao(ProjectsDao projectsDao) {
		this.projectsDao = projectsDao;
	}

	public UsersDao getUsersDao() {
		return usersDao;
	}

	public void setUsersDao(UsersDao usersDao) {
		this.usersDao = usersDao;
	}	
	
	
}
