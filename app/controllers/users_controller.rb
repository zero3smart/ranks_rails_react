class UsersController < ApplicationController
  before_action :set_user, only: [:profile, :update_profile, :edit_profile, :destroy]



  # GET /users
  def index
    @users = User.all
    render json: @users, status: 200
  end

  def profile
    render json: @user, status: 200
  end

  def edit_profile

    render json: @user, status: 200
  end

  def update_profile

    if @user.update(user_params)


      render json: "Account has been updated successfully", status: 200
    else
      render json: @user.errors, status: 409

    end
  end

  # GET /users/1


  # POST /users
  def create
    #p@user = User.create!(user_params)
  @user = User.create(user_params)

    if @user.save

      render plain: @user.auth_token, status: 201

    else
      render json: @user.errors, status: 409
    

    end
  end

  # PATCH/PUT /users/1


  # DELETE /users/1
  def destroy
    if @user.destroy
      render json: "Account has been deleted successfuly", status: 200
    else
      render json: "Something went wrong", status: 409
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_user
    #@user = User.find_by(auth_token: params[:auth_token])
    @user = User.find_by(auth_token: request.headers["Access"])



  end

  # Only allow a trusted parameter "white list" through.
  def user_params
    params.require(:user).permit(:username, :name, :bio, :avatar, :email,
                                 :password, :password_digest, :auth_token, :reset_digest, :reset_sent_at)
  end
end
