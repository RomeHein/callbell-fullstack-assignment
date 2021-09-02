import React from 'react';
import TrelloList from "./TrelloList";
import "../../stylesheets/board.css"
import { Layout, Row, Col } from 'antd';
const { Content, Footer } = Layout;
class Board extends React.Component {
  state = {
    lists: [],
    cards: []
  };
  componentDidMount() {
    ['lists', 'cards'].forEach(type => {
      this.loadData(type);
    })
  }
  editItem = async (type, id, name) => {
    let url = `api/v1/${type}`;
    if (id) {
      url+='/'+id
    }
    try {
      const body = JSON.stringify({
        name
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
        if (id) {
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
  closeList = async (id) => {
    console.log(`Close list: ${id}`)
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
  deleteData = async (type, id) => {
    const url = `api/v1/${type}/${id}`;
    try {
      const data = await fetch(url, {
        method: "delete",
      })
      if (data.ok) {
        this.reloadData(type);
        return data.json();
      }
    } catch (e) {
      throw new Error("Network error.");
    }
  };
  reloadData = async (type) => {
    this.setState({ [type]: [] });
    await this.loadData(type);
  };
  openedList() {
    return this.state.lists.filter(list => !list.closed)
  }
  cardsForList(id) {
    let filtered = this.state.cards.filter(card => card.idList === id)
    filtered.push({})
    return filtered
  }
  render() {
    return (
      <Layout className="layout" style={{ height: "100vh" }}>
        <Content>
          <h1 style={{ padding: "20px" }}>Board</h1>
          <div className="board__container">
              {
                this.openedList().map(list => {
                  return <TrelloList key={list.id} name={list.name} cards={this.cardsForList(list.id)} onChangeTitle={(e) => { this.editItem("lists", list.id, e) }} onCloseList={this.closeList(list.id)} />
                })
              }
              <TrelloList onChangeTitle={(e) => { this.editItem("lists", null, e) }} />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Trello Clone for CallBell ©2021.</Footer>
      </Layout>
    );
  }
}

export default Board;