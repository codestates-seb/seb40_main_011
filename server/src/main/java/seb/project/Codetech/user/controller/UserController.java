package seb.project.Codetech.user.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb.project.Codetech.user.dto.UserPatchDto;
import seb.project.Codetech.user.dto.UserPostDto;
import seb.project.Codetech.user.entity.User;
import seb.project.Codetech.user.mapper.UserMapper;
import seb.project.Codetech.user.service.UserService;

import javax.validation.Valid;

@RestController
@Validated
@RequestMapping("/api")
@Slf4j
public class UserController {
    private final UserService userService;
    private final UserMapper mapper;

    public UserController(UserService userService, UserMapper mapper){
        this.userService = userService;
        this.mapper = mapper;
    }

    @PostMapping("/register")
    public ResponseEntity registerUser(@Valid @RequestBody UserPostDto register){
        User user = mapper.userRegisterToUser(register);
        User registerUser = userService.registerUser(user);
        return ResponseEntity.ok(registerUser);
    }

    @PatchMapping("/user")
    public ResponseEntity patchUser(@Valid @RequestBody UserPatchDto patch,
                                    Long id){
        User user = userService.updateUser(mapper.userPatchDtoToUser(patch),id);
        return ResponseEntity.ok(mapper.userToUserResponseDto(user));
    }
}
