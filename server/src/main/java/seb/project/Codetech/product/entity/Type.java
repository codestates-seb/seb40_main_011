package seb.project.Codetech.product.entity;

import seb.project.Codetech.global.converter.TypeValue;

public enum Type implements TypeValue {
	MONITOR("모니터"),
	MOUSE("마우스"),
	MICE("마이크"),
	KEYBOARD("키보드"),
	SPEAKER("스피커"),
	NOTEBOOK("노트북"),
	GAMEPAD("게임패드"),
	TABLET("타플랫"),
	MODEM("모뎀"),
	HEADSET("해드셋"),
	PHONE("핸드폰"),
	LIGHTBAR("라이트바"),
	WEBCAM("웹캠");

	private final String value;

	Type(String value) {
		this.value = value;
	}

	@Override
	public String getValue() {
		return value;
	}
}
