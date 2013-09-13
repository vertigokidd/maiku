class CreateTables < ActiveRecord::Migration
  def change
    create_table :haikus do |t|
      t.string :line_one
      t.string :line_two
      t.string :line_three
      t.string :created_at
      t.timestamps
    end
  end
end
