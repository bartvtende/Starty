package starty.gen.api.dao;

import java.util.List;

import org.hibernate.SQLQuery;

import starty.gen.api.model.Projects;

/**
 * This class contains all query concerning to projects
 * The session, database acess and transaction can be call
 * with methods in the superclass MySQLDAO
 * @author Henderikus Harms
 * @date 17 jun. 2015
 */
public class ProjectsDao extends MySQLDao {
	
	/**
	 * default constructor
	 */
	public ProjectsDao(){
		super();
	}
	
	/**
	 * get project with given id from db
	 * @param id
	 * @return Projects when found and null when nothing is found
	 */
	@SuppressWarnings("rawtypes")
	public Projects getProjectById(int id){
		String sql = "SELECT * FROM Projects WHERE id= '"+ id + "'";
		
		SQLQuery query = super.getCurrentSession().createSQLQuery(sql);
		query.addEntity(Projects.class);
		List projects = query.list();
		
		if(!projects.isEmpty() && projects.size() == 1){ 
			return (Projects) projects.get(0);
		}
		
		return null;
	}
	
}
