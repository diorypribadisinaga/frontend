import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';


export default function Nav(props) {
    const { content, content1, contentUser } = props;
    return (
        <Navbar
            expand="lg"
            style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)' }}
        >
            <Container className="py-3">
                <Form className='d-flex'>
                    <Navbar.Brand>
                        {contentUser}
                    </Navbar.Brand>
                    {/* {contentUser} */}
                    <Col sm="4" md="5" lg="7" className='my-3'>
                        {content}
                    </Col>
                </Form>
                <Form>
                    {content1}
                </Form>
            </Container>
        </Navbar >

    );
}
