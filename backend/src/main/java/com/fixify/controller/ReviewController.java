package com.fixify.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fixify.custom_exception.ReviewNotFoundException;
import com.fixify.custom_exception.UserException;
import com.fixify.dto.ApiResponse;
import com.fixify.dto.CreateReviewRequest;
import com.fixify.entity.Review;
import com.fixify.entity.User;
import com.fixify.service.ReviewService;
import com.fixify.service.Servicesservice;
import com.fixify.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ReviewController {
	
	
	private final ReviewService reviewService;
    private final UserService userService;
    private final Servicesservice servicesservice;
    
    
    @GetMapping("/services/{serviceId}/reviews")
    public ResponseEntity<List<Review>> getReviewsByServiceId(
            @PathVariable Long serviceId) {

        List<Review> reviews = reviewService.getReviewByServiceId(serviceId);
        return ResponseEntity.ok(reviews);

    }

    @PostMapping("/services/{serviceId}/reviews")
    public ResponseEntity<Review> writeReview(
            @RequestBody CreateReviewRequest req,
            @PathVariable Long serviceId,
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        com.fixify.entity.Service service = servicesservice.findServiceById(serviceId);

        Review review = reviewService.createReview(
                req, user, service
        );
        return ResponseEntity.ok(review);

    }

    @PatchMapping("/reviews/{reviewId}")
    public ResponseEntity<Review> updateReview(
            @RequestBody CreateReviewRequest req,
            @PathVariable Long reviewId,
            @RequestHeader("Authorization") String jwt)
            throws UserException,
            ReviewNotFoundException, Exception {

        User user = userService.findUserByJwtToken(jwt);

        Review review = reviewService.updateReview(
                reviewId,
                req.getReviewText(),
                req.getReviewRating(),
                user.getId()
        );
        return ResponseEntity.ok(review);

    }

    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<ApiResponse> deleteReview(
            @PathVariable Long reviewId,
            @RequestHeader("Authorization") String jwt) throws UserException,
            ReviewNotFoundException, Exception {

        User user = userService.findUserByJwtToken(jwt);

        reviewService.deleteReview(reviewId, user.getId());
        ApiResponse res = new ApiResponse();
        res.setMessage("Review deleted successfully");
        res.setStatus(true);

        return ResponseEntity.ok(res);

    }


}
