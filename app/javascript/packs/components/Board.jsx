import React from 'react';
import UpdatesChannel from '../../channels/updates_channel'
import TrelloList from "./TrelloList";
import "../../stylesheets/board.css"
import { Layout } from 'antd';
const { Content, Footer } = Layout;
class Board extends React.Component {
  state = {
    lists: [],
    cards: []
  };
  editItem = async (type, { id, idList, name, desc }) => {
    let url = `api/v1/${type}`;
    if (id) {
      url += '/' + id
    }
    try {
      const body = JSON.stringify({
        name,
        desc,
        idList
      })
      await fetch(url, {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body
      })
    } catch (e) {
      throw new Error(`Network error: ${e}`);
    }
  };
  closeItem = async (type, id) => {
    const url = `api/v1/${type}/${id}`;
    try {
      await fetch(url, {
        method: "delete",
      })
    } catch (e) {
      throw new Error("Network error.");
    }
  };
  loadData = async (type) => {
    const url = `api/v1/${type}`;
    try {
      const data = await fetch(url)
      if (data.ok) {
        const json = await data.json()
        this.setState(() => ({
          [type]: json,
        }));
      }
    } catch (e) {
      throw new Error(`Network error: ${e}`);
    }
  };
  reloadData = async (type) => {
    this.setState({ [type]: [] });
    await this.loadData(type);
  };
  openedList() {
    let openedList = this.state.lists.filter(list => !list.closed)
    openedList.push({})
    return openedList
  };
  cardsForList(id) {
    let filtered = this.state.cards.filter(card => card && card.idList === id)
    filtered.push({})
    return filtered
  };
  updateItem(action, type, item) {
    let newItems
    switch (action) {
      case 'create':
        this.setState((prevState) => ({
          [type]: [...prevState[type], item],
        }))
        break
      case 'update':
        newItems = this.state[type].map(i => {
          if (i.id === item.id) {
            return item
          }
          return i
        })
        this.setState(() => ({
          [type]: newItems,
        }));
        break
      case 'delete':
        newItems = this.state[type].filter(i => i.id !== item)
        this.setState(() => ({
          [type]: newItems,
        }));
        break
    }
  };
  componentDidMount() {
    ['lists', 'cards'].forEach(type => {
      this.loadData(type);
    })
    // Websocket handler
    UpdatesChannel.received = (data) => {
      this.updateItem(data.action, data.type, data[data.type] || data.id)
    }
  };
  render() {
    return (
      <Layout className="layout" style={{ height: "100vh" }}>
        <Content>
          <h1 style={{ padding: "20px" }}>Board</h1>
          <div className="board__container">
            {
              this.openedList().map(list => {
                return <TrelloList
                  key={list.id || "new"}
                  name={list.name}
                  cards={this.cardsForList(list.id)}
                  onChangeTitle={(name) => { this.editItem("lists", { id: list.id, name }) }}
                  onCloseList={() => { this.closeItem("lists", list.id) }}
                  onChangeCardTitle={(id, name) => { this.editItem("cards", { id, name, idList: list.id }) }}
                  onChangeCardDesc={(id, desc) => { this.editItem("cards", { id, desc, idList: list.id }) }}
                  onCloseCard={(id) => { this.closeItem("cards", id) }} />
              })
            }
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Trello Clone for CallBell ©2021.</Footer>
      </Layout>
    );
  }
}

export default Board;