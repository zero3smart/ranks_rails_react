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

      t.string :activation_digest
      t.boolean :activate, default: false
      t.datetime :activate_at


      t.timestamps
    end
  end
end
