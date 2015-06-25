package starty.gen.api.request.handlers;

import starty.gen.api.controller.ProjectController;
import starty.gen.api.dao.GraphsDao;
import starty.gen.api.dao.ScrumboardItemsDao;
import starty.gen.api.dao.ScrumboardListsDao;
import starty.gen.api.dao.SprintsDao;
import starty.gen.api.util.CalendarParser;

public class Handler {
	private ProjectController projectController;
	private GraphsDao graphsDao;
	private SprintsDao sprintsDao;
	private ScrumboardListsDao listDao;
	private ScrumboardItemsDao itemsDao;
	private CalendarParser calendarParser;
	
	
	public Handler(){
		this.projectController = new ProjectController();
		this.graphsDao = new GraphsDao();
		this.sprintsDao = new SprintsDao();
		this.listDao = new ScrumboardListsDao();
		this.itemsDao = new ScrumboardItemsDao();
		this.calendarParser = new CalendarParser("yyyy-MM-dd HH:mm:ss");
	}


	public ProjectController getProjectController() {
		return projectController;
	}


	public void setProjectController(ProjectController projectController) {
		this.projectController = projectController;
	}


	public GraphsDao getGraphsDao() {
		return graphsDao;
	}


	public void setGraphsDao(GraphsDao graphsDao) {
		this.graphsDao = graphsDao;
	}


	public SprintsDao getSprintsDao() {
		return sprintsDao;
	}


	public void setSprintsDao(SprintsDao sprintsDao) {
		this.sprintsDao = sprintsDao;
	}


	public ScrumboardListsDao getListDao() {
		return listDao;
	}


	public void setListDao(ScrumboardListsDao listDao) {
		this.listDao = listDao;
	}


	public ScrumboardItemsDao getItemsDao() {
		return itemsDao;
	}


	public void setItemsDao(ScrumboardItemsDao itemsDao) {
		this.itemsDao = itemsDao;
	}


	public CalendarParser getCalendarParser() {
		return calendarParser;
	}


	public void setCalendarParser(CalendarParser calendarParser) {
		this.calendarParser = calendarParser;
	}
	
	
	
}
