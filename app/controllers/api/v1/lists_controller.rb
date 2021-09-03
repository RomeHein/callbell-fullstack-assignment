class Api::V1::ListsController < ApplicationController
  # TODO: Fill the controller actions for the API
  def index
    lists = List.all
    render json: lists, status: 200
  end

  def create
    newList = self.makeRequest("lists", "POST", list_params)
    puts "New list created: #{newList}"
    render json: newList, status: 200
  end

  def update
    if params[:id]
      if params[:name]
        updatedList = self.makeRequest("lists/#{params[:id]}", "PUT", update_list_params)
      elsif params[:closed]
        updatedList = self.makeRequest("lists/#{params[:id]}/closed", "PUT", {:value => params[:closed]})
      end
      puts "List updated: #{updatedList}"
      render json: updatedList, status: 200
    end
  end

  def destroy
    closedList = self.makeRequest("lists/#{params[:id]}/closed", "PUT", {:value => true})
    puts "List closed: #{closedList}"
    render json: closedList, status: 200
  end

  private 
    def list_params
      params.require(:list).permit([
        :id,
        :closed,
        :name
      ])
    end  
    def update_list_params
      params.require(:id)
      return {:name => params[:name]}
    end  
end
