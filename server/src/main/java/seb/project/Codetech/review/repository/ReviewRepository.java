package seb.project.Codetech.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import seb.project.Codetech.review.entity.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long>, CustomReviewRepository {
}
