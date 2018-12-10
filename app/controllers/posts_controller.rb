class PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy]

  # GET /posts
  # GET /posts.json
  def index

    @posts = Post.all

    render json: @posts, status: 200
  end

  # GET /posts/1
  # GET /posts/1.json

  def show
    @new_comment    = Comment.build_from(@post, "")

    render json: @post, status: 200


  end

  def comments
    @post = Post.find_by_id(params[:post_id])
    @comments = @post.comment_threads.order('created_at desc')
    render json: @comments, status: 200
  end

  # POST /posts
  # POST /posts.json


   def create


    @post = current_user.posts.build(post_params)

    if @post.save

      render json: "Posted successfully", status: 201
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  # PATCH/PUT /posts/1.json
  def update
    if @post.update(post_params)
      render :show, status: :ok, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    @post.destroy
  end


  private
  # Use callbacks to share common setup or constraints between actions.
  def set_post
    @post = Post.find(params[:id])
  end

  def set_user
    @current_user = User.find_by(auth_token: request.headers["Access"])


  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def post_params
    params.require(:post).permit(:body, :coment, :comments, :title, :user_id)
  end
end
