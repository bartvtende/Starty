package starty.gen.api.request.handlers;

import java.util.ArrayList;
import java.util.Calendar;

import com.sun.xml.internal.bind.v2.model.core.ID;

import starty.gen.api.model.Graph;
import starty.gen.api.model.ScrumboardItem;
import starty.gen.api.model.ScrumboardList;
import starty.gen.api.model.Sprint;
import starty.gen.api.util.JsonParser;

/**
 * Handler for the generation of a graph
 * @author Henderikus Harms
 * @date 18 jun. 2015
 */
public class GraphHandler extends Handler {
	private int sprintDuration;
	private double taskDaysAssigned; 
	private int workDays;
	private double taskDaysCompleted; 
	
	public GraphHandler(){
		super();
	}
	
	/**
	 * calculate graph and save graph data
	 * @return String graph parsed to json
	 */
	public String getGraph(String sprintId){
		Sprint sprint = super.getSprintsDao().findSprindById(sprintId);
					
		Graph graph = new Graph();
		
		String parsedGraph = "";
		
		if(sprint != null){
			this.sprintDuration = this.calculateSprintDuration(sprint);
			this.taskDaysAssigned = this.getTasksDaysAssignedFromDB(sprint);
			this.workDays = this.sprintDuration - ((this.sprintDuration / 7) * 2);
			
			double[][] graphData = this.getGraphData(this.calculateIdealWorkload(sprint), this.calculateActualWorkload(sprint));
			
			graph.setSprintId(sprint.getId());
			graph.setEfficiencyFactor(this.calculateEfficiencyFactor(sprint.getProject().getAmountOfProjectUsers()));
			graph.setxType("Days");
			graph.setyType("Hours");
			graph.setGraphData(graphData);
			
			JsonParser json = new JsonParser();
			parsedGraph = json.objectToJSON(graph); 
			
			this.saveGraph(parsedGraph);
		}
		return parsedGraph;
	}
	
	/**
	 * calculate ideal workload
	 * @return int[]
	 */
	private double[] calculateIdealWorkload(Sprint sprint){
		double[] idealWorkload;
		if(sprint.getProject() != null){
			//calculate ideal effort
			double idealEffort = (-1 * taskDaysAssigned) / workDays ;
			
			//create workload array
			idealWorkload = new double[workDays + 1];
			idealWorkload[0] = taskDaysAssigned;
			
			//create idealWorkload data array
			for(int i = 1; i <= workDays; i++){
				double ideal = (idealEffort * (i)) + taskDaysAssigned;
				idealWorkload[i] = ideal;
			}
			return idealWorkload;
		}
		return null;
	}
	
	/**
	 * calculate actual workload
	 * @return int[]
	 */
	private double[] calculateActualWorkload(Sprint sprint){
		double[] actual = new double[workDays + 1];
		System.out.println("workdays= " + workDays);
		ScrumboardList cl = super.getListDao().findCompletedList(sprint);
		Calendar day = sprint.getStartAt();
		if(cl != null){
			boolean currentDayPassed = false;
			boolean endPast = false;
			double weekendWork = 0.0; 
			int i = 1;
			double total = this.taskDaysAssigned;
			System.out.println("startday = " + day.getTime());
			actual[0] = total;
			while (currentDayPassed == false && endPast == false ){
				String today = super.getCalendarParser().parseDateToISOString(Calendar.getInstance());
				Calendar d = super.getCalendarParser().parseIsoStringToCalendar(today);
				
				//System.out.println("current " + today + d.getTime());
				ArrayList<Object> items = super.getItemsDao().getItemsbyListIdAndDate(cl, day);
				System.out.println(items.size() + " items size in handler");
				
				if(super.getCalendarParser().checkIfWeekend(day)){
					System.out.println("weekend???");
					weekendWork += this.calculateCompletedWorkTime(items);
					if(i == workDays){
						actual[i] = total - weekendWork;
						weekendWork = 0;
					}
				}
				else if (super.getCalendarParser().checkIfMonday(d)){
					actual[i] = total - (this.calculateCompletedWorkTime(items));
					System.out.println("calc1 " + actual[i]);
					weekendWork = 0.0;
					i++;
					System.out.println("monday");
				
				}else if(i <= workDays + 1){
					actual[i] =  total - this.calculateCompletedWorkTime(items);
					System.out.println("calc2 " + actual[i]);
					i++;
				}
				
				System.out.println(i + " " + total);
				day.add(Calendar.DATE, 1);
				System.out.println("day = " + day.getTime());
				//currentDaPassed = super.getCalendarParser().checkIfDatePassed(day, d);
				endPast = super.getCalendarParser().checkIfDatePassed(day, sprint.getEndAt());
			}
		}
		
		
		return actual;
	}
	
	
	/**
	 * convert idealWorkload and actualWorkload to graphData
	 * int[] int[] to int[][]
	 * @param idealWorkload
	 * @param actualWorkload
	 * @return int[][] graphData {day, idealWorkload, actualWorkload}
	 */
	private double[][] getGraphData(double[] idealWorkload, double[] actualWorkload){
		double[][] graphData = new double[workDays + 1][3];
		
		for(int d = 0; d <= workDays; d++){
			double actual = 0; 
			if(d <= actualWorkload.length){
				//System.out.println("check graphdat" + d + " " + actualWorkload.length  );
				actual = actualWorkload[d]; 
			}
			graphData[d][0] = d;
			graphData[d][1] = idealWorkload[d];
			graphData[d][2] = actual;
		}
		return graphData;
	}
	
	/**
	 * calculate efficiencyFactor
	 * @param workdays
	 * @param amountDev
	 * @param durationSprint
	 * @return efficiencyFactor
	 */
	private double calculateEfficiencyFactor(int amountDev){
		//TODO get passed workdays an work completed
		double manDays = this.workDays * amountDev;
		double eff = this.taskDaysCompleted / manDays;
		double factor = Math.floor(eff * 10) /10 ;
		return factor;
	}
	/**
	 * calculate the amount of days for duration of the sprint
	 * @param sprint
	 * @return int days
	 */
	private int calculateSprintDuration(Sprint sprint){
		return (int)((sprint.getEndAt().getTimeInMillis() - sprint.getStartAt().getTimeInMillis()) / (1000 * 60 * 60 * 24));
	}
	
	/**
	 * obtain the amount of days of assigned items from the db
	 * @param sprint
	 * @return double
	 */
	private double getTasksDaysAssignedFromDB(Sprint sprint){
		ArrayList<Object> lists = super.getListDao().findListsBySprint(sprint);
		//System.out.println(lists.size());
		double daysAssigned = 0.0;
		
		for(Object l : lists ){
			ScrumboardList list = (ScrumboardList) l;
			ArrayList<Object> items = super.getItemsDao().getItemsbyListId(list);
			//System.out.println(items.size() + "amount");
			for(Object i : items ){
				ScrumboardItem item = (ScrumboardItem) i;
				//System.out.println("item " + item.getExpectedTime());
				daysAssigned += item.getExpectedTime();
			}
		}
		return daysAssigned;
	}
	
	/**
	 * calculate completed work time
	 * @param items
	 * @return double
	 */
	private double calculateCompletedWorkTime(ArrayList<Object> items){
		double completedWork = 0.0;
		if(items.size() > 0){
			for(Object i  : items){
				ScrumboardItem item = (ScrumboardItem) i;
				System.out.println(" expectedTime " + item.getExpectedTime());
				completedWork += item.getExpectedTime();
			}
		}else{
			System.out.println("null dammit " + items.size());
		}
		return completedWork;
	}
	
	/** 
	 * save graph in mongoDB
	 * @param json
	 */
	private void saveGraph(String json){
		super.getGraphsDao().saveData(json);
	}
}