package view;

import java.awt.Container;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.BoxLayout;
import javax.swing.JFrame;
import javax.swing.JLabel;

import model.Generator;
import controller.ParameterField;
import controller.StartButton;

public class Frame extends JFrame {

	private StartButton startButton = new StartButton("Start");
	private ParameterField messages = new ParameterField(3360);
	private ParameterField users = new ParameterField(21);
	private ParameterField organizations = new ParameterField(3);
	private Container cp;
	
	public Frame(){
		cp = this.getContentPane();
		startButtonSetup();
		cp.setLayout(new BoxLayout(cp, BoxLayout.Y_AXIS));
		cp.add(new JLabel("amount of messages"));
		cp.add(messages);
		cp.add(new JLabel("amount of users"));
		cp.add(users);
		cp.add(new JLabel("amount of organizations"));
		cp.add(organizations);
		cp.add(startButton);
	}
	
	private void startButtonSetup(){
		startButton.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent arg0) {
				// TODO Auto-generated method stub
				int messageCount = new Integer(messages.getText()).intValue();
				int userCount = new Integer(users.getText()).intValue();
				int organizationCount = new Integer(organizations.getText()).intValue();
				Generator generator = new Generator(messageCount, userCount, organizationCount);
				generator.run();
			}
		});
	}
}
