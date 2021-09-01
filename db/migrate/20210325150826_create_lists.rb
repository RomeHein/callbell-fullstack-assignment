class CreateLists < ActiveRecord::Migration[6.1]
  def change
    create_table(:lists, id: :string) do |t|
      t.string :name
      t.boolean :closed, default: false
      t.timestamps
    end
  end
end
