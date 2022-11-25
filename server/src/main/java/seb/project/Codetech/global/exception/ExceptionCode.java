package seb.project.Codetech.global.exception;

import lombok.Getter;

public enum ExceptionCode {

	// 회원 예외처리
	USER_NOT_FOUND(404, "회원을 찾을 수 없습니다."),
	USER_EXISTS(409, "회원이 이미 존재합니다."),
	PASSWORD_NOT_MATCH(404, "비밀번호가 일치하지 않습니다."),
	NEW_PASSWORD_NOT_MATCH(404,"두 새로운 비밀번호가 일치하지 않습니다."),

	// 상세리뷰 예외처리
	REVIEW_NOT_MODIFY(401, "작성자만 상세리뷰를 수정할 수 있습니다."),
	REVIEW_NOT_DELETE(401, "작성자만 상세리뷰를 삭제할 수 있습니다."),
	REVIEW_NOT_FOUND(404, "상세리뷰를 찾을 수 없습니다."),
	REVIEW_COMM_NOT_MODIFY(401, "작성자만 댓글을 수정할 수 있습니다."),
	REVIEW_COMM_NOT_DELETE(401, "작성자만 댓글을 삭제할 수 있습니다."),
	REVIEW_COMM_NOT_FOUND(404, "댓글을 찾을 수 없습니다."),

	// 스낵리뷰 예외처리
	SNACK_REVIEW_NOT_FOUND(404, "한줄리뷰를 찾을 수 없습니다."),

	// 파일 예외처리
	FILE_NOT_FOUND(404, "파일을 찾을 수 없습니다."),
	FILE_NOT_ALLOW(415, "지원하지 않는 파일 형식입니다."),

	// 제품 예외처리
	PRODUCT_NOT_FOUND(404, "제품 정보를 찾을 수 없습니다."),
	PRODUCT_NOT_USE(401, "제품 관련 기능은 회원만 사용할 수 있습니다."),
	PRODUCT_NOT_DELETE(403, "작성된 제품 정보는 관리자만 삭제할 수 있습니다."),

	QUESTION_NOT_FOUND(404, "질문을 찾을 수 없습니다."),
	QUESTION_UPDATE_NOT_ALLOWED(400, "답변이 작성된 질문은 수정할 수 없습니다."),
	THIS_QUESTION_ADOPTED_ANSWER_ALREADY_EXIST(400, "채택된 답변이 이미 존재합니다."),

	ANSWER_NOT_FOUND(404, "답변을 찾을 수 없습니다."),

	RECOMMEND_NOT_FOUND(404,"추천을 찾을 수 없습니다."),
	RECOMMEND_NOT_ALLOW(404,"글쓴이는 추천할 수 없습니다.");

	@Getter
	private final int code;

	@Getter
	private final String message;

	ExceptionCode(int code, String message) {
		this.code = code;
		this.message = message;
	}
}
