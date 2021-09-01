import React from "react";
import { List, Card } from 'antd';
class TrelloList extends React.Component {
    state = {
        cards: [],
    };
    render() {
        return (
            <List
                itemLayout="horizontal"
                dataSource={this.state.cards}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.name}
                            description={item.desc}
                        />
                    </List.Item>
                )}
            />
        )
    }
}

export default TrelloList;