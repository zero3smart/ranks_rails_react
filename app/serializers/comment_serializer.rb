class CommentSerializer 
  include FastJsonapi::ObjectSerializer
  attributes :title, :body, :user_id
    belongs_to :user
  
end
