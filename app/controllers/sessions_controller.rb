class SessionsController < ApplicationController



  def create
    if user = User.validate_login(params[:email], params[:password])
      allow_token_to_be_used_only_once_for(user)
      send_token_for_valid_login_of(user)
    else
      render_unauthorized("Email and password combination are invalid")
    
    end
  end

  def destroy
    logout
    head :ok
  end



  private

  def send_token_for_valid_login_of(user)
    render json: {token: user.auth_token, status: 200}
  end

  def allow_token_to_be_used_only_once_for(user)
    user.regenerate_auth_token
  end

  def logout
    current_user.ivalidate_token
  end

end
