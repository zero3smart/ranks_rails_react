class ApplicationController < ActionController::API




  def render_json_error(status, title, details = nil)
    error = {
      title: title,
      status: status,
    }
    if !details.nil?
      error[:details] = details
    end

    render json: {errors:[error]}, status: status
  end



 def current_user
    @current_user ||= User.find_by(auth_token: request.headers["Access"])
  end




end
