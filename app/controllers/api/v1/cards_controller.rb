class Api::V1::CardsController < ApplicationController
  # TODO: Fill the controller actions for the API
  def index
    cards = Card.all
    render json: cards, status: 200
  end

  def create
    # TODO:
    #  - add body params validation
    #  - push card to Trello
    card = Card.new(card_params)
    if card.save
      render json: card, status: 200
    else 
      render json: {error: 'Could not save Card'}
    end
  end

  def update
  end

  def destroy
    card = Card.find(params[:id])
    if card.destroy
      render json: card, status: 200
    else
      render json: {error: 'Could not delete Card'}
    end
  end

  private 
    def card_params
      params.require(:card).permit([
        :name,
        :id,
        :pos,
        :desc
      ])
    end
  
end
