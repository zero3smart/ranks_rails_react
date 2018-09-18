class UserSerializer #< ActiveModel::Serializer
	include FastJsonapi::ObjectSerializer
  attributes :username, :name, :bio, :avatar, :email,
  :password, :password_digest, :auth_token, :reset_digest, :reset_sent_at
end
