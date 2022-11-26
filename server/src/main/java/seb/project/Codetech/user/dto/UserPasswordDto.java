package seb.project.Codetech.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Pattern;

@Getter
@Setter
@NoArgsConstructor
public class UserPasswordDto {

    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@!%*#?&])[A-Za-z\\d$@!%*#?&]{8,16}$", message = "비밀번호는 8자 이상 16자 이하 특수문자와 대소문자 영어 및 숫자만 허용됩니다.")
    private String oldPassword;

    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@!%*#?&])[A-Za-z\\d$@!%*#?&]{8,16}$", message = "비밀번호는 8자 이상 16자 이하 특수문자와 대소문자 영어 및 숫자만 허용됩니다.")
    private String newPassword;

    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@!%*#?&])[A-Za-z\\d$@!%*#?&]{8,16}$", message = "비밀번호는 8자 이상 16자 이하 특수문자와 대소문자 영어 및 숫자만 허용됩니다.")
    private String newCheckPassword;
}