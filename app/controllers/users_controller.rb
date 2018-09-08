class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all

    render json: @users, status: 200
  end


  # GET /users/1
  def show
     #@user = User.find_by_auth_token!(request.headers[:token])
      @user = User.find_by(params[:auth_token])
    render json: @user, status: 200
  end

  # POST /users
  def create
    @user = User.create!(user_params)

    if @user.save

      render json: { token: @user.auth_token }, status: 201
    else
      render json: @user.errors, status: 422
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update!(user_params)

      render json: "Account has been updated successfully", status: 200
    else
      render json: @user.errors, status: 422
    end
  end

  # DELETE /users/1
  def destroy
    if @user.destroy
      render json: "Account has been deleted successfuly", status: 200
    else
      render json: "Something went wrong", status: 422
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find_by(auth_token: params[:auth_token])
  end

  # Only allow a trusted parameter "white list" through.
  def user_params
    params.require(:user).permit(:username, :name, :email,  :password, :password_digest, :auth_token, :reset_digest, :reset_sent_at)
  end
end
