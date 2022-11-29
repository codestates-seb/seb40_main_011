package seb.project.Codetech.product.entity;

import seb.project.Codetech.global.converter.TypeValue;

public enum Type implements TypeValue {

	DESKTOP("데스크탑"),
	LAPTOP("노트북"),
	MONITOR("모니터"),
	KEYBOARD("키보드"),
	MOUSE("마우스"),
	ETC("기타");

	private final String value;

	Type(String value) {
		this.value = value;
	}

	@Override
	public String getValue() {
		return value;
	}
}
