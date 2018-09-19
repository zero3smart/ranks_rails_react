class User < ApplicationRecord


  before_save   :downcase_email


  validates :username,uniqueness: { case_sensitive: false }, presence: true,
    :on => :create



  validates :password, length: { minimum: 6 }, allow_nil: false, :on => :create


  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\-.]+\.[a-z]+\z/i

  validates :email, presence: true,
    format: { with: VALID_EMAIL_REGEX },
    uniqueness: { case_sensitive: false }, :on => :create

  has_secure_password
  has_secure_token :auth_token


  def invalid_token
    self.update_columns(auth_token:nil)
  end


  def self.validate_login(email,password)
    user = find_by(email: email)
    if user && user.authenticate(password)
      user
    end
  end


  def send_password_reset
    generate_token(:password_reset_token)
    self.password_reset_sent_at = Time.zone.now
    save!
    UserMailer.password_reset(self).deliver_now
  end

  def reset_password!(password)
    self.password_reset_token = nil
    self.password = password
    save!
  end




  mount_base64_uploader :avatar, AvatarUploader


  # Activates an account.
  #def activate
  # update_attribute(:activated,    true)
  #update_attribute(:activated_at, Time.zone.now)
  #end

  # Sends activation email.
  #def send_activation_email
  # UserMailer.account_activation(self).deliver_now
  #end

  # Creates and assigns the activation token and digest.def
  #def create_activation_digest
  # self.activation_token  = new_token
  # self.activation_digest = User.digest(activation_token)
  # end

  private

  def generate_token(column)
    begin
      self[column] = SecureRandom.urlsafe_base64
    end while User.exists?(column => self[column])
  end



  # Converts email to all lower-case.
  def downcase_email
    self.email = email.downcase
  end


end
