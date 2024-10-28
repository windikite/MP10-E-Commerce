import { Link } from "react-router-dom";
import { Image, Container, Row, Col } from "react-bootstrap";

function NotFound() {
    return (
        <div className="bg-dark w-100 h-100 mx-auto p-5 border border-info">
            <Container>
                <Image className="mb-3" src="/404.jpg" fluid rounded />
                <Row>
                    <Col>
                        <h2 className="text-info">404 - Not Found</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="text-info">Sorry, the page you are looking for does not exist</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="text-warning">You can always go back to the <Link to='/'>homepage</Link></p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default NotFound;