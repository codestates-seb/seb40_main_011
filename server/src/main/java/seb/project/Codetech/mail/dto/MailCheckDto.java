package seb.project.Codetech.mail.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class MailCheckDto {

    @NotBlank
    private String code;
    private String email;
}