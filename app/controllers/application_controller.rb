class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods
  #include ActionView::Rendering
 
  include SessionsHelper

end
