class PasswordsController < ApplicationController


  def forgot


    @user = User.find_by(email: params[:email]) # if present find user by email

    if @user.present?
    
   @user.send_password_reset 

      render json: "Email sent with password reset instructions", status: 201

    else
      render json: "Email address not found. Please check and try again.",
        status: :not_found

    end
  end
def reset
	 @user = User.find_by_password_reset_token!(params[:id])
end

def update
  @user = User.find_by_password_reset_token!(params[:id])
  if @user.password_reset_sent_at < 2.hours.ago
     render json: "Password &crarr; 
      reset has expired.", status: 409
 else @user.update_attributes(params[:user])
    
    render json: "Password has been reset.", status: 201

  end
end



end
