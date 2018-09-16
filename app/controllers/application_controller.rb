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













end
