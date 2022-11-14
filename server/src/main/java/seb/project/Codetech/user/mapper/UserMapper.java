package seb.project.Codetech.user.mapper;

import org.mapstruct.Mapper;
import seb.project.Codetech.user.dto.UserPostDto;
import seb.project.Codetech.user.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User userRegisterToUser(UserPostDto register);
}
