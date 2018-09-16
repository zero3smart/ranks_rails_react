
class PasswordResetsController < ApplicationController
  before_action :get_user,   only: [:edit, :update]
  before_action :valid_user, only: [:edit, :update]
  before_action :check_expiration, only: [:edit, :update]



  




  def create
    @user = User.find_by(email: params[:password_reset][:email].downcase)
    if @user

      render plain: @user.create_reset_digest,  status: 201

      render plain: @user.send_password_reset_email, status: 201
      render plain: "Email sent with password reset instructions"

    else
      render json: "Email address not found"

    end
  end




  def edit
  end

  def update
    if params[:user][:password].empty?
      render plain: @user.errors.add(:password, "can't be empty")

    elsif @user.update_attributes(user_params)
      #log_in @user
      render json: "Password has been reset."
      #redirect_to @user
    else
      # render 'edit'
      render json: "Something went wrong"
    end
  end

  private

  def user_params
    params.require(:user).permit(:password, :password_confirmation)
  end

  def get_user
    @user = User.find_by(email: params[:email])
  end

  # Confirms a valid user.
  def valid_user
    unless (@user && @user.authenticated?(:reset, params[:id]))
      redirect_to root_url
    end
  end

  # Checks expiration of reset token.
  def check_expiration
    if @user.password_reset_expired?

      render json: "Password reset has expired."
      redirect_to new_password_reset_url
    end
  end
end
