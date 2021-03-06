package model;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.Consts;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.CookieStore;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicHeader;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.BasicHttpContext;
import org.apache.http.protocol.HttpContext;

public class Connection {

	private static final String DEFAULT_ADDRESS = "http://localhost:1337/api";
	private String address;
	private CloseableHttpClient httpclient = HttpClients.createDefault();
	private CookieStore cookieStore = new BasicCookieStore();
	private HttpContext httpContext = new BasicHttpContext();
	
	public Connection(){
		address = DEFAULT_ADDRESS;
		httpContext.setAttribute(HttpClientContext.COOKIE_STORE, cookieStore);
	}
	
	public Connection(String address){
		this.address = address;
		httpContext.setAttribute(HttpClientContext.COOKIE_STORE, cookieStore);
	}
	
	public HttpPost CreateAddUserPost(String email, String password, String name){
		List<NameValuePair> formparams = new ArrayList<NameValuePair>();
		formparams.add(new BasicNameValuePair("email", email));
		formparams.add(new BasicNameValuePair("password", password));
		formparams.add(new BasicNameValuePair("name", name));
		UrlEncodedFormEntity entity = new UrlEncodedFormEntity(formparams, Consts.UTF_8);
		HttpPost httppost = new HttpPost(address+"/users/register");
		httppost.setEntity(entity);
		return httppost;
	}
	
	public HttpPost CreateNewOrganizationPost(String token, String user, String name){
		List<NameValuePair> formparams = new ArrayList<NameValuePair>();
		formparams.add(new BasicNameValuePair("name", name));
		UrlEncodedFormEntity entity = new UrlEncodedFormEntity(formparams, Consts.UTF_8);
		
		HttpPost httppost = new HttpPost(address+"/organizations");
		BasicHeader header = new BasicHeader("Authorization", "Bearer "+token);
		BasicHeader headerUser = new BasicHeader("user", user);
		httppost.addHeader(header);
		httppost.addHeader(headerUser);
		httppost.setEntity(entity);
		return httppost;
	}
	
	public HttpPost CreateNewProjectPost(String token, String user, String shortcode, String name, String description){
		List<NameValuePair> formparams = new ArrayList<NameValuePair>();
		formparams.add(new BasicNameValuePair("shortcode", shortcode));
		formparams.add(new BasicNameValuePair("name", name));
		formparams.add(new BasicNameValuePair("description", description));
		UrlEncodedFormEntity entity = new UrlEncodedFormEntity(formparams, Consts.UTF_8);
		
		HttpPost httppost = new HttpPost(address+"/projects");
		BasicHeader header = new BasicHeader("Authorization", "Bearer "+token);
		BasicHeader headerUser = new BasicHeader("user", user);
		httppost.addHeader(header);
		httppost.addHeader(headerUser);
		httppost.setEntity(entity);
		return httppost;
	}
	
	public HttpPost CreateInvitePost(String token, String user, String email){
		List<NameValuePair> formparams = new ArrayList<NameValuePair>();
		formparams.add(new BasicNameValuePair("email", email));
		UrlEncodedFormEntity entity = new UrlEncodedFormEntity(formparams, Consts.UTF_8);
		
		HttpPost httppost = new HttpPost(address+"/organizations/invite");
		BasicHeader header = new BasicHeader("Authorization", "Bearer "+token);
		BasicHeader headerUser = new BasicHeader("user", user);
		httppost.addHeader(header);
		httppost.addHeader(headerUser);
		httppost.setEntity(entity);
		return httppost;
	}
	
	
	public HttpPost CreatePrivateMessagePost(String token, int receiverId, int projectId, String message, String userId){
		List<NameValuePair> formparams = new ArrayList<NameValuePair>();
		formparams.add(new BasicNameValuePair("receiverId", new Integer(receiverId).toString()));
		formparams.add(new BasicNameValuePair("message", message));
		formparams.add(new BasicNameValuePair("userId", userId));
		UrlEncodedFormEntity entity = new UrlEncodedFormEntity(formparams, Consts.UTF_8);
		
		HttpPost httppost = new HttpPost(address+"/messages/"+projectId+"/"+receiverId);
		BasicHeader header = new BasicHeader("Authorization", "Bearer "+token);
		httppost.addHeader(header);
		httppost.setEntity(entity);
		return httppost;
	}
	
	public HttpPost CreateGlobalMessagePost(String token, int projectId, String Message, String userId){
		List<NameValuePair> formparams = new ArrayList<NameValuePair>();
		formparams.add(new BasicNameValuePair("message", Message));
		formparams.add(new BasicNameValuePair("userId", userId));
		UrlEncodedFormEntity entity = new UrlEncodedFormEntity(formparams, Consts.UTF_8);
		
		HttpPost httppost = new HttpPost(address+"/messages/"+projectId);
		BasicHeader header = new BasicHeader("Authorization", "Bearer "+token);
		httppost.addHeader(header);
		httppost.setEntity(entity);
		return httppost;
	}
	
	public HttpPost CreateJoinProjectPost(String token, String user, String shortCode){
		List<NameValuePair> formparams = new ArrayList<NameValuePair>();
		formparams.add(new BasicNameValuePair("shortcode", shortCode));
		UrlEncodedFormEntity entity = new UrlEncodedFormEntity(formparams, Consts.UTF_8);
		
		HttpPost httppost = new HttpPost(address+"/organizations/invite");
		BasicHeader header = new BasicHeader("Authorization", "Bearer "+token);
		BasicHeader headerUser = new BasicHeader("user", user);
		httppost.addHeader(header);
		httppost.addHeader(headerUser);
		httppost.setEntity(entity);
		return httppost;
	}
	
	public HttpPost CreateItemIssuePost(String token, String model, String id, String user, String projectId,
			String title, String description, String status, String type, String priority, String timeExpected){
		List<NameValuePair> formparams = new ArrayList<NameValuePair>();
		formparams.add(new BasicNameValuePair("id", id));
		formparams.add(new BasicNameValuePair("project_id", projectId));
		formparams.add(new BasicNameValuePair("title", title));
		formparams.add(new BasicNameValuePair("description", description));
		formparams.add(new BasicNameValuePair("status", status));
		formparams.add(new BasicNameValuePair("type", type));
		formparams.add(new BasicNameValuePair("priority", priority));
		formparams.add(new BasicNameValuePair("time_expected", timeExpected));
		UrlEncodedFormEntity entity = new UrlEncodedFormEntity(formparams, Consts.UTF_8);
		
		HttpPost httppost = new HttpPost(address+"/items/"+model);
		BasicHeader header = new BasicHeader("Authorization", "Bearer "+token);
		BasicHeader headerUser = new BasicHeader("user", user);
		httppost.addHeader(header);
		httppost.addHeader(headerUser);
		httppost.setEntity(entity);
		return httppost;
	}
	
	public HttpPost CreateSprintPost(String token, String projectId, String name, String startDate, String endDate){
		List<NameValuePair> formparams = new ArrayList<NameValuePair>();
		formparams.add(new BasicNameValuePair("projectId", projectId));
		formparams.add(new BasicNameValuePair("name", name));
		formparams.add(new BasicNameValuePair("startAt", startDate));
		formparams.add(new BasicNameValuePair("endAt", endDate));
		UrlEncodedFormEntity entity = new UrlEncodedFormEntity(formparams, Consts.UTF_8);
		
		HttpPost httppost = new HttpPost(address+"/boards/sprints");
		BasicHeader header = new BasicHeader("Authorization", "Bearer "+token);
		httppost.addHeader(header);
		httppost.setEntity(entity);
		return httppost;
	}
	
	public HttpPost CreateListPost(String token, String sprintId,  String name, String order, String completed){
		List<NameValuePair> formparams = new ArrayList<NameValuePair>();
		formparams.add(new BasicNameValuePair("sprintId", sprintId));
		formparams.add(new BasicNameValuePair("name", name));
		formparams.add(new BasicNameValuePair("order", order));
		formparams.add(new BasicNameValuePair("completed", completed));
		UrlEncodedFormEntity entity = new UrlEncodedFormEntity(formparams, Consts.UTF_8);
		
		HttpPost httppost = new HttpPost(address+"/boards/lists");
		BasicHeader header = new BasicHeader("Authorization", "Bearer "+token);
		httppost.addHeader(header);
		httppost.setEntity(entity);
		return httppost;
	}
	
	public HttpPost CreateItemPost(String token, String listId, String shortCode, String title, String description, 
			String status, String expectedTime){
		List<NameValuePair> formparams = new ArrayList<NameValuePair>();
		formparams.add(new BasicNameValuePair("listId", listId));
		formparams.add(new BasicNameValuePair("shortcode", shortCode));
		formparams.add(new BasicNameValuePair("title", title));
		formparams.add(new BasicNameValuePair("description", description));
		formparams.add(new BasicNameValuePair("status", status));
		formparams.add(new BasicNameValuePair("expectedTime", expectedTime));
		UrlEncodedFormEntity entity = new UrlEncodedFormEntity(formparams, Consts.UTF_8);
		
		HttpPost httppost = new HttpPost(address+"/boards/items");
		BasicHeader header = new BasicHeader("Authorization", "Bearer "+token);
		httppost.addHeader(header);
		httppost.setEntity(entity);
		return httppost;
	}
	
	public HttpPost CreateItemBacklogPost(String token, String model, String id, String user, String projectId,
			String title, String description, String status, String timeExpected){
		List<NameValuePair> formparams = new ArrayList<NameValuePair>();
		formparams.add(new BasicNameValuePair("id", id));
		formparams.add(new BasicNameValuePair("project_id", projectId));
		formparams.add(new BasicNameValuePair("title", title));
		formparams.add(new BasicNameValuePair("description", description));
		formparams.add(new BasicNameValuePair("status", status));
		formparams.add(new BasicNameValuePair("time_expected", timeExpected));
		UrlEncodedFormEntity entity = new UrlEncodedFormEntity(formparams, Consts.UTF_8);
		
		HttpPost httppost = new HttpPost(address+"/items/"+model);
		BasicHeader header = new BasicHeader("Authorization", "Bearer "+token);
		BasicHeader headerUser = new BasicHeader("user", user);
		httppost.addHeader(header);
		httppost.addHeader(headerUser);
		httppost.setEntity(entity);
		return httppost;
	}
	
	public HttpPost CreateItemUpdatePost(String token, String user, String model, String id, String projectId, 
			String title, String status, String description, String timeExpected, String priority, String type){
		List<NameValuePair> formparams = new ArrayList<NameValuePair>();
		formparams.add(new BasicNameValuePair("id", id));
		formparams.add(new BasicNameValuePair("project_id", projectId));
		formparams.add(new BasicNameValuePair("title", title));
		formparams.add(new BasicNameValuePair("status", status));
		formparams.add(new BasicNameValuePair("decription", description));
		formparams.add(new BasicNameValuePair("time_expected", timeExpected));
		formparams.add(new BasicNameValuePair("priority", priority));
		formparams.add(new BasicNameValuePair("type", type));
		UrlEncodedFormEntity entity = new UrlEncodedFormEntity(formparams, Consts.UTF_8);
		
		HttpPost httppost = new HttpPost(address+"/items/"+model);
		BasicHeader header = new BasicHeader("Authorization", "Bearer "+token);
		BasicHeader headerUser = new BasicHeader("user", user);
		httppost.addHeader(header);
		httppost.addHeader(headerUser);
		httppost.setEntity(entity);
		return httppost;
	}
	
	public CloseableHttpResponse ExecuteHttpRequestBase(HttpRequestBase request){
		try {
			return httpclient.execute(request, httpContext);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
}
