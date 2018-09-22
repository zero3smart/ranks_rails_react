class PostSerializer 
  include FastJsonapi::ObjectSerializer
  attributes :title, :body, :user_id
end
