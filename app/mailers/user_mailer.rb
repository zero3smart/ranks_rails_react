class UserMailer < ApplicationMailer

  def passwords(user)
    @user = user
    mail to: user.email, subject: "Password reset"
  end
end
