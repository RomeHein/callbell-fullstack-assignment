class Api::V1::ListsController < ApplicationController
  # TODO: Fill the controller actions for the API
  def index
    lists = List.all
    render json: lists, status: 200
  end

  def create
    newList = self.makeRequest("list", "POST", list_params)
    puts "New list created: #{newList}"
    render status: 200
  end

  def update
    if params[:id]
      if params[:name]
        updatedList = self.makeRequest("list", "PUT", list_params)
      elsif params[:closed]
        updatedList = self.makeRequest("list/#{params[:id]}/closed", "PUT", {:value => params[:closed]})
      end
      puts "List updated: #{updatedList}"
      render status: 200
    end
  end

  def destroy
    deletedList = self.makeRequest("list", "DELETE", list_params)
    puts "List deleted: #{deletedList}"
    render status: 200
  end

  private 
    def list_params
      params.require(:list).permit([
        :id,
        :closed,
        :name
      ])
    end  
end
