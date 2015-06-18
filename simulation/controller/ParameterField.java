package controller;

import javax.swing.JTextField;

public class ParameterField extends JTextField {
	
	public ParameterField(int defaultNumber){
		this.setText(new Integer(defaultNumber).toString());
	}
	
}
