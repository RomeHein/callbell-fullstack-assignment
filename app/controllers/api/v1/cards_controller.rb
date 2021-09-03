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
    if params[:id]
      if params[:name] || params[:desc]
        updatedCard = self.makeRequest("cards/#{params[:id]}", "PUT", update_card_params)
      elsif params[:closed]
        updatedCard = self.makeRequest("cards/#{params[:id]}/closed", "PUT", {:value => params[:closed]})
      end
      puts "Card updated: #{updatedCard}"
      render json: updatedCard, status: 200
    end
  end

  def destroy
    deletedList = self.makeRequest("cards/#{params[:id]}", "DELETE", {})
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
    def update_card_params
      params.require(:id)
      return {:idList => params[:idList], :name => params[:name], :desc => params[:desc]}
    end
  
end
