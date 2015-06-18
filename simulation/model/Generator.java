package model;

import java.io.InputStreamReader;
import java.util.Random;

public class Generator {

	private static final Random RANDOM = new Random();

	public Generator() {
		generateOrganization(1, 1);
	}

	public Generator(int projects, int users) {
		generateOrganization(projects, users);
	}
	
	public void generateOrganization() {
		User creator = new User();
		Organization organization = new Organization(creator);
		Project project = organization.createProject(organization);
	}

	public void generateOrganization(int projects, int users) {
		User creator = new User();
		Organization organization = new Organization(creator);
		for (int i = 0; i < projects; i++) {
			Project project = organization.createProject(organization);
			System.out.println(creator.getClass().getSimpleName()
					+ creator.toString() + " "
					+ organization.getClass().getSimpleName()
					+ organization.toString() + " "
					+ project.getClass().getSimpleName() + project.toString());

		}
		for (int j = 0; j < users; j++) {
			User member = new User();
			organization.addUser(member);
			System.out.println(creator.getClass().getSimpleName()
					+ creator.toString() + " "
					+ organization.getClass().getSimpleName()
					+ organization.toString() + " "
					+ member.getClass().getSimpleName() + member.toString());
		}

	}

	public static String getRandomString(int length) {
		String alphabet = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		StringBuilder str = new StringBuilder();
		for (int i = 0; i < length; i++) {
			str.append(alphabet.charAt(RANDOM.nextInt(alphabet.length())));
		}
		return str.toString();
	}

	public static String getRandomName() {
		String[] firstNames = { "Jan", "Piet", "Klaas", "Bart", "Henderikus",
				"Jerke", "Karel", "Anne", "Mirjam", "Jo", "Peter", "Inge",
				"Rolf", "Gert", "Greet", "Pieter" };
		String[] lastNames = { "Sloot", "de Vries", "van der Berg", "de Wit",
				"Klaassen", "Cohen", "Ulfson", "de Lange", "Berghuis", "Waard",
				"de Jonge", "Prins", "Vrede", "Lager", "van Rotterdam", "Post" };
		StringBuilder str = new StringBuilder();

		str.append(firstNames[RANDOM.nextInt(firstNames.length)]);
		str.append(' ');
		str.append(lastNames[RANDOM.nextInt(firstNames.length)]);
		return str.toString();
	}

	public static String getRandomEmailAddress(String name) {
		String[] tlds = { "hotmail.com", "gmail.com", "outlook.com" };
		name = name.replace(' ', '.');
		name = name.toLowerCase();

		StringBuilder str = new StringBuilder(name);
		str.append('-');
		str.append(getRandomString(6));
		str.append('@');
		str.append(tlds[RANDOM.nextInt(tlds.length)]);

		return str.toString();
	}

}
