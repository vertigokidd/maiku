class CreateTables < ActiveRecord::Migration
  def change
    create_table :haikus do |t|
      t.string :content
      t.string :created_at
      t.timestamps
    end
  end
end
