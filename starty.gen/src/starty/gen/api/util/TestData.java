package starty.gen.api.util;

import java.util.Calendar;

import starty.gen.api.dao.ScrumboardListsDao;
import starty.gen.api.dao.SprintsDao;
import starty.gen.api.model.Projects;
import starty.gen.api.model.ScrumboardList;
import starty.gen.api.model.Sprint;
/**
 * class for creating of test data
 * @author Henderikus Harms
 * @date 22 jun. 2015
 */
public class TestData {
	private SprintsDao sprintsDao;
	private ScrumboardListsDao listDao;
	private CalendarParser calendarParser;
	private JsonParser json;
	/**
	 * create new Testdate generator
	 */
	public TestData(){
		this.sprintsDao = new SprintsDao();
		this.listDao = new ScrumboardListsDao();
		this.calendarParser = new CalendarParser("yyyy-MM-dd HH:mm:ss");
		this.json = new JsonParser();
		
	}
	
	/**
	 * start generation of test data
	 * @param p
	 */
	public void generateTestData(Projects p){
		this.createMockUpData(p, 1);
	}
	
	/**
	 * create mockupdate for sprints, scrumboardlist and scrumboarditems
	 * @param p
	 * @param amount
	 */
	private void createMockUpData(Projects p, int amount){
		for(int i = 0; i < amount; i++){
			Calendar s = Calendar.getInstance();
			Calendar e = Calendar.getInstance();
			e.add(Calendar.DATE, 28);
			Sprint s1 = new Sprint(p, "Sprint " + i, s, e);
			this.sprintsDao.saveData(json.sprintToJson(s1));
			this.mockUpList(s1);
		}
	}
	
	private void mockUpList(Sprint sprint){
		Sprint sp = this.sprintsDao.findSprintByStart(this.calendarParser.parseDateToString(sprint.getStartAt()));
		Calendar s = Calendar.getInstance();
		Calendar u = Calendar.getInstance();
		ScrumboardList list = new ScrumboardList();
		list.setName("lijst 1");
		list.setSprint(sp);
		list.setCreatedAt(s);
		list.setUpdatedAt(u);
		list.setCompleted(false);
		this.listDao.saveData(json.listToJson(list));
	}
	
}
