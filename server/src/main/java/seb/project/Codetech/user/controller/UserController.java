package seb.project.Codetech.user.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import seb.project.Codetech.file.entity.FileEntity;
import seb.project.Codetech.file.service.FileService;
import seb.project.Codetech.user.dto.*;
import seb.project.Codetech.user.entity.User;
import seb.project.Codetech.user.mapper.UserMapper;
import seb.project.Codetech.user.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;

@RestController
@Validated
@RequestMapping("/api")
@Slf4j
public class UserController {
    private final UserService userService;
    private final UserMapper mapper;
    private final FileService fileService;

    public UserController(UserService userService, UserMapper mapper, FileService fileService){
        this.userService = userService;
        this.mapper = mapper;
        this.fileService = fileService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@Valid @RequestBody UserPostDto register){
        User user = mapper.userRegisterToUser(register);
        User registerUser = userService.registerUser(user);
        return ResponseEntity.ok(registerUser);
    }

    @Transactional
    @PatchMapping("/user")
    public ResponseEntity<UserResponseDto> patchUser(@AuthenticationPrincipal String email,
                                                     @RequestPart @Valid UserPatchDto patch,
                                                     @RequestPart MultipartFile file) throws IOException {
        User user = mapper.userPatchDtoToUser(patch);
        User serviceUser = userService.updateUser(email,user);
        FileEntity saveFile = fileService.saveFile(file);
        FileEntity serviceFile = fileService.setUploadUser(serviceUser,saveFile);
        serviceUser.setImage(serviceFile.getPath());
        return ResponseEntity.ok(mapper.userToUserResponseDto(serviceUser));
    }

    @Transactional
    @GetMapping("/user")
    public ResponseEntity<UserResponseDto> getUser(@AuthenticationPrincipal String email){
        User user = userService.findUser(email);
        return ResponseEntity.ok(mapper.userToUserResponseDto(user));
    }

    @PatchMapping("/withdraw")
    public void withdrawUser(@AuthenticationPrincipal String email,
                             @Valid @RequestBody UserWithdrawDto withdraw,
                                       HttpServletRequest request){
        userService.withdrawUser(email,withdraw);
        userService.logout(request);
    }

    @PostMapping("/logout")
    public void logoutUser(HttpServletRequest request){
        userService.logout(request);
    }

    @Transactional(readOnly = true)
    @GetMapping("/user/snack-reviews")
    public ResponseEntity<UserAndSnackReviewsDto> getSnackReviews(@AuthenticationPrincipal String email,
                                                                  @Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                                                  @Positive @RequestParam(value = "size",defaultValue = "5") int size,
                                                                  @RequestParam(value = "sort",defaultValue = "createAt") String sort){
        UserAndSnackReviewsDto userAndSnackReviewsDto = userService.userAndSnackReviewsDto(email,page-1,size,sort);
        return ResponseEntity.ok(userAndSnackReviewsDto);
    }

    @Transactional(readOnly = true)
    @GetMapping("/user/questions")
    public ResponseEntity<UserAndQuestionsDto> getQuestions(@AuthenticationPrincipal String email,
                                                            @Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                                            @Positive @RequestParam(value = "size",defaultValue = "5") int size,
                                                            @RequestParam(value = "sort",defaultValue = "createAt") String sort){
        UserAndQuestionsDto userAndQuestionsDto = userService.userAndQuestionsDto(email,page-1,size,sort);
        return ResponseEntity.ok(userAndQuestionsDto);
    }

    @Transactional(readOnly = true)
    @GetMapping("/user/reviews")
    public ResponseEntity<UserAndReviewsDto> getReviews(@AuthenticationPrincipal String email,
                                                        @Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                                        @Positive @RequestParam(value = "size",defaultValue = "5") int size,
                                                        @RequestParam(value = "sort",defaultValue = "createAt") String sort){
        UserAndReviewsDto userAndReviewsDto = userService.userAndReviewsDto(email,page-1,size,sort);
        return ResponseEntity.ok(userAndReviewsDto);
    }


}
