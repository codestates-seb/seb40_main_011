package seb.project.Codetech.recommend.service;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb.project.Codetech.global.exception.BusinessLogicException;
import seb.project.Codetech.global.exception.ExceptionCode;
import seb.project.Codetech.recommend.dto.RecommendDto;
import seb.project.Codetech.recommend.entity.Recommend;
import seb.project.Codetech.recommend.repository.RecommendRepository;
import seb.project.Codetech.review.entity.Review;
import seb.project.Codetech.review.repository.ReviewRepository;
import seb.project.Codetech.user.entity.User;
import seb.project.Codetech.user.repository.UserRepository;

import java.util.Optional;

@Service
@Transactional
@Log4j2
public class RecommendService {

    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;
    private final RecommendRepository repository;

    public RecommendService(UserRepository userRepository, ReviewRepository reviewRepository,
                            RecommendRepository repository){
        this.userRepository = userRepository;
        this.repository = repository;
        this.reviewRepository = reviewRepository;
    }

    public Recommend createRecommend(String email, Long reviewId){
        Recommend recommend = new Recommend();
        recommend.setUser(findUser(email));
        recommend.setReview(findVerificationReview(reviewId));
        return repository.save(recommend);
    }

    public Long findUserId(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        User findUser = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return findUser.getId();
    }

    public User findVerifiedUser(long id){
        Optional<User> optionalUser = userRepository.findById(id);
        return optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
    }

    public User findUser(String email){
        Long id = findUserId(email);
        return findVerifiedUser(id);
    }

    public Review findVerificationReview(Long id) {
        Optional<Review> findReview = reviewRepository.findById(id);
        return findReview.orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
    }

    public Recommend editRecommend(String email, RecommendDto post) {

        User user = findUser(email);
        Review review = findVerificationReview(post.getReviewId());
        Recommend recommend = new Recommend();

        if(user.getId().equals(findVerificationReview(post.getReviewId()).getUser().getId())){
            throw new BusinessLogicException(ExceptionCode.RECOMMEND_NOT_ALLOW);
        }
        if(repository.findByUserAndReview(user.getId(), post.getReviewId())!=null){
            review.setRecommendNumber(review.getRecommendNumber()-1);
            repository.delete(repository.findByUserAndReview(user.getId(), post.getReviewId()));
            return recommend;
        }


        review.setRecommendNumber(review.getRecommendNumber()+1);
        reviewRepository.save(review);
        recommend.setReview(findVerificationReview(post.getReviewId()));
        recommend.setUser(findUser(email));
        return repository.save(recommend);

    }
}
