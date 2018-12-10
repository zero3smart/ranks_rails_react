class SessionsController < ApplicationController


  def create
    if user = User.validate_login(params[:username])

      allow_token_to_be_used_only_once_for(user)
      send_token_for_valid_login_of(user)
    else


      render_json_error 401, "Email and password combination are invalid"

    end
  end



  def destroy
    logout
    head :ok
  end


  protected


  def send_token_for_valid_login_of(user)



    render plain: user.auth_token, status: 200
  end

  def allow_token_to_be_used_only_once_for(user)
    user.regenerate_auth_token
  end

  def logout
    current_user.ivalidate_token
  end

end
