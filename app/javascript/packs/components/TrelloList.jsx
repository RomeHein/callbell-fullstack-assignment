import React from "react";
import "../../stylesheets/list.css"
import { List, Card } from 'antd';
import NewItemHeader from './NewItemHeader'
class TrelloList extends React.Component {
    render() {
        return (
            <List
                className="list__container"
                bordered="true"
                itemLayout="vertical"
                dataSource={this.props.cards}
                renderItem={item => (
                    <List.Item>
                        <Card title={item.name}>
                        {item.desc}
                        </Card>
                    </List.Item>
                )}
                header={<NewItemHeader list="true" title={this.props.name} />}
            />
        )
    }
}

export default TrelloList;