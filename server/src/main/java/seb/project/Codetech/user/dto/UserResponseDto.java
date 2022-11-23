package seb.project.Codetech.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class UserResponseDto {
    private String email;
    private String nickname;
    private Long point;
    private String image;
}
