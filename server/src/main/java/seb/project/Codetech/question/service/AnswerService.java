package seb.project.Codetech.question.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import seb.project.Codetech.question.dto.AnswerServiceDto;
import seb.project.Codetech.question.entity.Answer;
import seb.project.Codetech.question.mapper.AnswerServiceMapper;
import seb.project.Codetech.question.respository.AnswerRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class AnswerService {
	private final AnswerRepository answerRepository;
	private final AnswerServiceMapper dtoMapper;

	public Long createdAnswer(AnswerServiceDto.Create dto) {
		Answer answer = dtoMapper.createdDtoToEntity(dto);

		return answerRepository.save(answer).getId();
	}

	public Long updatedAnswer(Long id, String content) {
		Answer answer = findVerifiedOne(id);
		answer.updateContent(content);

		return answer.getId();
	}

	public void deletedAnswer(Long id) {
		Answer answer = findVerifiedOne(id);
		answerRepository.delete(answer);
	}

	@Transactional(readOnly = true)
	public Answer findVerifiedOne(Long id) {
		Optional<Answer> found = answerRepository.findById(id);

		return found.orElseThrow(
			() -> new RuntimeException("ANSWER_NOT_FOUND")
		);
	}
}
