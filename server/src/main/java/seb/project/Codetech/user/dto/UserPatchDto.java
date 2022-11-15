package seb.project.Codetech.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserPatchDto {
    private Long id;
    private String email;
    private String nickname;
    private String password;
    private String image;
}
