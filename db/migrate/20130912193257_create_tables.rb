class CreateTables < ActiveRecord::Migration
  def change
    create_table :haikus do |t|
      t.string :content
      t.string :tweeted_at
      t.timestamps
    end
  end
end
