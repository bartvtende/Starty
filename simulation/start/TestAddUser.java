package start;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.Consts;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.ParseException;
import org.apache.http.client.CookieStore;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.BasicHttpContext;
import org.apache.http.protocol.HttpContext;
import org.apache.http.util.EntityUtils;

public class TestAddUser {

	private static CloseableHttpResponse response;
	private static HttpEntity entity;
	//fuck
	public static void main(String[] args) throws ParseException, IOException {
		// TODO Auto-generated method stub
		CloseableHttpClient httpclient = HttpClients.createDefault();
		CookieStore cookieStore = new BasicCookieStore();
		HttpContext httpContext = new BasicHttpContext();
		httpContext.setAttribute(HttpClientContext.COOKIE_STORE, cookieStore);
		
		response = httpclient.execute(postTest(), httpContext);
		entity = response.getEntity();
		System.out.println(response.getStatusLine());
		System.out.println(EntityUtils.toString(entity));
		response.close();
	}

	private static HttpPost postTest(){
		List<NameValuePair> formparams = new ArrayList<NameValuePair>();
		formparams.add(new BasicNameValuePair("email", "test@test.io"));
		formparams.add(new BasicNameValuePair("password", "yoloswag"));
		formparams.add(new BasicNameValuePair("name", "test"));
		UrlEncodedFormEntity entity = new UrlEncodedFormEntity(formparams, Consts.UTF_8);
		HttpPost httppost = new HttpPost("http://localhost:1337/api/users/register");
		System.out.println(httppost.getURI());
		httppost.setEntity(entity);
		
		return httppost;
	}
}
