class PasswordsController < ApplicationController
  before_action :set_user, only: [:new, :create]

  def new
 
  end

  def create
  
    @user.changing_password = true
    if @user.update_attributes(password_params)

      render json: "Successfully changed password.", status: 201
    else
      render "new"
    end
  end

  private

  def password_params
    params.require(:user).permit(:original_password, :new_password, :new_password_confirmation)
  end



  # Use callbacks to share common setup or constraints between actions.
  def set_user
    #@user = User.find_by(auth_token: params[:auth_token])
    @user = User.find_by(auth_token: request.headers["Access"])


  end

end
