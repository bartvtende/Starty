package model;

import java.util.Random;

import view.Frame;
import net._01001111.text.LoremIpsum;

public class Message {

	private final static int MINIMUM_WORDS = 40;
	private User sender;
	private User receiver;
	private String text;

	private LoremIpsum lorem = new LoremIpsum();
	private Random random = new Random();

	public Message(User sender, User receiver) {
		setText(generateText());
	}

	private String generateText() {
		return lorem.words(random.nextInt(80) + MINIMUM_WORDS);
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getText() {
		return text;
	}

	public void setSender(User sender) {
		this.sender = sender;
	}

	public void setReceiver(User receiver) {
		this.receiver = receiver;
	}

	public User getSender() {
		return sender;
	}

	public User getReceiver() {
		return receiver;
	}
}
