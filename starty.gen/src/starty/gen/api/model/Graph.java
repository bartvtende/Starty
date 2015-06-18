package starty.gen.api.model;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * All data for a graph based on Google charts 
 * @author Henderikus Harms
 * @date 18 jun. 2015
 */
@XmlRootElement
public class Graph {
	/** name of sprint **/
	private String sprintName;
	
	/** type measurement time of x axis **/
	private String yType;
	
	/** type measurement time of x axis **/
	private String xType;
	
	/** format {days, ideal workload, actual workload}  **/
	private double[][] graphData;
	
	public Graph(){
		
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
}
