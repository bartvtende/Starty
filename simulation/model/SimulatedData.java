package model;

import java.util.LinkedList;
import java.util.Random;

public class SimulatedData {

	public static LinkedList<String> tokens = new LinkedList<String>();
	private static Random random = new Random();
	
	public static void addToken(String token){
		tokens.addLast(token);
	}
	
	public static String getRandomToken(){
		return tokens.get(random.nextInt(tokens.size()));
	}
}
