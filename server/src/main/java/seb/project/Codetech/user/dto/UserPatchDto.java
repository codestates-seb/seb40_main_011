package seb.project.Codetech.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@NoArgsConstructor
public class UserPatchDto {

    @Pattern(regexp = "^(?=.*[A-Za-z0-9가-힣])[A-Za-z0-9가-힣]{2,16}$", message = "닉네임은 2자 이상 16자 이하 대소문자 영어와 한글 숫자로 구성할 수 있습니다.")
    private String nickname;
}
