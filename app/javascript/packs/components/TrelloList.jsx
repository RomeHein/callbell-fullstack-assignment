import React from "react";
import "../../stylesheets/list.css"
import { List, Card, Input } from 'antd';
import NewItemHeader from './NewItemHeader'
import CardDescription from './CardDescription'
class TrelloList extends React.Component {
    render() {
        return (
            <List
                className="list__container"
                bordered={true}
                itemLayout="vertical"
                dataSource={this.props.cards}
                renderItem={item => (
                    <List.Item>
                        <Card key={item.id}>
                            <Card.Meta
                                title={<NewItemHeader
                                    title={item.name}
                                    isCard={true}
                                    onChangeItem={(title) => { this.props.onChangeCardTitle(item.id, title) }}
                                    onCloseItem={() => {this.props.onCloseCard(item.id)}}
                                />}
                                description={item.name ? (<CardDescription
                                    desc={item.desc}
                                    onChangeDesc={(desc) => { this.props.onChangeCardDesc(item.id, desc) }}
                                />):null
                                }
                            />
                        </Card>
                    </List.Item>
                )}
                header={<NewItemHeader
                    title={this.props.name}
                    onChangeItem={(title) => { this.props.onChangeTitle(title) }}
                    onCloseItem={(e) => {this.props.onCloseList(e)}}
                />}
            />
        )
    }
}

export default TrelloList;