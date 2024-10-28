import { Button, Card, Image } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    
    function createCard(title, text, src, key){
        return (
            <Card className="ms-2 me-2 mb-2 p-0 shadow border-info flex-stretch-1" style={{width: '10rem', height: "15rem"}} key={key}>
                <Card.Img variant="top" src={src} style={{width: "100%"}}  />
                <Card.Body>
                    <Card.Title className="mb-0 text-start">{title}</Card.Title>
                    <Card.Text>
                        {text}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
    return (
        <div className="mx-auto p-5 border border-info text-align-center justify-content-center">
            <h1 className="text-info mx-auto">SILPH CO</h1>
            <Image className="mb-3" src="/silphLogo.jpg" fluid rounded />
            <Card className="mx-auto mb-3 border-info p-0 w-100" style={{maxWidth: "1000px"}}>
                <Card.Img className="object-fit-cover" variant="top" src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/01/pkmpokeballedit.jpg"  />
                <Card.Body>
                    <Card.Title>Now announcing our Fall 25% off sale!</Card.Title>
                    <Card.Text>
                    Find the best deals on all of your training needs!
                    </Card.Text>
                </Card.Body>
            </Card>
            <Button className="mb-3" variant="primary" style={{boxShadow: "5px 5px 5px black"}} onClick={() => navigate("/products")}>Shop Now</Button>
            
        </div>
    )
}

export default Home