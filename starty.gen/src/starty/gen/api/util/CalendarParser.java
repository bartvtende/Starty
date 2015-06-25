package starty.gen.api.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

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
}
