import { array, func } from 'prop-types'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Button, Card, Badge, Modal, Dropdown } from 'react-bootstrap';

const OrderProductList = ({orderId}) => {
    const [order, setOrder] = useState({});

    const fetchOrder = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/orders/${id}`)
            setOrder(response.data);
            console.log("order", order)
        }catch (error){
            console.error('Error fetching order:', error);
        }
    }

    function createCard(key, name, price, src, count){
        return (
            <Card className="ms-auto me-auto mb-0 p-0 shadow border-info " style={{width: '95%', height: "10rem"}} key={key}>
                <Row>
                    <Col style={{position: "relative", height: "10rem"}}>
                        <Card.Img src={src} style={{height: "10rem", width: "10rem", position: "absolute", left: "50%", transform: "translate(-40%, 0%)"}} />
                        <Badge bg="dark" className='text-info' style={{position: "absolute", bottom: "10%", left: "60%", transform: "translate(-30%, 0%)"}}>{count}</Badge>
                    </Col>
                    <Col>
                        <Card.Body>
                            <Card.Title className="mb-0 text-start">{price}</Card.Title>
                            <Card.Text>
                                {name}
                                <br />
                            </Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        )
    }

    useEffect(() => {
        fetchOrder(orderId)
    }, [orderId]);

    function removeCapsAndSpaces(name){
        let nocaps = name.toLowerCase();
        let indexOfWhiteSpace = nocaps.indexOf(" ")
        if (indexOfWhiteSpace != -1) {
            nocaps = nocaps.slice(0, indexOfWhiteSpace) + nocaps.slice(indexOfWhiteSpace+1)
        }
        return nocaps
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h3 className='mb-3'>Products in Order</h3>
                    <div className="bg-dark-subtle w-100 h-100 mx-auto p-2 rounded">
                        <h3 className='mb-3'>Total: {order.total}</h3>
                        {order.products_in_order && Object.values(order.products_in_order).map(product => createCard(product.id, product.name, product.price, `https://www.serebii.net/itemdex/sprites/sv/${removeCapsAndSpaces(product.name)}.png`, product.quantity))}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default OrderProductList