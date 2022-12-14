package seb.project.Codetech.snackreview.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import seb.project.Codetech.snackreview.entity.SnackReview;

@Repository
public interface SnackReviewRepository extends JpaRepository<SnackReview, Long>, CustomSnackReviewRepository {
}
