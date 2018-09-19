
class PasswordResetsController < ApplicationController
 # before_action :get_user,   only: [:edit, :update]
  #before_action :valid_user, only: [:edit, :update]
  #before_action :check_expiration, only: [:edit, :update]



  def create


    @user = User.find_by(email: params[:email]) # if present find user by email

    if @user.present?
    
   @user.send_password_reset 

      render json: "Email sent with password reset instructions", status: 201

    else
      render json: "Email address not found. Please check and try again.",
        status: :not_found

    end
  end
def edit

   @user = User.find_by_password_reset_token(params[:id])
   render json: @user, status: 201
end

def update
  @user = User.find_by_password_reset_token(params[:id])
  if @user.password_reset_sent_at < 2.hours.ago
     render json: "Password &crarr; 
      reset has expired.", status: 409
 else @user.update_attributes(user_params)
    
    render json: "Password has been reset.", status: 201

  end
end

private

    def user_params
      params.require(:user).permit(:password, :password_confirmation)
    end


end
