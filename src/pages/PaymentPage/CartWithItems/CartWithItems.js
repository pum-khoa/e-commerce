import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Space,
  Table,
  Typography,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useEffect, useMemo, useRef, useState } from 'react';

import './CartWithItems.scss';

const { Title } = Typography;

const layout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 24,
  },
};

const validateMessages = {
  required: 'This field is required!',
  types: {
    email: 'Email is not a valid email!',
  },
};

export default function CartWithItems(props) {
  const { cartList, onChangePayment, payment, onDeleteItem } = props;
  const [width, setWidth] = useState(window.innerWidth);
  const productList = useMemo(() => {
    let result = [];
    cartList.forEach((item, index) => {
      result.push({
        key: index,
        image: item.image,
        name: item.name,
        size: item.sizes.size,
        price: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(item.sizes.price),
        quantity: item.total,
        amount: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(item.sizes.price * item.total),
        inStock: item.sizes.quantity,
      });
    });
    return result;
  }, [cartList]);
  const columns = useRef([
    {
      title: 'Image',
      dataIndex: 'image',
      render: (_, record) => {
        return (
          <div className="cart__img-wrapper">
            <img src={record.image} />
            <span
              onClick={() => onDeleteItem(record.key)}
              className="cart__img-delete-btn"
            >
              delete
            </span>
          </div>
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Size',
      dataIndex: 'size',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      render: (_, record) => (
        <InputNumber
          min={1}
          max={record.inStock}
          defaultValue={record.quantity}
        />
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
  ]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
  }, [width]);
  return (
    <div className="cart__content-divider">
      <div className="cart__cartInfo">
        <Title level={4}>your cart</Title>
        <Table
          columns={columns.current}
          dataSource={productList}
          pagination={false}
          //   bordered
          summary={(pageData) => {
            let total = 0;
            pageData.forEach(({ amount }) => {
              total += Number(amount.replace(/[^0-9\.]+/g, ''));
            });
            return (
              <>
                <Table.Summary.Row className="cart__sum-wrapper">
                  <Table.Summary.Cell index={0} colSpan={5}>
                    <span className="cart__sum-word">TOTAL:</span>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>
                    <span className="cart__sum-price">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(total)}
                    </span>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            );
          }}
        />
      </div>
      <div className="cart__deliverInfo">
        <div className="cart__payments">
          <Title level={4}>payment methods:</Title>
          <div className="cart__payments-options">
            <Space direction="vertical">
              <Radio.Group
                value={payment}
                onChange={(e) => onChangePayment(e.target.value)}
              >
                <Radio value={1}>
                  <span className="cart__payments-options-words">
                    Cash directly at store
                  </span>
                </Radio>
                <Radio value={2}>
                  <span className="cart__payments-options-words">
                    Cash on delivery
                  </span>
                </Radio>
                <Radio value={3}>
                  <span className="cart__payments-options-words">Banking</span>
                </Radio>
              </Radio.Group>
            </Space>
          </div>
        </div>
        <div className="cart__form">
          <Title level={4}>delivery information:</Title>
          <Form
            {...layout}
            name="nest-messages"
            validateMessages={validateMessages}
          >
            {width >= 678 ? (
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name={['user', 'name']}
                    //   label="Name"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your name!',
                      },
                    ]}
                  >
                    <Input placeholder="Enter your name..." />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    //   label="Phone Number"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your phone number!',
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter your phone number..."
                      type="tel"
                    />
                  </Form.Item>
                </Col>
              </Row>
            ) : (
              <>
                <Form.Item
                  name={['user', 'name']}
                  //   label="Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your name!',
                    },
                  ]}
                >
                  <Input placeholder="Enter your name..." />
                </Form.Item>
                <Form.Item
                  name="phone"
                  //   label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your phone number!',
                    },
                  ]}
                >
                  <Input placeholder="Enter your phone number..." type="tel" />
                </Form.Item>
              </>
            )}

            <Form.Item
              name={['user', 'email']}
              //   label="Email"
              rules={[
                {
                  type: 'email',
                },
              ]}
            >
              <Input type="email" placeholder="Enter your email..." />
            </Form.Item>
            <Form.Item
              name={['user', 'address']}
              //   label="Address"
              rules={[
                {
                  required: true,
                  message: 'Please input your address!',
                },
              ]}
            >
              <Input placeholder="Enter your address..." />
            </Form.Item>
            <Form.Item name={['user', 'website']}>
              <TextArea
                rows={4}
                placeholder="Other requirements... (optional)"
                maxLength={6}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
              <Button type="primary" htmlType="submit">
                check out
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
