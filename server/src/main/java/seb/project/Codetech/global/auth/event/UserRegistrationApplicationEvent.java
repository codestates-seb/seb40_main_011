package seb.project.Codetech.global.auth.event;

import lombok.Getter;
import seb.project.Codetech.user.entity.User;

@Getter
public class UserRegistrationApplicationEvent {
    private User user;
    public UserRegistrationApplicationEvent(User user){this.user = user;}
}
