package start;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;

import net._01001111.text.LoremIpsum;

import org.apache.http.HttpEntity;
import org.apache.http.ParseException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.util.EntityUtils;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import model.Connection;
import model.Generator;
import model.Organization;
import model.SimulatedData;
import model.User;

public class TestAddingUsers {

	private static LoremIpsum lorem = new LoremIpsum();
	
	public static void main(String[] args) {
		JsonParser jsonParser = new JsonParser();
		String token = null;
		//storage for message things
		ArrayList<Organization> organizations = new ArrayList<Organization>();
		
		HashMap<String, ArrayList<String>> projectUserList = new HashMap<String, ArrayList<String>>();
		ArrayList<String> projectIds = new ArrayList<String>();
		
		
		// TODO Auto-generated method stub
		Connection con = new Connection();

		long startTime = System.currentTimeMillis();
		//random string
		String rs = Generator.getRandomString(4);
		//le hardcode ;)
		for (int i = 0; i < 1; i++) {
			User creator = new User("test", "test", "test" + rs + i + "@test.io");
			
			String userJson = null;
			token = null;
			String entityString = null;
			if (i % 100 == 0) {
			}
			CloseableHttpResponse response = con.ExecuteHttpRequestBase(con
					.CreateAddUserPost(creator.getEmail(), creator.getPassword(),
							creator.getName()));
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
				JsonObject user = jsonObject.get("user").getAsJsonObject();
				creator.setId(user.get("id").toString());
				System.out.println("Via GSON: " +jsonObject.get("token").getAsString());
				System.out.println("Via GSON User: " +jsonObject.get("user"));
				token = jsonObject.get("token").getAsString();
				userJson = jsonObject.get("user").toString();
				SimulatedData.addToken(token);

			} catch (ParseException | IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			
			response = con.ExecuteHttpRequestBase(con.CreateNewOrganizationPost(token, userJson, "org"+rs+i));
			entity = response.getEntity();
			try {
				entityString = EntityUtils.toString(entity);
				JsonElement jsonElement = jsonParser.parse(entityString);
				JsonObject jsonObject = jsonElement.getAsJsonObject();
				JsonObject jsonOrganization = jsonObject.get("result").getAsJsonObject();
				String organizationId = jsonOrganization.get("id").getAsString();
				String organizationName = jsonOrganization.get("name").getAsString();
				Organization organization = new Organization(organizationId, creator, organizationName);
				organization.addUser(creator);
				organizations.add(organization);
				
				System.out.println(entityString);
				//JsonObject user = jsonObject.get("user").getAsJsonObject();
			} catch (ParseException | IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			try {
				response.close();
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			
				for(int j =0; j<10;j++){
					//add project
					response = con.ExecuteHttpRequestBase(con.CreateNewProjectPost(token, userJson, "pr"+rs+i+j, "project"+rs+i+j, lorem.words(40)));
					entity = response.getEntity();
					String projectId = null;
					String shortCode = null;
					try {
						entityString = EntityUtils.toString(entity);
						JsonElement jsonElementProject = jsonParser.parse(entityString);
						JsonObject jsonObjectProject = jsonElementProject.getAsJsonObject();
						JsonObject project = jsonObjectProject.get("result").getAsJsonObject();
						shortCode = project.get("shortcode").toString();
						projectId = project.get("id").getAsString();
						
					} catch (ParseException | IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					ArrayList<String> users = new ArrayList<String>();
					for(int k=0;k<100;k++){
						String newUserMail = null;
						int newUserId = 0;
						response = con.ExecuteHttpRequestBase(con.CreateAddUserPost("org-employee"+rs+i+j+k+"@test.io", "test", "test"));
						entity = response.getEntity();
						String newUserString = null;
						try {
							entityString = EntityUtils.toString(entity);
							JsonElement jsonElement = jsonParser.parse(entityString);
							System.out.println(entityString);
							JsonObject jsonObject = jsonElement.getAsJsonObject();
							JsonObject newUser = jsonObject.get("user").getAsJsonObject();
							newUserMail = newUser.get("email").getAsString();
							newUserId = newUser.get("id").getAsInt();
							newUserString = newUser.toString();
							users.add(newUserString);
						} catch (ParseException | IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
						try {
							response.close();
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
						//create organisation invite
						response = con.ExecuteHttpRequestBase(con.CreateInvitePost(token, userJson, newUserMail));
						entity = response.getEntity();
						try {
							entityString = EntityUtils.toString(entity);
						} catch (ParseException | IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
						try {
							response.close();
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
						//create project join
						response = con.ExecuteHttpRequestBase(con.CreateJoinProjectPost(token, newUserString, shortCode));
						entity = response.getEntity();
						try {
							entityString = EntityUtils.toString(entity);
						} catch (ParseException | IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
						try {
							response.close();
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
						
						
					}
					projectUserList.put(projectId, users);
					
				}
		}
		
		//make messages down here
		Iterator<String> keys = projectUserList.keySet().iterator();
		
		while(keys.hasNext()){
			String projectId = keys.next();
			ArrayList<String> users	= projectUserList.get(projectId);
			
			
			
			Iterator<String> userIterator = users.iterator();
			while(userIterator.hasNext()){
				String user = userIterator.next();
				CloseableHttpResponse response = con.ExecuteHttpRequestBase(con.CreateGlobalMessagePost(token, new Integer(projectId).intValue(), lorem.words(20), user));
				HttpEntity entity = response.getEntity();
				try {
					String entityString = EntityUtils.toString(entity);
				} catch (ParseException | IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				try {
					response.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}	
				
				
			}
		}
		
		long endTime = System.currentTimeMillis();
		long pastTime = endTime - startTime;

		System.out.println("Start time: " + new Date(startTime));
		System.out.println("End time: " + new Date(endTime));
		System.out.println("Used time: " + new Date(pastTime));
	}

}
