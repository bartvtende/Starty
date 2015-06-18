package model;

import java.io.IOException;
import java.nio.CharBuffer;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;

import org.apache.http.Consts;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.concurrent.FutureCallback;
import org.apache.http.impl.nio.client.CloseableHttpAsyncClient;
import org.apache.http.impl.nio.client.HttpAsyncClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.nio.client.methods.AsyncCharConsumer;
import org.apache.http.nio.client.methods.HttpAsyncMethods;
import org.apache.http.nio.protocol.HttpAsyncRequestProducer;
import org.apache.http.protocol.HttpContext;

public class AsyncConnection {
	
	public AsyncConnection() throws InterruptedException, IOException{
	CloseableHttpAsyncClient httpclient = HttpAsyncClients.createDefault();
	try {
	    // Start the client
	    httpclient.start();
	 // In real world one most likely would also want to stream
	    // request and response body content
	    final CountDownLatch latch2 = new CountDownLatch(1);
	    final HttpPost request3 = CreateAddUserPost("test", "test", "test@test.io");
	    HttpAsyncRequestProducer producer3 = HttpAsyncMethods.create(request3);
	    AsyncCharConsumer<HttpResponse> consumer3 = new AsyncCharConsumer<HttpResponse>() {

	        HttpResponse response;

	        @Override
	        protected void onResponseReceived(final HttpResponse response) {
	            this.response = response;
	        }

	        @Override
	        protected void onCharReceived(final CharBuffer buf, final IOControl ioctrl) throws IOException {
	            // Do something useful
	        }

	        @Override
	        protected void releaseResources() {
	        }

	        @Override
	        protected HttpResponse buildResult(final HttpContext context) {
	            return this.response;
	        }

	    };
	    httpclient.execute(producer3, consumer3, new FutureCallback<HttpResponse>() {

	        public void completed(final HttpResponse response3) {
	            latch2.countDown();
	            System.out.println(request3.getRequestLine() + "->" + response3.getStatusLine());
	        }

	        public void failed(final Exception ex) {
	            latch2.countDown();
	            System.out.println(request3.getRequestLine() + "->" + ex);
	        }

	        public void cancelled() {
	            latch2.countDown();
	            System.out.println(request3.getRequestLine() + " cancelled");
	        }

	    });
	    latch2.await();

	} finally {
	    httpclient.close();
	}}
	public HttpPost CreateAddUserPost(String email, String password, String name){
		List<NameValuePair> formparams = new ArrayList<NameValuePair>();
		formparams.add(new BasicNameValuePair("email", email));
		formparams.add(new BasicNameValuePair("password", password));
		formparams.add(new BasicNameValuePair("name", name));
		UrlEncodedFormEntity entity = new UrlEncodedFormEntity(formparams, Consts.UTF_8);
		HttpPost httppost = new HttpPost("localhost:1337/api/users/register");
		httppost.setEntity(entity);
		return httppost;
	}
	
}


