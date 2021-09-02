import React from "react";
import 'antd/dist/antd.css';
import { Input, Row, Col, Radio } from 'antd';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
class NewItemHeader extends React.Component {
    state = {
        isEditing: false
    };
    render() {
        let placeholder = `Add a ${this.props.isCard ? 'card' : 'list'}`
        let header = this.props.title
        if (!header) {
            header = <Input placeholder={placeholder} />
        }
        return (
            <Row>
                <Col>
                    {header}
                </Col>
                <Col>
                    <Radio.Group value="default" onChange={this.handleSizeChange}>
                        <Radio.Button value="small" icon={<EditOutlined />}/>
                        <Radio.Button value="small" icon={<CloseOutlined />}/>
                    </Radio.Group>
                </Col>
            </Row>
        )
    }
}
export default NewItemHeader;