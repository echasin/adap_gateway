package com.innvo.web.rest.dto;

import com.innvo.config.Constants;

import com.innvo.domain.Authority;
import com.innvo.domain.User;

import org.hibernate.validator.constraints.Email;

import javax.validation.constraints.*;

import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
/**
 * A DTO representing a user, with his authorities.
 */
public class UserDTO {

    @NotNull
    @Pattern(regexp = Constants.LOGIN_REGEX)
    @Size(min = 1, max = 50)
    private String login;

    @NotNull
    @Size(min = 4, max = 25)
    private String domain;
    
    @Size(max = 50)
    private String firstName;

    @Size(max = 50)
    private String lastName;

    @Email
    @Size(min = 5, max = 100)
    private String email;

    private boolean activated = false;

    @Size(min = 2, max = 5)
    private String langKey;
    
    private String lastmodifiedby;
    
    private ZonedDateTime lastmodifieddate;

    private Set<String> authorities;

    public UserDTO() {
    }

    public UserDTO(User user) {
        this(user.getLogin(), user.getDomain(), user.getFirstName(), user.getLastName(),
            user.getEmail(), user.getActivated(), user.getLangKey(),user.getLastmodifiedby(),user.getLastmodifieddate(),
            user.getAuthorities().stream().map(Authority::getName)
                .collect(Collectors.toSet()));
    }

    public UserDTO(String login, String domain, String firstName, String lastName,
        String email, boolean activated, String langKey,String lastmodifiedby,ZonedDateTime lastmodifieddate,Set<String> authorities) {

        this.login = login;
        this.domain = domain;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.activated = activated;
        this.langKey = langKey;
        this.lastmodifiedby=lastmodifiedby;
        this.lastmodifieddate=lastmodifieddate;
        this.authorities = authorities;
    }

    public UserDTO(String string, String string2, String string3, String string4, String string5, boolean b,
			String string6, HashSet hashSet) {
		// TODO Auto-generated constructor stub
	}

	public String getLogin() {
        return login;
    }
    
    public String getDomain() {
        return domain;
    }


    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public boolean isActivated() {
        return activated;
    }

    public String getLangKey() {
        return langKey;
    }

    public Set<String> getAuthorities() {
        return authorities;
    }
    
    public String getLastmodifiedby() {
		return lastmodifiedby;
	}

	public ZonedDateTime getLastmodifieddate() {
		return lastmodifieddate;
	}

	@Override
    public String toString() {
        return "UserDTO{" +
            "login='" + login + '\'' +
            ", firstName='" + firstName + '\'' +
            ", lastName='" + lastName + '\'' +
            ", email='" + email + '\'' +
            ", activated=" + activated +
            ", langKey='" + langKey + '\'' +    
            ", lastmodifiedby='" + lastmodifiedby + '\'' +
            ", lastmodifieddate='" + lastmodifieddate + '\'' +
            ", authorities=" + authorities +
            "}";
    }
}