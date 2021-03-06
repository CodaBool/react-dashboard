import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default function SampleFooter() {
  const [show, setShow] = useState(true);
  
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Welcome!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          This is a sample of a production project. Not representative of the final product.
          Features are missing, such as the tooltip when hovering and the live renewal of data.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => setShow(false)}>
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
