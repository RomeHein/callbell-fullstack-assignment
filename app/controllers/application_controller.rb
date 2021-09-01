class ApplicationController < ActionController::API
    def makeRequest(path,method, queryParams)
        queryParams[:key] = ENV["TRELLO_KEY"]
        queryParams[:token] = ENV["TRELLO_TOKEN"]
        queryParams[:idBoard] = ENV["TRELLO_BOARD_ID"]
        puts "Query params: #{queryParams.to_query}"
        uri = URI("https://api.trello.com/1/#{path}?#{queryParams.to_query}")
        if method == "POST"
          req = Net::HTTP.post(uri,nil)
        elsif method == "DELETE"
          req = Net::HTTP::Delete.new(uri)
        end
        req.body
    end
end
