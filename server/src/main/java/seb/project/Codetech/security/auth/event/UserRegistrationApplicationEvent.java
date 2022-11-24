package seb.project.Codetech.security.auth.event;

import lombok.Getter;
import seb.project.Codetech.user.entity.User;

@Getter
public class UserRegistrationApplicationEvent {
	private User user;

	public UserRegistrationApplicationEvent(User user) {
		this.user = user;
	}
}
