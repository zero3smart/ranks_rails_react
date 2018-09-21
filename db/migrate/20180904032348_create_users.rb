class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|

      t.string :username, index: true, unique: true,null: false, default: "", :limit => 140
      t.string :name,  :limit => 140
      t.string :auth_token,  index: true, unique: true, null: false, default: "", :limit => 140
      t.string :avatar
      
      t.string :bio, :limit => 200
      t.string :email, index: true, unique: true, null: false, default: "", :limit => 140
      t.boolean :admin, default: false

      t.string :password_digest,  null: false, default: ""
      t.string :password_reset_token
      t.datetime :password_reset_sent_at

      t.string :confirmation_token, null: false, default: ""
      t.boolean :confirmation_email, default: false
    


      t.timestamps
    end
  end
end
