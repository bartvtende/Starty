package starty.gen.api.model;

import java.util.ArrayList;
import java.util.List;

public class Test {
	String test;
	String hee;
	List<String> messages;
	int[][] vectors = {{1, 2, 3},{2, 4, 5},{2, 3, 4}};
	
	public Test(){
		messages = new ArrayList<String>();
	}
	
	public void setTest(String test){
		this.test = test;
	}
	
	public String getTest(){
		return test;
	}
	
	public void setTest2(String hee){
		this.hee = hee;
	}
	
	public String getTest2(){
		return hee;
	}
	
	public void addMessage(String message){
		messages.add(message);
	}
	
	public List<String> getMessage(){
		return messages;
	}
	
	public int[][] getVectors(){
		return this.vectors;
	}
}
