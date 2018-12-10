class CommentsController < ApplicationController

 

def show
	 @post = Post.find_by(params[:id])
	  @comments = @post.comment_threads
end


  def create

    @post = Post.find_by(params[:id])


    commentable = commentable_type.constantize.find(commentable_id)
    @comment = Comment.build_from(commentable, current_user.id, comment)

  
      if @comment.save



        make_child_comment

        render json: "Comment was successfully added.", status: 201
      else

        render_json_error 401, "Something went wrong"
      end
   
  end




  private

  def comment_params
    params.require(:comment).permit(:id, :comment, :body, :user_id, :commentable_id, :commentable_type, :comment_id)
  end

  def commentable_type
    comment_params[:commentable_type]
  end

  def commentable_id
    comment_params[:commentable_id]
  end

  def comment_id
    comment_params[:comment_id]
  end

  def body
    comment_params[:body]
  end

  def comment
    comment_params[:comment]
  end

  def make_child_comment
    return "" if comment_id.blank?

    parent_comment = Comment.find comment_id
    @comment.move_to_child_of(parent_comment)
  end




end
