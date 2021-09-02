class Api::V1::CardsController < ApplicationController
  # TODO: Fill the controller actions for the API
  def index
    cards = Card.all
    render json: cards, status: 200
  end

  def create
    newCard = self.makeRequest("card", "POST", card_params)
    puts "New card created: #{newCard}"
    render json: newCard, status: 200
  end

  def update
    updatedCard = self.makeRequest("card", "UPDATE", card_params)
    puts "New card updated: #{updatedCard}"
    render json: updatedCard, status: 200
  end

  def destroy
    deletedList = self.makeRequest("card", "DELETE", card_params)
    puts "Card deleted: #{deletedCard}"
    render json: deletedCard, status: 200
  end

  private 
    def card_params
      params.require(:card).permit([
        :name,
        :id,
        :idList,
        :pos,
        :closed,
        :desc
      ])
    end
  
end
