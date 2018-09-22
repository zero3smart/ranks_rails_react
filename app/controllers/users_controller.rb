class UsersController < ApplicationController
  before_action :set_user, only: [:profile, :update_profile, :edit_profile, :destroy, :update_password]



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

      UserMailer.registration_confirmation(@user).deliver

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

  #confirmation method


  def confirm_email
    user = User.find_by_confirmation_token(params[:id])
    if user
      user.email_activate

      render json: "Welcome to the Sample App! Your email has been confirmed.
      Please sign in to continue.", status: 201
    else

      render json: "Sorry. User does not exist", status: 409
    end
  end




  def update_password

    @user.changing_password = true
    if @user.update_attributes(password_params)

      render json: "Successfully changed password.", status: 200
    else
   
      render json: "Sorry. some error on update the password", status: 409
    end
  end










  private

  def set_user

    @user = User.find_by(auth_token: request.headers["Access"])


  end


  def user_params
    params.require(:user).permit(:username, :name, :bio, :avatar, :email,
                                 :password, :password_digest, :auth_token, :reset_digest, :reset_sent_at)
  end


  def password_params
    params.require(:user).permit(:original_password, :new_password, :new_password_confirmation)
  end
end
