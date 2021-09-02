import React from 'react';
import TrelloList from "./TrelloList";
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
  loadData = async (type) => {
    const url = `api/v1/${type}`;
    try {
      const data = await fetch(url)
      if (data.ok) {
        const json = await data.json()
        json.forEach((newEl) => {
          this.setState((prevState) => ({
            [type]: [...prevState[type], newEl],
          }));
        });
      }
    } catch (e) {
      throw new Error("Network error.");
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
  reloadData = (type) => {
    this.setState({ [type]: [] });
    this.loadData(type);
  };
  openedList() {
    return this.state.lists.filter(list=>!list.closed)
  }
  cardsForList(id) {
    return this.state.cards.filter(card => card.idList === id)
  }
  render() {
    return (
      <Layout className="layout">
        <Content style={{ padding: "0 50px" }}>
          <h1>Board</h1>
          <div className="site-layout-content" style={{ margin: "100px auto" }}>
            <Row>
              {
                this.openedList().map(list => {
                  return <Col key={list.id}><TrelloList name={list.name}  cards={this.cardsForList(list.id)} /></Col> 
                })
              }
              <Col><TrelloList /></Col>
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Trello Clone for CallBell ©2021.</Footer>
      </Layout>
    );
  }
}

export default Board;