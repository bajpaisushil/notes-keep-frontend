import React from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';


function ResetPassword(){

  return (
    <Container className="container mt-5">
      <Card className="p-4 card-container">
        <Card.Body>
          <Card.Title className="mb-4 text-center card-title">Reset Password</Card.Title>
          <Form>
            <Form.Group controlId="formBasicNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your new password" />
            </Form.Group>
            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm your new password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Reset Password
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ResetPassword;
