import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Product2: React.FC = () => {
    const [showMainModal, setShowMainModal] = useState(false);
    const [showNestedModal, setShowNestedModal] = useState(false);
  

  
    return (
      <div className="app">
        <Button variant="primary" onClick={() => setShowMainModal(true)}>
          Open Main Modal
        </Button>
  
        <Modal show={showMainModal} onHide={() => setShowMainModal(false)} backdropClassName="custom-backdrop">
          <div  className="modal-content-wrapper">
            <Modal.Header closeButton>
              <Modal.Title>Main Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Button variant="secondary" onClick={() => setShowNestedModal(true)}>
                Open Nested Modal
              </Button>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={() => setShowMainModal(false)}>
                Close Main Modal
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
  
        <Modal show={showNestedModal} onHide={() => setShowNestedModal(false)} backdropClassName="custom-backdrop">
          <div className="modal-content-wrapper">
            <Modal.Header closeButton>
              <Modal.Title>Nested Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>This is the nested modal content.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={() => setShowNestedModal(false)}>
                Close Nested Modal
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </div>
    );
  };
  
  export default Product2;