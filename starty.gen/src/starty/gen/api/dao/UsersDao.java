package starty.gen.api.dao;

import java.util.List;

import org.hibernate.SQLQuery;

import starty.gen.api.model.Projects;
import starty.gen.api.model.Users;

/**
 * DAO for users
 * @author Henderikus Harms
 * @date 25 jun. 2015
 */
public class UsersDao extends MySQLDao{

	/**
	 * get user by id
	 * @param id
	 * @return User
	 */
	@SuppressWarnings("rawtypes")
	public Users getUserById(int id){
		String sql = "SELECT * FROM Users WHERE id= '"+ id + "'";
		
		SQLQuery query = super.getCurrentSession().createSQLQuery(sql);
		query.addEntity(Projects.class);
		List users = query.list();
		
		if(!users.isEmpty() && users.size() == 1){ 
			return (Users) users.get(0);
		}
		
		return null;
	}
}
