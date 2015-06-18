package start;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.Consts;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.CookieStore;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.BasicHttpContext;
import org.apache.http.protocol.HttpContext;
import org.apache.http.util.EntityUtils;

public class TestHttpAgain {

	private static CloseableHttpResponse response;
	private static HttpEntity entity;
	
	public static void main(String[] args) throws ClientProtocolException, IOException {
		// TODO Auto-generated method stub
		String address = "http://royal.figueus.com/create-account.php";
		
		CloseableHttpClient httpclient = HttpClients.createDefault();
		CookieStore cookieStore = new BasicCookieStore();
		HttpContext httpContext = new BasicHttpContext();
		httpContext.setAttribute(HttpClientContext.COOKIE_STORE, cookieStore);
		
		HttpGet httpget = new HttpGet(address);
		//response = httpclient.execute(postTest(), httpContext);
		//entity = response.getEntity();
		//System.out.println(response.getStatusLine());
		//System.out.println(EntityUtils.toString(entity));
		//response.close();
		
		System.out.println("\n \n");
		
		response = httpclient.execute(httpget, httpContext);
		entity = response.getEntity();
		System.out.println(httpget.getURI());
		System.out.println(response.getStatusLine());
		System.out.println(EntityUtils.toString(entity));
		response.close();
		
		System.out.println("\n \n");
		
				
		System.out.println("Post logon cookies:");
		List<Cookie> cookies = cookieStore.getCookies();
		cookies = cookieStore.getCookies();
        if (cookies.isEmpty()) {
            System.out.println("None");
        } else {
            for (int i = 0; i < cookies.size(); i++) {
                System.out.println("- " + cookies.get(i).toString());
            }
        }
        
        System.out.println(cookieStore.toString());
		
	}
	
	private static HttpPost postTest(){
		List<NameValuePair> formparams = new ArrayList<NameValuePair>();
		formparams.add(new BasicNameValuePair("username", "test"));
		formparams.add(new BasicNameValuePair("password", "test"));
		UrlEncodedFormEntity entity = new UrlEncodedFormEntity(formparams, Consts.UTF_8);
		HttpPost httppost = new HttpPost("http://royal.figueus.com/login.php");
		System.out.println(httppost.getURI());
		httppost.setEntity(entity);
		
		return httppost;
	} 

}
