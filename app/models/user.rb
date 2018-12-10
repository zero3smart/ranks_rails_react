class User < ApplicationRecord



  validates :username,uniqueness: { case_sensitive: false }, presence: true,
    :on => :create

  has_many :posts




  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\-.]+\.[a-z]+\z/i

  validates :email, presence: true,
    format: { with: VALID_EMAIL_REGEX },
    uniqueness: { case_sensitive: false }, :on => :create

  
  has_secure_token :auth_token

  has_many :comments


  def invalid_token
    self.update_columns(auth_token:nil)
  end


  def self.validate_login(username)
    user = find_by(username: username)
    if user && user.username
      user
    end
  end


  




  
  private
  
  def generate_token(column)
    begin
      self[column] = SecureRandom.urlsafe_base64.to_s
    end while User.exists?(column => self[column])
  end


end
