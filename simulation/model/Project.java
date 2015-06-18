package model;

import java.util.Random;
import net._01001111.text.LoremIpsum;

;

public class Project {

	private Organization parent;
	private String shortcode;
	private String name;
	private String description;

	public Project(Organization parent) {
		this.parent = parent;
		this.description = this.generateDescription(10, 30);
		this.shortcode = Generator.getRandomString(10);
		this.name = this.generatorProjectName(shortcode);
	}

	private String generateDescription(int min, int max) {
		int length = new Random().nextInt(max - min) + min;
		return new LoremIpsum().words(length);
	}

	private String generatorProjectName(String code) {
		StringBuilder str = new StringBuilder();
		str.append("Project-");
		str.append(code);
		return str.toString();
	}

	public Organization getParent() {
		return parent;
	}

	public String getShortcode() {
		return shortcode;
	}

	public void setShortcode(String shortcode) {
		this.shortcode = shortcode;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		StringBuilder str = new StringBuilder();
		str.append('{');
		str.append("Shortcode: ");
		str.append(shortcode);
		str.append(';');
		str.append("Name: ");
		str.append(name);
		str.append(';');
		str.append("Description: ");
		str.append(description);
		str.append(';');
		str.append('}');
		return str.toString();
	}

}
