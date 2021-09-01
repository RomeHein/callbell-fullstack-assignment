class List < ApplicationRecord
  validates_presence_of :id, :name
  has_many :cards, :dependent => :destroy
end

