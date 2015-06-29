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

public class StartSimulation {

	private static LoremIpsum lorem = new LoremIpsum();
	private final static int ORG_AMOUNT = 1; //default 10
	private final static int PROJ_PER_ORG_AMOUNT = 1; //default 10
	private final static int USER_PER_PROJ_AMOUNT = 10; //default 100
	private final static int ISSUE_PER_PROJ_AMOUNT = 100; //default 100
	private final static int BACKLOG_PER_PROJ_AMOUNT = 100; //default 100
	private final static int SPRINT_PER_PROJ_AMOUNT = 2; //default 2
	private final static int LIST_PER_SPRINT_AMOUNT = 5; //default 5
	private final static int ITEM_PER_LIST_AMOUNT = 10; //default 10
	//total # of users = ORG_AMOUNT * PROJ_PER_ORG_AMOUNT * USER_PER_PROJ_AMOUNT + ORG_AMOUNT;
	//the '+ ORG_AMOUNT' is because there is a separate user created as the creator of an organization.
	
	
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
		for (int i = 0; i < ORG_AMOUNT; i++) {
			User creator = new User("test-creator", "test", "test" + rs + i + "@test.io");
			
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
			
				for(int j =0; j<PROJ_PER_ORG_AMOUNT;j++){
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
					for(int k=0;k<USER_PER_PROJ_AMOUNT;k++){
						String newUserMail = null;
						int newUserId = 0;
						response = con.ExecuteHttpRequestBase(con.CreateAddUserPost("org-employee"+rs+i+j+k+"@test.io", "test", "test"+k));
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
					for(int k=0;k<ISSUE_PER_PROJ_AMOUNT;k++){
						//create issue
						response = con.ExecuteHttpRequestBase(con.CreateItemIssuePost(token, "issues", rs.substring(1, 3)+i+j+k, userJson, projectId, "Issue"+rs+i+j+k, lorem.words(15), "Open", "Bug", "Critical", "3"));
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
					for(int k=0;k<BACKLOG_PER_PROJ_AMOUNT;k++){
						//create backlog
						response = con.ExecuteHttpRequestBase(con.CreateItemBacklogPost(token, "backlog", rs.substring(1, 3)+i+j+k, userJson, projectId, "Backlog"+rs+i+j+k, lorem.words(15), "Open", "3"));
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
					for(int k=0;k<SPRINT_PER_PROJ_AMOUNT;k++){
						String sprintId = null;
						//create backlog
						response = con.ExecuteHttpRequestBase(con.CreateSprintPost(token, projectId, "sprint"+i+j+k));
						entity = response.getEntity();
						try {
							entityString = EntityUtils.toString(entity);
							System.out.println("ES Sprint: "+entityString);
							JsonElement jsonElement = jsonParser.parse(entityString);
							JsonObject jsonObject = jsonElement.getAsJsonObject();
							JsonObject sprint = jsonObject.get("result").getAsJsonObject();
							sprintId = sprint.get("_id").getAsString();
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
						for(int l=0;l<LIST_PER_SPRINT_AMOUNT;l++){
							String listId = null;
							//create backlog
							response = con.ExecuteHttpRequestBase(con.CreateListPost(token, sprintId, "spr"+rs+i+j+k+l, new Integer(l).toString(), "true"));
							entity = response.getEntity();
							try {
								entityString = EntityUtils.toString(entity);
								System.out.println(entityString);
								JsonElement jsonElement = jsonParser.parse(entityString);
								JsonObject jsonObject = jsonElement.getAsJsonObject();
								JsonObject list = jsonObject.get("result").getAsJsonObject();
								listId = list.get("_id").getAsString();
								
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
							
							for(int m=0;m<ITEM_PER_LIST_AMOUNT;m++){
								//create backlog
								response = con.ExecuteHttpRequestBase(con.CreateItemPost(token, listId, "i"+rs+i+j+k+l+m, "item"+rs+i+j+k+l+m, lorem.words(15), "completed", new Integer(4).toString()));
								entity = response.getEntity();
								try {
									entityString = EntityUtils.toString(entity);
									System.out.println("ITEM ES: "+entityString);
									
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
				JsonObject jsonObject = jsonParser.parse(user).getAsJsonObject();
				String jsonId = jsonObject.get("id").getAsString();
				
				CloseableHttpResponse response = con.ExecuteHttpRequestBase(con.CreateGlobalMessagePost(token, new Integer(projectId).intValue(), lorem.words(20), jsonId));
				HttpEntity entity = response.getEntity();
				try {
					String entityString = EntityUtils.toString(entity);
					System.out.println("MESSAGE ES: "+entityString);
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
				
				for(int i = 0; i<users.size();i++){
					String receiverId = null;
					String userReceiver = users.get(i);
					JsonObject jsonObjectReceiver = jsonParser.parse(userReceiver).getAsJsonObject();
					String receiverJsonId = jsonObjectReceiver.get("id").getAsString();
					
					if(!receiverJsonId.equals(jsonId)){
						response = con.ExecuteHttpRequestBase(con.CreatePrivateMessagePost(token, new Integer(receiverJsonId).intValue(), new Integer(projectId).intValue(), lorem.words(15), jsonId));
						entity = response.getEntity();
						try {
							String entityString = EntityUtils.toString(entity);
							System.out.println("MESSAGE ES: "+entityString);
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
				
			}
		}
		
		long endTime = System.currentTimeMillis();
		long pastTime = endTime - startTime;

		System.out.println("Start time: " + new Date(startTime));
		System.out.println("End time: " + new Date(endTime));
		System.out.println("Used time: " + new Date(pastTime));
	}

}
