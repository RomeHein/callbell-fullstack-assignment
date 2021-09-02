import React from "react";
import "../../stylesheets/list.css"
import { List, Card } from 'antd';
import NewItemHeader from './NewItemHeader'
class TrelloList extends React.Component {
    onChangeList(newTitle) {
        this.props.onChangeTitle(newTitle)
    }
    render() {
        return (
            <List
                className="list__container"
                bordered="true"
                itemLayout="vertical"
                dataSource={this.props.cards}
                renderItem={item => (
                    <List.Item>
                        <Card>
                            <Card.Meta title={<NewItemHeader isCard="true" title={item.name} onChangeItem={this.onChangeList.bind(this)} onCloseItem={this.props.onCloseList}/>}/>
                        </Card>
                    </List.Item>
                )}
                header={<NewItemHeader title={this.props.name} onChangeItem={this.onChangeList.bind(this)} onCloseItem={this.props.onCloseList}/>}
            />
        )
    }
}

export default TrelloList;