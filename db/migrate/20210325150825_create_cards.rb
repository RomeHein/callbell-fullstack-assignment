class CreateCards < ActiveRecord::Migration[6.1]
  def change
    create_table(:cards, id: :string) do |t|
      t.string :list_id 
      t.string :name
      t.float :pos
      t.text :desc
      t.boolean :closed, default: false
      t.boolean :archived, default: false
      t.timestamps
    end
  end
end
