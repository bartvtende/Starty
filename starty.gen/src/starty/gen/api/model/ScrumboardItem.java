package starty.gen.api.model;

import java.util.Calendar;

public class ScrumboardItem {
	private String id;
	private ScrumboardList list;
	private String shortCode;
	private String title;
	private String description;
	//private Users assignedUser;
	private String status;
	private Calendar completedAt;
	private double expectedTime;
	
	public ScrumboardItem(){
		
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public ScrumboardList getList() {
		return list;
	}

	public void setList(ScrumboardList list) {
		this.list = list;
	}

	public String getShortCode() {
		return shortCode;
	}

	public void setShortCode(String shortCode) {
		this.shortCode = shortCode;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	/**
	public Users getAssignedUser() {
		return assignedUser;
	}

	public void setAssignedUser(Users assignedUser) {
		this.assignedUser = assignedUser;
	}
	**/

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Calendar getCompletedAt() {
		return completedAt;
	}

	public void setCompletedAt(Calendar completedAt) {
		this.completedAt = completedAt;
	}

	public double getExpectedTime() {
		return expectedTime;
	}

	public void setExpectedTime(double expectedTime) {
		this.expectedTime = expectedTime;
	}
	
	
}
