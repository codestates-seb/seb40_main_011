package seb.project.Codetech.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb.project.Codetech.file.entity.FileEntity;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class UserResponseDto {
    private String email;
    private String nickname;
    private Long point;
    private List<FileEntity> fileEntities;
}
