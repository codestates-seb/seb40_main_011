package seb.project.Codetech.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    // 회원 예외처리
    USER_NOT_FOUND(404,"회원을 찾을 수 없습니다."),
    USER_EXISTS(409,"회원이 이미 존재합니다."),

    // 파일 예외처리
    FILE_NOT_FOUND(404, "파일을 찾을 수 없습니다."),
    FILE_NOT_ALLOW(415, "지원하지 않는 파일 형식입니다."),

    // 제품 예외처리
    PRODUCT_NOT_FOUND(404, "제품 정보를 찾을 수 없습니다."),
    PRODUCT_NOT_DELETE(401, "작성된 제품 정보는 관리자만 삭제할 수 있습니다.");

    @Getter
    private final int code;

    @Getter
    private final String message;

    ExceptionCode(int code, String message){
        this.code = code;
        this.message = message;
    }
}
