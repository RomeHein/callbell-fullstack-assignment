class Card < ApplicationRecord
  # TODO: Add the relationship / methods of the Trello Card here
  validates_presence_of :id, :name
  # validates_numericality_of :pos, :message=>"Position must be a positive integer"
  belongs_to :list
end

