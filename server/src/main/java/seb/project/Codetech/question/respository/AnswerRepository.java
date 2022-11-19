package seb.project.Codetech.question.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import seb.project.Codetech.question.entity.Answer;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
}
