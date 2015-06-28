package starty.gen.api.dao;

import java.net.UnknownHostException;
import java.util.ArrayList;

import starty.gen.api.util.CalendarParser;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.util.JSON;

/**
 * all method for all dao's for the mongo objects
 * @author Henderikus Harms
 * @date 21 jun. 2015
 */
public abstract class MongoDao extends Dao {
	private MongoClient mongoClient;
	private DB database;
	private String collectionName;
	private CalendarParser calendarParser;
	
	
	public MongoDao(String collectionName){
		try {
			this.mongoClient = new MongoClient("localhost", 27017);
			this.database = this.mongoClient.getDB("starty");
			this.collectionName = collectionName;
			this.calendarParser = new CalendarParser("yyyy-MM-dd HH:mm:ss");
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/**
	 * get the mongoclient
	 * @return MongoClient
	 */
	public MongoClient getMongoClient() {
		return mongoClient;
	}

	/**
	 * set mongo client
	 * @param mongoClient
	 */
	public void setMongoClient(MongoClient mongoClient) {
		this.mongoClient = mongoClient;
	}
	
	/**
	 * get database
	 * @return
	 */
	public DB getDatabase() {
		return database;
	}
	
	/**
	 * set active database
	 * @param database
	 */
	public void setDatabase(DB database) {
		this.database = database;
	}
	
	/**
	 * get collection from mongo db
	 * @param name
	 * @return DBCollection
	 */
	public DBCollection getCollection(String name) {
		return database.getCollection(name);
	}
	
	/**
	 * create new collection in the mongodb
	 * @param name
	 * @param dbObject
	 */
	private void setCollection(String name, DBObject dbObject) {
		if(this.getCollection(name) == null){
			database.createCollection(name, dbObject);
		}
	}
	
	/**
	 * get name of collection
	 * @return
	 */
	public String getCollectionName() {
		return collectionName;
	}

	/**
	 * set collection name
	 * @param collectionName
	 */
	public void setCollectionName(String collectionName) {
		this.collectionName = collectionName;
	}
	
	/**
	 * set parser for calendar
	 * @return
	 */
	public CalendarParser getCalendarParser() {
		return calendarParser;
	}
	
	/**
	 * get calendar parser
	 * @param calendarParser
	 */
	public void setCalendarParser(CalendarParser calendarParser) {
		this.calendarParser = calendarParser;
	}

	/**
	 * save json data to db
	 * @param json
	 */
	public void saveData (String json){
		DBObject dbObject = (DBObject) JSON.parse(json);
		if(this.getCollection(collectionName) != null){
			this.getCollection(collectionName).insert(dbObject);
		}else{
			this.setCollection(collectionName, dbObject);
		}
	}
	
	/**
	 * method that executes the query
	 * must be implemented by subclasses
	 * @param query
	 * @return ArrayList with found objects
	 */
	protected abstract ArrayList<Object> executeQuery(BasicDBObject query);
	
	/**
	 * method that parses DBObject to java Object
	 * must be implemented by subclasses
	 * @param obj
	 * @return object
	 */
	protected abstract Object parse(DBObject obj);
	
}
