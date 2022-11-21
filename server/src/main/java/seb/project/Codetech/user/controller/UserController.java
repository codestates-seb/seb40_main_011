package seb.project.Codetech.user.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb.project.Codetech.user.dto.UserPatchDto;
import seb.project.Codetech.user.dto.UserPostDto;
import seb.project.Codetech.user.dto.UserWithdrawDto;
import seb.project.Codetech.user.entity.User;
import seb.project.Codetech.user.mapper.UserMapper;
import seb.project.Codetech.user.service.UserService;

import javax.servlet.http.HttpServletRequest;
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
    public ResponseEntity patchUser(@AuthenticationPrincipal String email,
                                    @Valid @RequestBody UserPatchDto patch){
        User user = userService.updateUser(email,mapper.userPatchDtoToUser(patch));
        return ResponseEntity.ok(mapper.userToUserResponseDto(user));
    }

    @GetMapping("/user")
    public ResponseEntity getUser(@AuthenticationPrincipal String email){
        User user = userService.findUser(email);
        return ResponseEntity.ok(mapper.userToUserResponseDto(user));
    }

    @GetMapping("/withdraw")
    public void withdrawUser(@AuthenticationPrincipal String email,
                                       @Valid @RequestBody UserWithdrawDto withdraw,
                                       HttpServletRequest request){
        User user = userService.withdrawUser(email,mapper.userWithdrawDtoToUser(withdraw));
        UserService.logout(request);
    }

    @GetMapping("/logout")
    public void logoutUser(HttpServletRequest request){
        UserService.logout(request);
    }
}
