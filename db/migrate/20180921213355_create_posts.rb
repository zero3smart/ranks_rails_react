class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.string :title, :limit => 140
      t.text :body, :limit => 250
      t.integer :user_id, null: false, default: ""
     

      t.timestamps
    end
      add_index :posts, :user_id  
  end
end
