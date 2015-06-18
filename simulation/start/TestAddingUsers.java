package start;

import java.io.IOException;
import java.util.Date;

import org.apache.http.HttpEntity;
import org.apache.http.ParseException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.util.EntityUtils;

import model.Connection;
import model.Generator;
import model.SimulatedData;
import model.User;

public class TestAddingUsers {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Connection con = new Connection();

		long startTime = System.currentTimeMillis();
		String rl = Generator.getRandomString(4);
		//le hardcode ;)
		String jsonName = "\"token\":";
		for (int i = 0; i < 10/* 00 */; i++) {
			User u = new User("test", "test", "test" + rl + i + "@test.io");
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
				String entityString = EntityUtils.toString(entity);
				SimulatedData.addToken(entityString.substring(
						entityString.indexOf(jsonName) + jsonName.length() + 1,
						entityString.indexOf(
								"\"",
								entityString.indexOf(jsonName)
										+ jsonName.length() + 1)));

			} catch (ParseException | IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}

		}
		long endTime = System.currentTimeMillis();
		long pastTime = endTime - startTime;

		System.out.println("Start time: " + new Date(startTime));
		System.out.println("End time: " + new Date(endTime));
		System.out.println("Used time: " + new Date(pastTime));
	}

}
