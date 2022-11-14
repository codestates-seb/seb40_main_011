package seb.project.Codetech.product.entity;

public enum Type {
	MONITOR("모니터"),
	MOUSE("마우스"),
	MIKE("마이크"),
	KEYBOARD("키보드"),
	SPEAKER("스피커"),
	LAPTOP("랩탑"),
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

	public String getValue() {
		return value;
	}
}
