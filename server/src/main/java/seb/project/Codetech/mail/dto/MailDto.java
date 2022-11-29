package seb.project.Codetech.mail.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class MailDto {

        @NotBlank
        @Email(message = "올바른 이메일 형식이 아닙니다.")
        private String email;
}
