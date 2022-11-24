package seb.project.Codetech.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import seb.project.Codetech.recommend.entity.Recommend;
import seb.project.Codetech.review.entity.Review;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findAllByRecommendsIn(List<Recommend> recommends);
}
