class User < ApplicationRecord

  attr_accessor :changing_password, :original_password, :new_password

  validate :verify_original_password, if: :changing_password
  validates_presence_of :original_password, :new_password, if: :changing_password
  validates_confirmation_of :new_password, if: :changing_password
  validates_length_of :new_password, minimum: 6, if: :changing_password

  before_update :change_password, if: :changing_password


  before_create   :downcase_email, :confirm_token


  validates :username,uniqueness: { case_sensitive: false }, presence: true,
    :on => :create

  has_many :posts

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
    if user && user.authenticate(password) && user.confirmation_email
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


  #update password methods
  def verify_original_password
    unless self.authenticate(original_password)
      errors.add :original_password, "is not correct"
    end
  end

  def change_password
    self.password = new_password
  end


  mount_base64_uploader :avatar, AvatarUploader



  def email_activate
    self.confirmation_email = true
    self.confirmation_token = nil
    save!(:validate => false)
  end

  private
  #activate confirmation method
  def confirm_token
    if self.confirmation_token.blank?
      self.confirmation_token = SecureRandom.urlsafe_base64.to_s
    end
  end

  def generate_token(column)
    begin
      self[column] = SecureRandom.urlsafe_base64.to_s
    end while User.exists?(column => self[column])
  end



  # Converts email to all lower-case.
  def downcase_email
    self.email = email.downcase
  end


end
