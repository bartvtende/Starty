package starty.gen.api.request.handlers;

import starty.gen.api.controller.ProjectController;
import starty.gen.api.model.Graph;
import starty.gen.api.model.Projects;

/**
 * Handler for the generation of a graph
 * @author Henderikus Harms
 * @date 18 jun. 2015
 */
public class GraphHandler extends Handler {
	private ProjectController projectController;
	
	public GraphHandler(){
		this.projectController = new ProjectController();
	}
	
	/**
	 * calculate graph
	 * @return
	 */
	public Graph getGraph(int projectId, int sprintId){
		Projects p = this.projectController.retreiveProjectById(projectId);
		Graph graph = new Graph();
		double[][] graphData = this.getGraphData(this.calculateIdealWorkload(projectId, sprintId, p), this.calculateActualWorkload(), p);
		graph.setSprintName("sprint " + sprintId);
		graph.setxType("Days");
		graph.setyType("Hours");
		graph.setGraphData(graphData);
		return graph;
	}
	
	/**
	 * calculate ideal workload
	 * @return int[]
	 */
	private double[] calculateIdealWorkload(int projectId, int sprintId, Projects p){
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
	private double[] calculateActualWorkload(){
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
}
