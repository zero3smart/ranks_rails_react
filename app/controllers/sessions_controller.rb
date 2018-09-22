class SessionsController < ApplicationController


  def create
    if user = User.validate_login(params[:email], params[:password])
      # user.confirmation_email
        allow_token_to_be_used_only_once_for(user)
        send_token_for_valid_login_of(user)
      else


        render_json_error 401, "Email and password combination are invalid"

      end
    end
  



  #Verifies the access_token so the client app would know if to login the user.
  def verify_token


    user = User.find_by(auth_token: request.headers["Access"])


    if user
      render json: {message:"verified",  status: 200}
    else


      render_json_error 401, "Token failed verification"
    end
  end

  def destroy
    logout
    head :ok
  end


  protected


  def send_token_for_valid_login_of(user)
    #render json: {token:user.auth_token, status: 200}


    render plain: user.auth_token, status: 200
  end

  def allow_token_to_be_used_only_once_for(user)
    user.regenerate_auth_token
  end

  def logout
    current_user.ivalidate_token
  end

end
