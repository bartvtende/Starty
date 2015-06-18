package model;

import java.util.ArrayList;

public class Organization {

	private String name;
	private User creator;
	private ArrayList<Project> projects = new ArrayList<Project>();
	private ArrayList<User> members = new ArrayList<User>();

	public Organization(User creator) {
		this.creator = creator;
		name = this.createName(creator.getName());
	}

	public User getCreator() {
		return creator;
	}

	public Project createProject(Organization parent) {

		Project project = new Project(parent);
		projects.add(project);
		return project;
	}

	public void addUser(User member) {
		members.add(member);
	}

	private String createName(String name) {
		name = name.replace(' ', '-');
		name = name.concat(" Organization");
		return name;
	}

	@Override
	public String toString() {
		StringBuilder str = new StringBuilder();
		str.append('{');
		str.append("Name: ");
		str.append(this.name);
		str.append(";}");
		return str.toString();
	}

}
