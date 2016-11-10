package com.innvo.web.rest.dto;

import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

import com.innvo.domain.User;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * A DTO extending the UserDTO, which is meant to be used in the user management UI.
 */
public class ManagedUserDTO extends UserDTO {

    public static final int PASSWORD_MIN_LENGTH = 4;
    public static final int PASSWORD_MAX_LENGTH = 100;

    private Long id;

    private ZonedDateTime createdDate;

    private String lastmodifiedby;

    private ZonedDateTime lastmodifieddate;

    @NotNull
    @Size(min = PASSWORD_MIN_LENGTH, max = PASSWORD_MAX_LENGTH)
    private String password;

    public ManagedUserDTO() {
    }

    public ManagedUserDTO(User user) {
        super(user);
        this.id = user.getId();
        this.createdDate = user.getCreatedDate();
        this.lastmodifiedby = user.getLastmodifiedby();
        this.lastmodifieddate = user.getLastmodifieddate();
        this.password = null;
    }

    public ManagedUserDTO(Long id, String login, String domain, String password, String firstName, String lastName,
                          String email, boolean activated, String langKey,String lastmodifiedby,ZonedDateTime lastmodifieddate, Set<String> authorities , ZonedDateTime createdDate, String lastModifiedBy, ZonedDateTime lastModifiedDate ) {
        super(login,domain, firstName, lastName, email, activated, langKey,lastmodifiedby,lastmodifieddate, authorities);
        this.id = id;
        this.createdDate = createdDate;
        this.lastmodifiedby = lastModifiedBy;
        this.lastmodifieddate = lastModifiedDate;
        this.password = password;
    }

    public ManagedUserDTO(Object object, String string, String string2, String string3, String string4, String string5,
			String string6, boolean b, String string7, Set<String> set, Object object2, Object object3,
			Object object4) {
		// TODO Auto-generated constructor stub
	}

	
	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
    }
    

    public String getLastmodifiedby() {
		return lastmodifiedby;
	}

	public void setLastmodifiedby(String lastmodifiedby) {
		this.lastmodifiedby = lastmodifiedby;
	}

	public ZonedDateTime getLastmodifieddate() {
		return lastmodifieddate;
	}

	public void setLastmodifieddate(ZonedDateTime lastmodifieddate) {
		this.lastmodifieddate = lastmodifieddate;
	}

	public String getPassword() {
        return password;
    }

    @Override
    public String toString() {
        return "ManagedUserDTO{" +
            "id=" + id +
            ", createdDate=" + createdDate +
            ", lastModifiedBy='" + lastmodifiedby + '\'' +
            ", lastModifiedDate=" + lastmodifieddate +
            "} " + super.toString();
    }
}