package com.fixify.service;

import java.util.List;

import com.fixify.dto.CreateReviewRequest;
import com.fixify.entity.Review;
import com.fixify.entity.User;

public interface ReviewService {
	Review createReview(CreateReviewRequest req,User user,com.fixify.entity.Service service);
	List<Review> getReviewByServiceId(Long serviceId);
	Review updateReview(Long reviewId,String reviewText,double rating,Long userId)throws  Exception;
	void deleteReview(Long reviewId,Long userId) throws  Exception;
	

}
