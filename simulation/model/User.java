package model;

public class User {

	private String name;
	private String password;
	private String email;

	/**
	 * randomly created user
	 */
	public User() {
		setName(Generator.getRandomName());
		setPassword(Generator.getRandomString(20));
		setEmail(Generator.getRandomEmailAddress(getName()));
	}

	public User(String name, String password, String email) {
		setName(name);
		setPassword(password);
		setEmail(email);
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		StringBuilder str = new StringBuilder();
		str.append('{');

		str.append("Name: ");
		str.append(this.getName());
		str.append(';');

		str.append("Password: ");
		str.append(this.getPassword());
		str.append(';');

		str.append("Email: ");
		str.append(this.getEmail());
		str.append(';');

		str.append("};");

		return str.toString();
	}

}
