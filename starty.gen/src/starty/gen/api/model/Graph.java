package starty.gen.api.model;

import java.text.SimpleDateFormat;
import java.util.Calendar;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * All data for a graph based on Google charts 
 * @author Henderikus Harms
 * @date 18 jun. 2015
 */
@XmlRootElement
public class Graph {
	/** project name **/
	private String projectName;
	
	/** name of sprint **/
	private String sprintName;
	
	/** amount of developers **/
	private int Developers;
	
	/** efficieciency factor **/
	private double efficiencyFactor;
	
	/** type measurement time of x axis **/
	private String yType;
	
	/** type measurement time of x axis **/
	private String xType;
	
	/** createdAt yyyy-MM-dd HH:mm:ss **/
	private String createdAt;
	
	/** format {days, ideal workload, actual workload}  **/
	private double[][] graphData;
	
	public Graph(){
		this.createdAt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());
	}

	public String getSprintName() {
		return sprintName;
	}

	public void setSprintName(String sprintName) {
		this.sprintName = sprintName;
	}

	public String getyType() {
		return yType;
	}

	public void setyType(String yType) {
		this.yType = yType;
	}

	public String getxType() {
		return xType;
	}

	public void setxType(String xType) {
		this.xType = xType;
	}

	public double[][] getGraphData() {
		return graphData;
	}

	public void setGraphData(double[][] graphData) {
		this.graphData = graphData;
	}
	
	public void setCreatedAt(String timestamp){
		this.createdAt = timestamp;
	}
	
	public String getCreatedAt(){
		return this.createdAt;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public int getDevelopers() {
		return Developers;
	}

	public void setDevelopers(int developers) {
		Developers = developers;
	}

	public double getEfficiencyFactor() {
		return efficiencyFactor;
	}

	public void setEfficiencyFactor(double efficiencyFactor) {
		this.efficiencyFactor = efficiencyFactor;
	}
	
	
}
