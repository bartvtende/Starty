package starty.gen.api.model;
// Generated Jun 17, 2015 11:42:46 AM by Hibernate Tools 3.1.0.beta4

import javax.persistence.Column;
import javax.persistence.Embeddable;


/**
 * BacklogItemsId generated by hbm2java
 */
@Embeddable

public class BacklogItemsId  implements java.io.Serializable {


    // Fields    

     private String id;
     private String projectId;


    // Constructors

    /** default constructor */
    public BacklogItemsId() {
    }

    
    /** full constructor */
    public BacklogItemsId(String id, String projectId) {
        this.id = id;
        this.projectId = projectId;
    }
    

   
    // Property accessors
    @Column(name="id", unique=false, nullable=false, insertable=true, updatable=true, length=6)

    public String getId() {
        return this.id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    @Column(name="project_id", unique=false, nullable=false, insertable=true, updatable=true, length=50)

    public String getProjectId() {
        return this.projectId;
    }
    
    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }
   



   public boolean equals(Object other) {
         if ( (this == other ) ) return true;
		 if ( (other == null ) ) return false;
		 if ( !(other instanceof BacklogItemsId) ) return false;
		 BacklogItemsId castOther = ( BacklogItemsId ) other; 
         
		 return ( (this.getId()==castOther.getId()) || ( this.getId()!=null && castOther.getId()!=null && this.getId().equals(castOther.getId()) ) )
 && ( (this.getProjectId()==castOther.getProjectId()) || ( this.getProjectId()!=null && castOther.getProjectId()!=null && this.getProjectId().equals(castOther.getProjectId()) ) );
   }
   
   public int hashCode() {
         int result = 17;
         
         result = 37 * result + ( getId() == null ? 0 : this.getId().hashCode() );
         result = 37 * result + ( getProjectId() == null ? 0 : this.getProjectId().hashCode() );
         return result;
   }   





}
