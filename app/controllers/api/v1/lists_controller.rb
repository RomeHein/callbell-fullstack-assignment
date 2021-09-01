class Api::V1::ListsController < ApplicationController
  # TODO: Fill the controller actions for the API
  def index
    lists = List.all
    render json: lists, status: 200
  end

  def create
    list = List.new(list_params)
    if card.save
      render json: list, status: 200
    else 
      render json: {error: 'Could not save List'}
    end
  end

  def update
  end

  def destroy
    list = List.find(params[:id])
    if list.destroy
      render json: list, status: 200
    else
      render json: {error: 'Could not delete List'}
    end
  end

  private 
    def list_params
      params.require(:list).permit([
        :name,
        :id
      ])
    end
  
end
