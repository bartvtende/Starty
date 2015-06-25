package starty.gen.api.request.handlers;

import starty.gen.api.controller.ProjectController;
import starty.gen.api.dao.GraphsDao;
import starty.gen.api.model.Graph;
import starty.gen.api.model.Projects;
import starty.gen.api.util.JsonParser;
import starty.gen.api.util.TestData;

/**
 * Handler for the generation of a graph
 * @author Henderikus Harms
 * @date 18 jun. 2015
 */
public class GraphHandler extends Handler {
	private ProjectController projectController;
	private GraphsDao graphsDao;
	
	public GraphHandler(){
		this.projectController = new ProjectController();
		this.graphsDao = new GraphsDao();
		
	}
	
	/**
	 * calculate graph and save graph data
	 * @return String graph parsed to json
	 */
	public String getGraph(int projectId, String sprintId){
		/** retrieve project info **/
		Projects p = this.projectController.retreiveProjectById(projectId);
		
		TestData test = new TestData();
		test.generateTestData(p);
		
		/** create new graph **/
		Graph graph = new Graph();
		
		/** calculate graphData **/
		double[][] graphData = this.getGraphData(this.calculateIdealWorkload(projectId, sprintId, p), this.calculateActualWorkload(sprintId), p);
		
		/** set all data to graph **/
		graph.setProjectName(p.getName());
		graph.setSprintName("sprint " + sprintId);
		graph.setDevelopers(p.getAmountOfProjectUsers());
		graph.setEfficiencyFactor(this.calculateEfficiencyFactor(20, p.getAmountOfProjectUsers(), 28));
		graph.setxType("Days");
		graph.setyType("Hours");
		graph.setGraphData(graphData);
		
		/** parse graph **/
		JsonParser json = new JsonParser();
		String parsedGraph = json.objectToJSON(graph); 
		
		/** save graph **/
		this.saveGraph(parsedGraph);
		
		return parsedGraph;
	}
	
	/**
	 * calculate ideal workload
	 * @return int[]
	 */
	private double[] calculateIdealWorkload(int projectId, String sprintId, Projects p){
		double[] idealWorkload;
		if(p != null){
			//TODO obtain from db
			int workDays = 20;
			double taskDaysAssigned = 28;
			
			//calculate ideal effort
			double idealEffort = (-1 * taskDaysAssigned) / workDays ;
			
			//create workload array
			idealWorkload = new double[workDays + 1];
			idealWorkload[0] = taskDaysAssigned;
			
			//create idealWorkload data array
			for(int i = 1; i <= workDays; i++){
				double ideal = (idealEffort * (i)) + taskDaysAssigned;
				idealWorkload[i] = Math.floor(ideal * 10) /10 ;
			}
			return idealWorkload;
		}
		return null;
	}
	
	/**
	 * calculate actual workload
	 * @return int[]
	 */
	private double[] calculateActualWorkload(String sprintId){
		double[] actual = new double[0];
		return actual;
	}
	
	/**
	 * convert idealWorkload and actualWorkload to graphData
	 * int[] int[] to int[][]
	 * @param idealWorkload
	 * @param actualWorkload
	 * @return int[][] graphData {day, idealWorkload, actualWorkload}
	 */
	private double[][] getGraphData(double[] idealWorkload, double[] actualWorkload, Projects p){
		int workDays = 20;
		double[][] graphData = new double[workDays + 1][3];
		
		for(int d = 0; d <= workDays; d++){
			double actual = 0; 
			if(d < actualWorkload.length){
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
	private double calculateEfficiencyFactor(int workdays, int amountDev, int durationSprint){
		double manDays = workdays * amountDev;
		double eff = durationSprint / manDays;
		double factor = Math.floor(eff * 10) /10 ;
		return factor;
	}
	
	/** 
	 * save graph in mongoDB
	 * @param json
	 */
	private void saveGraph(String json){
		this.graphsDao.saveData(json);
	}
}
