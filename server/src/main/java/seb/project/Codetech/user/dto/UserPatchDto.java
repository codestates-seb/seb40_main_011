package seb.project.Codetech.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
public class UserPatchDto {

    @NotBlank
    @Size(min = 2,max = 20)
    private String nickname;
}
