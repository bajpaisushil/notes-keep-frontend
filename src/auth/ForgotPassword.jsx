import React from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';


function ForgotPassword(){

  return (
    <Container className="container mt-5">
      <Card className="p-4 card-container">
        <Card.Body>
          <Card.Title className="mb-4 text-center card-title">Forgot Password</Card.Title>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Send Reset Link
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ForgotPassword;
