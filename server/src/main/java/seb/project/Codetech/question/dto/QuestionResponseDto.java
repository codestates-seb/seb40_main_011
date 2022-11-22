package seb.project.Codetech.question.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class QuestionResponseDto {
	@Getter
	@AllArgsConstructor
	public static class Slice {
		private boolean hasNext;
		private List<Card> cards;
	}

	@Getter
	@Setter
	@NoArgsConstructor
	public static class Card {
		private Long id;
		private String content;
		private String nickname;
		private String image;
		private Long adoptedId;
		private boolean deleted;
		private LocalDateTime createdAt;
		private LocalDateTime modifiedAt;
		private List<AnswerCard> answerCards;
	}

	@Getter
	@NoArgsConstructor
	public static class AnswerCard {
		private Long id;
		private Long questionId;
		private String content;
		private String nickname;
		private String image;
		private LocalDateTime createdAt;
		private LocalDateTime modifiedAt;
	}

	@Getter
	@AllArgsConstructor
	public static class Adopt {
		private Long id;
		private Long adoptedId;
	}
}
