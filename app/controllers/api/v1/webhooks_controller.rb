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
    puts "Webhook event display type: #{_json.action.display.translationKey}"
    case _json.action.type
    #### List events
    when "createList"
      if !List.exists?(_json.action.data.list.id)
        list = List.new(
          id: _json.action.data.list.id, 
          name: _json.action.data.list.name
        )
        list.save
        ActionCable.server.broadcast("update", {action: "update",type: "lists",list: list })
      end
    when "updateList"
      if List.exists?(_json.action.data.list.id)
        list = List.find_by_id(_json.action.data.list.id)
        if _json.action.display.translationKey == "action_archived_list"
          list.closed = true
        elsif _json.action.display.translationKey == "action_unarchived_list"
          list.closed = false
        elsif _json.action.display.translationKey == "action_renamed_list"
          list.name = _json.action.data.list.name
        end
        list.save
        ActionCable.server.broadcast("update", {action: "update",type: "lists", list: list })
      end
    when "deleteList"
      List.find_by_id(_json.action.data.list.id).try(:destroy)
      ActionCable.server.broadcast("update", {action: "delete",type: "lists", id: _json.action.data.list.id })
    #### Card events
    when "createCard"
      if !Card.exists?(_json.action.data.card.id)
        card = Card.new(
          id: _json.action.data.card.id,
          idList: _json.action.data.list.id,
          name: _json.action.data.card.name
        )
        card.save
        ActionCable.server.broadcast("update", {action: "create",type: "cards", card: card })
      end
    when "updateCard"
      if Card.exists?(_json.action.data.card.id)
        card = Card.find_by_id(_json.action.data.card.id)
        if _json.action.display.translationKey == "action_archived_card"
          card.closed = true
        elsif _json.action.display.translationKey == "action_unarchived_card"
          card.closed = false
        elsif _json.action.display.translationKey == "action_renamed_card"
          card.name = _json.action.data.card.name
        elsif _json.action.display.translationKey == "action_changed_description_of_card"
          card.desc = _json.action.data.card.desc
        end
        card.save
        ActionCable.server.broadcast("update", {action: "update",type: "cards", card: card })
      end
    when "deleteCard"
      Card.find_by_id(_json.action.data.card.id).try(:destroy)
      ActionCable.server.broadcast("update", {action: "delete",type: "cards", id: _json.action.data.card.id })
    end
    render status: 200
  end
end
