class UserSerializer < ActiveModel::Serializer
  attributes :username, :name, :bio, :avatar, :email,
  :password, :password_digest, :auth_token, :reset_digest, :reset_sent_at
end
