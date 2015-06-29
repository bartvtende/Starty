package starty.gen.api.model;

import java.util.Calendar;

/**
 * this class conatain data concerning Sprints
 * @author Henderikus Harms
 * @date 22 jun. 2015
 */
public class Sprint {
	private String id;
	private Projects project;
	private String name;
	private Calendar startAt;
	private Calendar endAt;
	
	public Sprint(){
		
	}
	
	public Sprint(Projects project, String name, Calendar startAt, Calendar endAt){
		this();
		this.setProject(project);
		this.setName(name);
		this.setStartAt(startAt);
		this.setEndAt(endAt);
	}
	
	public Sprint(String id, Projects project, String name, Calendar startAt, Calendar endAt){
		this(project, name, startAt, endAt);
		this.setId(id);
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Projects getProject() {
		return project;
	}

	public void setProject(Projects project) {
		this.project = project;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Calendar getStartAt() {
		return startAt;
	}

	public void setStartAt(Calendar startArt) {
		this.startAt = startArt;
	}

	public Calendar getEndAt() {
		return endAt;
	}

	public void setEndAt(Calendar endAt) {
		this.endAt = endAt;
	}

	@Override
	public String toString() {
		return "Sprint [id=" + id + ", project=" + project + ", name=" + name
				+ ", startAt=" + startAt + ", endAt=" + endAt + "]";
	}
	
	
}
