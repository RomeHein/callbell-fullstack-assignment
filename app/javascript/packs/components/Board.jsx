import React from 'react';
import TrelloList from "./TrelloList";

class Board extends React.Component {
  state = {
    lists: [],
    cards: []
  };
  loadLists = async () => {
    const url = "api/v1/lists";
    try {
      const data = await fetch(url)
      if (data.ok) {
        return data.json();
      }
      data.forEach((list) => {
        const newEl = {
          id: list.id,
          name: list.name
        };
        this.setState((prevState) => ({
          lists: [...prevState.lists, newEl],
        }));
      });
    } catch (e) {
      throw new Error("Network error.");
    }
  };
  deleteList = async (id) => {
    const url = `api/v1/lists/${id}`;
    try {
      const data = await fetch(url, {
        method: "delete",
      })
      if (data.ok) {
        this.reloadLists();
        return data.json();
      }
    } catch(e) {
      throw new Error("Network error.");
    }
  };
  reloadLists = () => {
    this.setState({ lists: [] });
    this.loadLists();
  };
  render() {
    return (
      <Layout className="layout">
        <Content style={{ padding: "0 50px" }}>
          <div className="site-layout-content" style={{ margin: "100px auto" }}>
            <h1>Board</h1>
            {
              this.state.lists.map(list => {
                return <TrelloList name={list.name} id={list.id}/>
              })
            }
            <TrelloList />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Trello Clone ©2020.</Footer>
      </Layout>
    );
  }
}

export default Board;