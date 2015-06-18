package starty.gen.api.dao;

import org.hibernate.Session;
import org.hibernate.Transaction;

import starty.gen.api.util.HibernateUtil;
/**
 * Main class of the Dao objects concerning mysql
 * For mysql hibernate is used
 * @author Henderikus Harms
 * @date 17 jun. 2015
 */
public class MySQLDao extends Dao {
	
	//Active session
	private Session currentSession;	
	private Transaction currentTransaction;
	
	public MySQLDao(){
		super();
	}
	
	/**
	 * Obtain a sesion and connection with to db 
	 * without transactions
	 * @return
	 */
	public Session openCurrentSession(){
		this.currentSession = HibernateUtil.getSessionFactory().openSession();
		return currentSession;
	}
	
	/**
	 * Obtain a sesions and connections to db 
	 * with transactionss 
	 * @return
	 */
	public Session openCurrentSessionWithTransaction(){
		this.currentSession = HibernateUtil.getSessionFactory().openSession();
		this.currentTransaction = this.currentSession.beginTransaction();
		return this.currentSession;
	}
	
	/**
	 * close session
	 */
	public void closeCurrentSession(){
		this.currentSession.close();
	}
	
	/**
	 * close connection and session and commit transaction
	 */
	public void closeCurrentSessionWithTransaction(){
		this.currentTransaction.commit();
		this.currentSession.close();
	}
	
	/**
	 * get the current section
	 * @return the current section
	 */
	public Session getCurrentSession(){
		return this.currentSession;
	}
	
	/**
	 * set cuttentSession
	 * @param currentSession
	 */
	public void setCurrentSession(Session currentSession){
		this.currentSession = currentSession;
	}
	
	/**
	 * get the current transaction
	 * @return currentTransaction
	 */
	public Transaction getCurrentTransaction(){
		return this.currentTransaction;
	}
	
	/**
	 * set currentTransaction
	 * @param currentTransaction
	 */
	public void setCurrentTransaction(Transaction currentTransaction){
		this.currentTransaction = currentTransaction;
	}
	
}
