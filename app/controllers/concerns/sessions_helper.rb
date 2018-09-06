module SessionsHelper

  def current_user
    @current_user ||= authenticate_token
  end

  # Returns the current logged-in user (if any).

  # Returns true if the user is logged in, false otherwise.
  def logged_in?
    !current_user.nil?
  end

  def log_out
    @current_user = nil
  end

  def require_login
    authenticate_token || render_unauthorized("Acess Denied")
  end



  protected

  def render_unauthorized(message)
    errors = {errors:[detail: message]}
    render json: errors, status: :unauthorized
  end

  private


  def authenticate_token
    authenticate_with_http_token do |token, options |
      User.find_by(auth_token: token)
    end
  end

end
