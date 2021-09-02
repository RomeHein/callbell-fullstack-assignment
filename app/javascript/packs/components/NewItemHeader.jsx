import React from "react";
import 'antd/dist/antd.css';
import { Input, Row, Col, Button } from 'antd';
import { EditOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
class NewItemHeader extends React.Component {
    state = {
        isEditing: false,
        isLoading: false,
        newTitle: this.props.title
    };
    editAction = () => {
        if (this.state.isEditing) {
            this.changeItem()
        }
        this.setState((prevState) => (
            { isEditing: !prevState.isEditing }
        ))
    };
    clickClose = () => {
        if (this.state.isEditing) {
            this.setState(() => (
                {
                    isEditing: false,
                    newTitle: this.props.title
                }
            ))
        } else {
            this.props.onCloseItem()
        }
    }
    changeItem = () => {
        this.setState(() => (
            { isLoading: true }
        ))
        this.props.onChangeItem(this.state.newTitle)
    };
    onChange = (value) => {
        this.setState(() => (
            { newTitle: value }
        ))
    };
    render() {
        let placeholder = `Add a ${this.props.isCard ? 'card' : 'list'}`
        return (
            <Row wrap={false}>
                <Col flex="auto">
                    <Input placeholder={placeholder} value={this.state.newTitle} onChange={(e) => { this.onChange(e.target.value) }} onPressEnter={this.changeItem} disabled={this.props.title && !this.state.isEditing} />
                </Col>
                {this.props.title ?
                    (<Col>
                        <Button value="small" icon={this.state.isEditing ? <CheckOutlined /> : <EditOutlined />} onClick={this.editAction} loading={this.state.isLoading} />
                        <Button value="small" icon={<CloseOutlined />} onClick={this.clickClose} /> </Col>) :
                    (<Col>
                        <Button value="small" icon={<CheckOutlined />} onClick={this.changeItem} loading={this.state.isLoading} />
                    </Col>)
                }
            </Row>
        )
    }
}
export default NewItemHeader;