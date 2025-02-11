package com.fixify.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fixify.custom_exception.ReviewNotFoundException;
import com.fixify.dto.CreateReviewRequest;
import com.fixify.entity.Review;
import com.fixify.entity.User;
import com.fixify.repository.ReviewRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

	
	private final ReviewRepository reviewRepository;
	
	@Override
	public Review createReview(CreateReviewRequest req, User user, com.fixify.entity.Service service) {
		Review newReview = new Review();

        newReview.setReviewText(req.getReviewText());
        newReview.setRating(req.getReviewRating());
        newReview.setServiceImages(req.getServiceImages());
        newReview.setUser(user);
        newReview.setService(service);

        service.getReviews().add(newReview);

        return reviewRepository.save(newReview);
    
	}

	@Override
	public List<Review> getReviewByServiceId(Long serviceId) {
		// TODO Auto-generated method stub
		return reviewRepository.findByServiceId(serviceId);
	}

	@Override
	public Review updateReview(Long reviewId, String reviewText, double rating, Long userId) throws Exception {
		  Review review=reviewRepository.findById(reviewId)
	                .orElseThrow(()-> new ReviewNotFoundException("Review Not found"));

	        if(review.getUser().getId()!=userId){
	            throw new Exception("You do not have permission to delete this review");
	        }

	        review.setReviewText(reviewText);
	        review.setRating(rating);
	        return reviewRepository.save(review);
	}

	@Override
	public void deleteReview(Long reviewId, Long userId) throws Exception {
		Review review=reviewRepository.findById(reviewId)
                .orElseThrow(()-> new ReviewNotFoundException("Review Not found"));
        if(review.getUser().getId()!=userId){
            throw new Exception("You do not have permission to delete this review");
        }
        reviewRepository.delete(review);
		
	}

}
