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
  editItem = async (type, {id, idList, name, desc}) => {
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
      const data = await fetch(url, {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body
      })
      if (data.ok) {
        const json = await data.json()
        if (json && id) {
          const newItems = this.state[type].map(item => {
            if (item.id === id) {
              return json
            }
            return item
          })
          this.setState(() => ({
            [type]: newItems,
          }));
        } else {
          this.setState((prevState) => ({
            [type]: [...prevState[type], json],
          }))
        }
      }
    } catch (e) {
      throw new Error(`Network error: ${e}`);
    }
  }
  closeItem = async (type, id) => {
    const url = `api/v1/${type}/${id}`;
    try {
      const data = await fetch(url, {
        method: "delete",
      })
      if (data.ok) {
        const json = data.json();
        if (json) {
          const newItems = this.state[type].filter(item => item.id !== id)
          this.setState(() => ({
            [type]: newItems,
          }));
        }
      }
    } catch (e) {
      throw new Error("Network error.");
    }
  }
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
  }
  cardsForList(id) {
    let filtered = this.state.cards.filter(card => card && card.idList === id)
    filtered.push({})
    return filtered
  }
  componentDidMount() {
    ['lists', 'cards'].forEach(type => {
      this.loadData(type);
    })
    // Websocket handler
    UpdatesChannel.received = (data) => {
      this.reloadData(data.type)
    }
  }
  render() {
    return (
      <Layout className="layout" style={{ height: "100vh" }}>
        <Content>
          <h1 style={{ padding: "20px" }}>Board</h1>
          <div className="board__container">
            {
              this.openedList().map(list => {
                return <TrelloList
                  key={list.id || "new"}
                  name={list.name}
                  cards={this.cardsForList(list.id)}
                  onChangeTitle={(name) => { this.editItem("lists", {id: list.id, name}) }}
                  onCloseList={() => {this.closeItem("lists",list.id)}} 
                  onChangeCardTitle={(id,name) => {this.editItem("cards", {id, name, idList: list.id})}}
                  onChangeCardDesc={(id,desc) => {this.editItem("cards", {id, desc, idList: list.id})}}
                  onCloseCard={(id) => {this.closeItem("cards",id)}}/>
              })
            }
            {/* <TrelloList onChangeTitle={(name) => { this.editItem("lists", {name}) }} /> */}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Trello Clone for CallBell ©2021.</Footer>
      </Layout>
    );
  }
}

export default Board;