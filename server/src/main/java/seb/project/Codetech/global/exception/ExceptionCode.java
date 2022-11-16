package seb.project.Codetech.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    USER_NOT_FOUND(404,"회원을 찾을 수 없습니다."),
    USER_EXISTS(409,"회원이 이미 존재합니다.");

    @Getter
    private int code;

    @Getter
    private String message;

    ExceptionCode(int code, String message){
        this.code = code;
        this.message = message;
    }
}
