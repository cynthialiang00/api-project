import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as rvwActions from '../../../../store/review';
import { useEffect} from "react";
import { useParams } from "react-router-dom";
import OpenModalButton from "../../../OpenModalButton/index";
import PostReviewModal from "./PostReviewModal";
import DeleteReviewModal from "./DeleteReviewModal";

function ReadReviews ({isOwner}) {
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const reviews = useSelector(state=>state.reviews.spot);
    const newestReview = useSelector(state=>state.reviews.new);    
    const sessionUser = useSelector(state => state.session.user);



    useEffect(() => {
        dispatch(rvwActions.thunkGetRvws(spotId))
    }, [dispatch, spotId, newestReview])

    const reviewsArr = Object.values(reviews);
 

    reviewsArr.reverse();

    // takes in json   and returns [Month, year] in array
    const toMonthYear = (updatedAt) => {
        const tempDate = new Date(updatedAt);
        const splitDate = tempDate.toDateString().split(' ');
        return [splitDate[1], splitDate[3]];
    }

    if (!reviewsArr.length && sessionUser && !isOwner) {
        return (
            <div className="reviews-list">

                <OpenModalButton
                    buttonText="Add Your Review!"
                    modalComponent={<PostReviewModal id={spotId} />}
                    id={"post-rvw-btn"}
                />

                <div className="review-container">
                    Be the first to post a review!
                </div>
                
            </div>
        )
    }
    return (
            <div className="reviews-list">
                { sessionUser && !isOwner && !reviewsArr.find(rvw => rvw.User.id === sessionUser.id) ?
                    <OpenModalButton
                        buttonText="Add Your Review!"
                        modalComponent={<PostReviewModal id={spotId} />}
                        id={"post-rvw-btn"}
                    />
                :
                null
                }

                {reviewsArr.map((rvw) => (
                    <div key={rvw.id} className="review-container">

                        <div className="review-firstName">{rvw.User.firstName}</div>

                        <div className="review-date">
                            {`${toMonthYear(rvw.updatedAt)[0]}, ${toMonthYear(rvw.updatedAt)[1]}`}
                        </div>
                        <div className="review-body">{rvw.review}</div>

                        { sessionUser && !isOwner && rvw.User.id === sessionUser.id ?
                                <OpenModalButton
                                    buttonText="Delete"
                                    modalComponent={<DeleteReviewModal id={rvw.id}/>}
                                    id={"delete-rvw-btn"}
                                />
                        :
                            null
                        }
                        
                    </div>
                ))}
            </div>

        
    )

}

export default ReadReviews;