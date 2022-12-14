package seb.project.Codetech.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import seb.project.Codetech.review.entity.ReviewComment;

@Repository
public interface ReviewCommRepository extends JpaRepository<ReviewComment, Long> {
	void deleteAllByReviewId(Long id);
}
