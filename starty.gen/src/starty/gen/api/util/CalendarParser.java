package starty.gen.api.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;
import java.util.TimeZone;
/**
 * All method for parsing of a date
 * @author Henderikus Harms
 * @date 22 jun. 2015
 */
public class CalendarParser {
	private String dateFormat;
	
	/**
	 * new calendar
	 * @param dateFormat
	 */
	public CalendarParser(String dateFormat){
		this.dateFormat = dateFormat;
	}
	
	/**
	 * Parse calendar to string
	 * @param c
	 * @return
	 */
	public String parseDateToString(Calendar c){
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(dateFormat);
		return simpleDateFormat.format(c.getTime());
	}
	
	public String parseDateToISOString(Calendar c){
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm'Z'");
		return simpleDateFormat.format(c.getTime());
	}
	
	public String getDateSearchString(Calendar c){
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm'Z'");
		c.set(Calendar.MILLISECOND, 0);
		c.set(Calendar.SECOND, 0);
		c.set(Calendar.MINUTE, 0);
		c.set(Calendar.HOUR, 0);
		//c.setTimeZone(TimeZone.getDefault());
		return simpleDateFormat.format(c.getTime());
	}
	
	/*
	public String getDateSearchNextDayString(Calendar c){
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm'Z'");
		c.set(Calendar.MILLISECOND, 0);
		c.set(Calendar.SECOND, 0);
		c.set(Calendar.MINUTE, 0);
		c.set(Calendar.HOUR, 23);
		c.add(Calendar.DATE, 1);
		return simpleDateFormat.format(c.getTime());
	}
	*/
	
	public Calendar parseIsoStringToCalendar(String date){
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm'Z'");
		Calendar calendar = null;
		try{
			simpleDateFormat.parse(date);
			calendar = simpleDateFormat.getCalendar();
		}catch(ParseException e){
			e.printStackTrace();
		}
		return calendar;
	}
	
	/**
	 * parse Isodate String to calendar
	 * @param date
	 * @return
	 */
	public Calendar parseIsoDateString(String date){
		//System.out.println("parse " + date);
		DateFormat simpleDateFormat = new SimpleDateFormat("EEE MMM dd HH:mm:ss zzz yyyy", Locale.ENGLISH);
		Calendar calendar = null;
		try{
			simpleDateFormat.parse(date);
			calendar = simpleDateFormat.getCalendar();
		}catch(ParseException e){
			e.printStackTrace();
		}
		return calendar;
	}

	
	
	/**
	 * Parse string of date to Calendar
	 * @param date
	 * @param dateFormat
	 * @return
	 */
	public Calendar parseStringToCalendar(String date){
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(dateFormat);
		Calendar calendar = null;
		try{
			simpleDateFormat.parse(date);
			calendar = simpleDateFormat.getCalendar();
		}catch(ParseException e){
			e.printStackTrace();
		}
		return calendar;
	}
	
	/**
	 * get currenttime in used format
	 * @return
	 */
	public Calendar getCurrentDate(){
		Calendar cal = Calendar.getInstance();
		return this.parseStringToCalendar(this.parseDateToString(cal));
	}
	
	/**
	 * check if date is On saturday or sunday
	 * @param c
	 * @return boolean 
	 */
	public boolean checkIfWeekend(Calendar c){
		int dayOfWeek = c.get(Calendar.DAY_OF_WEEK);
		if(dayOfWeek == Calendar.SATURDAY || dayOfWeek == Calendar.SUNDAY){
			return true;
		}
		return false;
	}
	
	/**
	 * check if day is monday
	 * @param c
	 * @return
	 */
	public boolean checkIfMonday(Calendar c){
		int dayOfWeek = c.get(Calendar.DAY_OF_WEEK);
		if(dayOfWeek == Calendar.MONDAY){
			return true;
		}
		return false;
	}
	/**
	 * check if currentdate is passed
	 * @param start
	 * @return
	 */
	public boolean checkIfDatePassed(Calendar x, Calendar y){
		long t1 = x.getTimeInMillis() / 86400000 * 86400000;
		long t2 = y.getTimeInMillis() / 86400000 * 86400000;
		//System.out.println(t1 + "check " + t2);
		if(Long.compare(t1, t2) > 0){
			//System.out.println(t1 + " " + t2);
			return true;
		}
		return false;
	}
	
}
