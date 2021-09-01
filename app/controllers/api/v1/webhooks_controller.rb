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
      end
    when "deleteList"
      List.find_by_id(_json.action.data.list.id).try(:destroy)
    #### Card events
    when "createCard"
      if !Card.exists?(_json.action.data.card.id)
        card = Card.new(
          id: _json.action.data.card.id,
          idList: _json.action.data.list.id,
          name: _json.action.data.card.name
        )
        card.save
      end
    when "updateCard"
      if Card.exists?(_json.action.data.card.id)
        card = Card.find_by_id(_json.action.data.card.id)
        if _json.action.display.translationKey == "action_archived_card"
          card.closed = true
        elsif _json.action.display.translationKey == "action_unarchived_card"
          card.closed = false
        elsif _json.action.display.translationKey == "action_rename_card"
          card.name = _json.action.data.card.name
        end
        card.save
      end
    when "deleteCard"
      Card.find_by_id(_json.action.data.card.id).try(:destroy)
    end
    render status: 200
  end
end
