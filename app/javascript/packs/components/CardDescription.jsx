import React from "react";
import 'antd/dist/antd.css';
import { Input, Row, Button } from 'antd';
import { EditOutlined, RollbackOutlined, CheckOutlined } from '@ant-design/icons';
class CardDescription extends React.Component {
    state = {
        isEditing: false,
        isLoading: false,
        newDesc: this.props.desc
    };
    editAction = () => {
        if (this.state.isEditing) {
            this.setState(() => (
                { isLoading: true }
            ))
            this.props.onChangeDesc(this.state.newDesc)
        }
        this.setState((prevState) => (
            { isEditing: !prevState.isEditing }
        ))
    };
    clickCancel = () => {
        if (this.state.isEditing) {
            this.setState(() => (
                {
                    isEditing: false,
                    newTitle: this.props.title
                }
            ))
        }
    }
    onChange = (value) => {
        this.setState(() => (
            { newDesc: value }
        ))
    };
    shouldComponentUpdate(nextProps) {
        if (nextProps.desc !== this.props.desc) {
            this.setState(() => (
                {
                    isLoading: false,
                    isEditing: false,
                    newDesc: this.props.desc
                }
            ))
        }
        return true
    }
    render() {
        return (
            <div>
                <Row>
                    <Input.TextArea
                        autoSize={{ minRows: 2 }}
                        placeholder="Card description"
                        value={this.state.newDesc}
                        onChange={(e) => { this.onChange(e.target.value) }}
                        disabled={!this.state.isEditing}
                    />
                </Row>
                <Row>
                    <Button
                        value="small"
                        onClick={this.editAction}
                        loading={this.state.isLoading}
                        icon={this.state.isEditing ? <CheckOutlined /> : <EditOutlined />}
                    />
                    {this.state.isEditing ? 
                    <Button
                        value="small"
                        onClick={this.clickCancel}
                        icon={<RollbackOutlined />}
                    />: null}
                </Row>
            </div>
        )
    }
}
export default CardDescription;