package starty.gen.api.model;
// Generated Jun 17, 2015 11:42:46 AM by Hibernate Tools 3.1.0.beta4

import javax.persistence.Column;
import javax.persistence.Embeddable;


/**
 * ProjectUsersId generated by hbm2java
 */
@Embeddable

public class ProjectUsersId  implements java.io.Serializable {


    // Fields    

     private int uid;
     private int pid;


    // Constructors

    /** default constructor */
    public ProjectUsersId() {
    }

    
    /** full constructor */
    public ProjectUsersId(int uid, int pid) {
        this.uid = uid;
        this.pid = pid;
    }
    

   
    // Property accessors
    @Column(name="UID", unique=false, nullable=false, insertable=true, updatable=true)

    public int getUid() {
        return this.uid;
    }
    
    public void setUid(int uid) {
        this.uid = uid;
    }
    @Column(name="PID", unique=false, nullable=false, insertable=true, updatable=true)

    public int getPid() {
        return this.pid;
    }
    
    public void setPid(int pid) {
        this.pid = pid;
    }
   



   public boolean equals(Object other) {
         if ( (this == other ) ) return true;
		 if ( (other == null ) ) return false;
		 if ( !(other instanceof ProjectUsersId) ) return false;
		 ProjectUsersId castOther = ( ProjectUsersId ) other; 
         
		 return (this.getUid()==castOther.getUid())
 && (this.getPid()==castOther.getPid());
   }
   
   public int hashCode() {
         int result = 17;
         
         result = 37 * result + this.getUid();
         result = 37 * result + this.getPid();
         return result;
   }   





}
