import mongoose from "mongoose"
import { Comment } from "../models/comment.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const { videoId } = req.params
    const { page = 1, limit = 10 } = req.query

    
})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    /* 
        1. take the content from the user, req.body.
        2. Check the existence of it.
        3. Then, get the video id from the params.
        4. get the user id from the req.user (token)
        5. Then, store & save them in the comments db.
    */
    const { content } = req.body;
    const videoId = req.params.videoId;
    const userId = req.user._id;
    
    if (!content) {
        throw new ApiError(400, "Content is invalid");
    }
    if (!videoId) {
        throw new ApiError(400, "Video Id doesn't exist")
    }

    const comment = await Comment.create({
        content,
        video: videoId,
        owner: userId
    });
    await comment.save();

    return res
        .status(200)
        .json(
            new ApiResponse(200, comment, "Comment created successfully")
        )
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    /* 
        1. Get the commentId from the params.
        2. get and update the comment schema.
        3. then, send the response.
    */

    const { commentId } = req.params;
    const { updatedContent } = req.body;

    if (!updatedContent) {
        throw new ApiError(400, "Content is invalid")
    }

    if (!commentId) {
        throw new ApiError(400, "Comment Id is invalid.");
    }

    const updateComment = await Comment.findByIdAndUpdate(
        commentId,
        {
            $set: {
                content: updatedContent,
            }
        },
        {
            new: true
        }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(200, updateComment, "Comment updated successfully")
        )

})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment

    const { commentId } = req.params;
    if (!commentId) {
        throw new ApiError(400, "Comment Id is invalid.")
    }

    const comment = await Comment.findByIdAndDelete(commentId);

    return res
    .status(200)
    .json(
        new ApiResponse(200, comment, "Comment deleted successfully.")
    )
})

export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
}
