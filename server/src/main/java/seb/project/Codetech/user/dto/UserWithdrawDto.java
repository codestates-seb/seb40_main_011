package seb.project.Codetech.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;

@Getter
@Setter
@NoArgsConstructor
public class UserWithdrawDto {
    private Long id;

    @Email(message = "올바른 이메일 형식이 아닙니다.")
    private String email;

    private String password;
    private boolean status;
}
