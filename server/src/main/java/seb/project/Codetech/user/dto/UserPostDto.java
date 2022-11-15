package seb.project.Codetech.user.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class UserPostDto {

    @NotBlank
    private String email;

    @NotBlank
    private String nickname;

    @NotBlank
    private String password;
}
