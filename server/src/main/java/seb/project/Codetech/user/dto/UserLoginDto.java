package seb.project.Codetech.user.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class UserLoginDto {

    @NotBlank
    private String email;

    @NotBlank
    private String password;
}
