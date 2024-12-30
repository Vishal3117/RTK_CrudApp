import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { deleteUser } from '../redux/features/userDetailSlice';
import UpdatePost from './UpdatePost';

const CustomModal = ({ openModal, id, flag }) => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector(state => state.user);
    const userData = users.find(user => user.id === id);

    const handleClose = () => openModal(false);

    const removeUser = () => {
        dispatch(deleteUser(id));
        openModal(false);
    }

    return (
        <Modal show={true} onHide={handleClose} centered>
            {flag == 'view' &&
                <div>
                    <Modal.Header closeButton>
                        <Modal.Title>User Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Name : {userData?.name}</p>
                        <p>Email : {userData?.email}</p>
                        <p>Age : {userData?.age}</p>
                        <p>Gender : {userData?.gender}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        {/* <Button variant="primary">Save changes</Button> */}
                    </Modal.Footer>
                </div>
            }

            {flag == 'edit' &&
                <div>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <UpdatePost id={id} modal={openModal}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        {/* <Button variant="primary">Save changes</Button> */}
                    </Modal.Footer>
                </div>
            }

            {flag == 'delete' &&
                <div>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure want to delete {userData?.name} ?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={removeUser}>Delete</Button>
                    </Modal.Footer>
                </div>
            }
        </Modal>
    );
};

export default CustomModal;
