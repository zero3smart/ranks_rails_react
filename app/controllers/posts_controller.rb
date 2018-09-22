class PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy]
  before_action :set_user, only: [:show, :update, :destroy, :new]

  # GET /posts
  # GET /posts.json
  def indexx
    @posts = Post.all
    render json: @posts, status: 200
  end

  def index
    render json: {
      posts: Post.paginate(page: page),
      page: page,
      pages: Post.pages

    }
  end


  def search
    query = params[:query]
    posts = Post.where('name LIKE ? OR place LIKE ? OR description LIKE ?',
                       "%#{query}%", "%#{query}%", "%#{query}%")
    .paginate(page: page)
    render json: posts
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
  end

  # POST /posts
  # POST /posts.json
  def create
    # @post = Post.new(post_params)

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

      render json: "Posted updated successfully", status: 200
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    @post.destroy
  end

  def new
  end




  def sort_by
    %w(name
         place
         description
         event_date).include?(params[:sort_by]) ? params[:sort_by] : 'name'
  end

  def order
    %w(asc desc).include?(params[:order]) ? params[:order] : 'asc'
  end

  def page
    params[:page] || 1
  end


  private
  def set_user
    @current_user = User.find_by(auth_token: request.headers["Access"])


  end

  # Use callbacks to share common setup or constraints between actions.
  def set_post
    @post = Post.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def post_params
    params.require(:post).permit(:title, :body, :user_id, :posts_count)
  end
end
