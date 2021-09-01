class Api::V1::WebhooksController < ApplicationController
  def subscribe
    render status: 200, json: @controller.to_json
  end

  # TODO:
  #   - insert the card to database if the event type is "createCard"
  #   - update the card in database if the event type is "updateCard"
  #   - delete the card in database if the event type is "deleteCard"
  def event
    _json = JSON.parse(request.body.read, object_class: OpenStruct)
    puts "Webhook event type: #{_json.action.type}"
    case _json.action.type
    #### List events
    when "createList"
      if !List.exist?(_json.action.data.list.id)
        list = List.new(
          id: _json.action.data.list.id, 
          name: _json.action.data.list.name
        )
        list.save
      end
    when "updateList"
    when "deleteList"
      List.find(_json.action.data.list.id).destroy
    #### Card events
    when "createCard"
      if !Card.exist?(_json.action.data.card.id)
        card = Card.new(
          id: _json.action.data.card.id, 
          name: _json.action.data.card.name
        )
        card.save
      end
    when "updateCard"
      puts "Card event: #{request.body.read}"
      if _json.action.display.translationKey == "action_archived_card" && Card.exist?(_json.action.data.card.id)
        card = Card.find(_json.action.data.card.id)
        card.archived = true
        card.closed = true
        card.save
      end
    when "deleteCard"
      Card.find(_json.action.data.card.id)&.destroy
    end

    render status: 200
  end
end
