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
import javax.servlet.http.HttpServletResponse;
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
    public ResponseEntity<UserResponseDto> registerUser(@Valid @RequestBody UserPostDto register){
        User user = mapper.userRegisterToUser(register);
        User registerUser = userService.registerUser(user);
        return ResponseEntity.ok(mapper.userToUserResponseDto(registerUser));
    }

    @Transactional
    @PatchMapping("/user/image")
    public ResponseEntity<UserResponseDto> patchUserImage(@AuthenticationPrincipal String email,
                                                     @RequestPart MultipartFile file) throws IOException {
        User user = userService.findUser(email);
        FileEntity saveFile = fileService.saveFile(file);
        FileEntity serviceFile = fileService.setUploadUser(user,saveFile);
        user.setImage(serviceFile.getPath());
        return ResponseEntity.ok(mapper.userToUserResponseDto(user));
    }

    @Transactional
    @PatchMapping("/user/nickname")
    public ResponseEntity<UserResponseDto> patchUser(@AuthenticationPrincipal String email,
                                                          @RequestBody @Valid UserPatchDto patch){
        User user = userService.updateUser(email,patch);
        return ResponseEntity.ok(mapper.userToUserResponseDto(user));
    }

    @PatchMapping("/user/password")
    public ResponseEntity<UserResponseDto> patchUserPassword(@AuthenticationPrincipal String email,
                                            @RequestBody @Valid UserPasswordDto passwordDto){
        User loginUser = userService.checkPassword(email,passwordDto);
        return ResponseEntity.ok(mapper.userToUserResponseDto(loginUser));
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
        userService.logout(request, email);
    }

    @PostMapping("/logout")
    public void logoutUser(@AuthenticationPrincipal String email, HttpServletRequest request){
        userService.logout(request, email);
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

    @Transactional(readOnly = true)
    @GetMapping("/user/answers")
    public ResponseEntity<UserAndAnswersDto> getAnswers(@AuthenticationPrincipal String email,
                                                          @Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                                          @Positive @RequestParam(value = "size",defaultValue = "5") int size,
                                                          @RequestParam(value = "sort",defaultValue = "createAt") String sort){
        UserAndAnswersDto userAndAnswersDto = userService.userAndAnswersDto(email,page-1,size,sort);
        return ResponseEntity.ok(userAndAnswersDto);
    }

    @Transactional(readOnly = true)
    @GetMapping("/user/recommends")
    public ResponseEntity<UserAndReviewsDto> getRecommends(@AuthenticationPrincipal String email,
                                                           @Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                                           @Positive @RequestParam(value = "size",defaultValue = "5") int size,
                                                           @RequestParam(value = "sort",defaultValue = "createAt") String sort){
        UserAndReviewsDto userAndRecommendsDto = userService.userAndRecommendsDto(email,page-1,size,sort);
        return ResponseEntity.ok(userAndRecommendsDto);
    }

    @Transactional
    @PostMapping("/refresh")
    public ResponseEntity<UserResponseDto> refresh(HttpServletRequest request, HttpServletResponse response){
        User user = userService.checkRefresh(request,response);
        return ResponseEntity.ok(mapper.userToUserResponseDto(user));
    }
}
