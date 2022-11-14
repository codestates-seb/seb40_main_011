package seb.project.Codetech.product.entity;

public enum Type {
	keyboard("키보드"), // 임시 사용을 위한 열거형 값
	mouse("마우스"),
	monitor("모니터"),
	desktop("본체"),
	notebook("노트북");

	private final String value;

	Type(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}
}
