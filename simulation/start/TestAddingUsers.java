package start;

import java.io.IOException;
import java.util.Date;

import org.apache.http.HttpEntity;
import org.apache.http.ParseException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.util.EntityUtils;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import model.Connection;
import model.Generator;
import model.SimulatedData;
import model.User;

public class TestAddingUsers {

	
	
	public static void main(String[] args) {
		JsonParser jsonParser = new JsonParser();
		
		// TODO Auto-generated method stub
		Connection con = new Connection();

		long startTime = System.currentTimeMillis();
		String rl = Generator.getRandomString(4);
		//le hardcode ;)
		for (int i = 0; i < 10/* 00 */; i++) {
			User u = new User("test", "test", "test" + rl + i + "@test.io");
			
			String userJson = null;
			String token = null;
			String entityString = null;
			if (i % 100 == 0) {
			}
			CloseableHttpResponse response = con.ExecuteHttpRequestBase(con
					.CreateAddUserPost(u.getEmail(), u.getPassword(),
							u.getName()));
			HttpEntity entity = response.getEntity();
			try {
				response.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			try {
				entityString = EntityUtils.toString(entity);
				response.close();
				JsonElement jsonElement = jsonParser.parse(entityString);
				JsonObject jsonObject = jsonElement.getAsJsonObject();
				System.out.println("Via GSON: " +jsonObject.get("token").getAsString());
				System.out.println("Via GSON User: " +jsonObject.get("user")/*.getAsString()*/);
				token = jsonObject.get("token").getAsString();
				userJson = jsonObject.get("user").toString();
				SimulatedData.addToken(token);

			} catch (ParseException | IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			
			response = con.ExecuteHttpRequestBase(con.CreateNewOrganizationPost(token, userJson, "org"+rl+i));
			entity = response.getEntity();
			try {
				entityString = EntityUtils.toString(entity);
				
			} catch (ParseException | IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		long endTime = System.currentTimeMillis();
		long pastTime = endTime - startTime;

		System.out.println("Start time: " + new Date(startTime));
		System.out.println("End time: " + new Date(endTime));
		System.out.println("Used time: " + new Date(pastTime));
	}

}
