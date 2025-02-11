import React from 'react'
import ReviewCard from './ReviewCard'
import { Divider } from '@mui/material'

const Review = () => {
    return (
        <div className='p-5 lg:p-20 flex flex-col lg:flex-row gap-20'>
            <section className='w-full md:w-1/2 lg:w-[30%] space-y-2'>
                <img className='w-full' src="/banarasi-saree 1.jpg"
                    // Services.Service?.images[0]
                    alt="" />
                <div>
                    <div>
                        <p className='font-bold text-xl'> Auti Repairs Shop{/*products.product?.seller?.businessDetails.businessName*/}

                        </p>
                        <p className='text-lg text-gray-600'>{/*products.product?.title*/}AC Maintainace</p>
                    </div>

                    <div className='space-y-2'>
                        <div className='price flex items-center gap-3 mt-5 text-lg'>
                            <span className="font-semibold text-gray-800"> ₹750</span>
                            <span className="text-gray-400 line-through"> ₹1000</span>
                            <span className="text-primary font-semibold"> 25% off</span>
                        </div>
                    </div>

                </div>
            </section>
            <section className="w-full md:w-1/2 lg:w-[70%] space-y-3">
                <h1 className="font-semibold text-lg pb-4">
                    Review & Ratings
                </h1>
                {[1, 1, 1, 1].map((item) => <div className='space-y-3'> <ReviewCard />
                    <Divider />
                </div>)}

            </section>
        </div>
    )
}

{/* <RatingCard/>
                <div className='mt-10'>
                    <div className="space-y-5">
                        {review.reviews.map((item, i) => (
                            <div className='space-y-5'>
                                <ProductReviewCard item={item} />
                                {review.reviews.length - 1 !== i && <Divider />}
                            </div>
                        ))}
                    </div>
                </div> */}

export default Review


