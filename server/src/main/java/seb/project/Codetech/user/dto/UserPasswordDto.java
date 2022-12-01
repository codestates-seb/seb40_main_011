package seb.project.Codetech.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@NoArgsConstructor
public class UserPasswordDto {

    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@!%*#?&])[A-Za-z\\d$@!%*#?&]{8,25}$", message = "비밀번호는 8자 이상 25자 이하 특수문자와 대소문자 영어 및 숫자만 허용됩니다.")
    private String oldPassword;

    @NotBlank
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@!%*#?&])[A-Za-z\\d$@!%*#?&]{8,25}$", message = "비밀번호는 8자 이상 25자 이하 특수문자와 대소문자 영어 및 숫자만 허용됩니다.")
    private String newPassword;

    @NotBlank
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@!%*#?&])[A-Za-z\\d$@!%*#?&]{8,25}$", message = "비밀번호는 8자 이상 25자 이하 특수문자와 대소문자 영어 및 숫자만 허용됩니다.")
    private String newCheckPassword;
}