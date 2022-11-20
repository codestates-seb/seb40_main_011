package seb.project.Codetech.global.exception;

import lombok.Getter;

public enum ExceptionCode {

	USER_NOT_FOUND(404, "회원을 찾을 수 없습니다."),
	USER_EXISTS(409, "회원이 이미 존재합니다."),
	PASSWORD_NOT_MATCH(404, "비밀번호가 일치하지 않습니다."),

	SNACK_REVIEW_NOT_FOUND(404, "한줄리뷰를 찾을 수 없습니다."),

	FILE_NOT_FOUND(404, "파일을 찾을 수 없습니다."),
	FILE_NOT_ALLOW(415, "지원하지 않는 파일 형식입니다."),

	PRODUCT_NOT_FOUND(404, "제품 정보를 찾을 수 없습니다."),
	PRODUCT_NOT_USE(401, "제품 관련 기능은 회원만 사용할 수 있습니다."),
	PRODUCT_NOT_DELETE(403, "작성된 제품 정보는 관리자만 삭제할 수 있습니다."),

	QUESTION_NOT_FOUND(404, "질문을 찾을 수 없습니다."),
	QUESTION_UPDATE_NOT_ALLOWED(400, "답변이 작성된 질문은 수정할 수 없습니다."),
	ADOPTED_ANSWER_EXIST(400, "채택된 답변이 이미 존재합니다."),

	ANSWER_NOT_FOUND(404, "답변을 찾을 수 없습니다.");

	@Getter
	private final int code;

	@Getter
	private final String message;

	ExceptionCode(int code, String message) {
		this.code = code;
		this.message = message;
	}
}
