class ApplicationController < ActionController::API
    def makeRequest(path,method, queryParams)
        queryParams[:key] = ENV["TRELLO_KEY"]
        queryParams[:token] = ENV["TRELLO_TOKEN"]
        queryParams[:idBoard] = ENV["TRELLO_BOARD_ID"]
        uri = URI("https://api.trello.com/1/#{path}?#{queryParams.to_query}")
        http = Net::HTTP.start(uri.host,uri.port,:use_ssl => true) do |http|
            headers = {'Content-Type' => 'application/json'}
            response = http.send_request(method, uri.request_uri, nil,headers)
            response.body
        end        
    end
end
