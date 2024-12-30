import React, { useEffect, useReducer, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/features/userDetailSlice';
import { useNavigate } from 'react-router-dom';

const UpdatePost = ({ id, modal }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { users, loading, error } = useSelector(state => state.user);
    const userData = users.find(user => user.id === id);
    const [state, stateDispatch] = useReducer(stateReducer, { name: userData?.name, email: userData?.email, age: userData?.age, gender: userData?.gender });

    const handleSubmit = (e) => {
        e.preventDefault();
        state.id = +id;
        console.log(state);
        dispatch(updateUser(state));
        modal(false)
        navigate('/allpost');
    }

    return (
        <Form className='w-50 mx-auto' onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                    name='name'
                    type="text"
                    placeholder="Enter full name"
                    value={state.name}
                    onChange={(e) => stateDispatch({ type: ACTION.SET_NAME, payload: e.target.value })}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    name='email'
                    type="email"
                    placeholder="Enter email"
                    value={state.email}
                    onChange={(e) => stateDispatch({ type: ACTION.SET_EMAIL, payload: e.target.value })}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Age</Form.Label>
                <Form.Control
                    name='age'
                    type="text"
                    placeholder="Enter age"
                    value={state.age}
                    onChange={(e) => stateDispatch({ type: ACTION.SET_AGE, payload: e.target.value })}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Check
                    inline
                    label="Male"
                    name="gender"
                    type='radio'
                    value='Male'
                    checked={state.gender === 'Male'}
                    onChange={(e) => stateDispatch({ type: ACTION.SET_GENDER, payload: e.target.value })}
                />
                <Form.Check
                    inline
                    label="Female"
                    name="gender"
                    type='radio'
                    value='Female'
                    checked={state.gender === 'Female'}
                    onChange={(e) => stateDispatch({ type: ACTION.SET_GENDER, payload: e.target.value })}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default UpdatePost;

const stateReducer = (state, action) => {
    switch (action.type) {
        case ACTION.SET_NAME:
            return { ...state, name: action.payload };
        case ACTION.SET_EMAIL:
            return { ...state, email: action.payload };
        case ACTION.SET_AGE:
            return { ...state, age: action.payload };
        case ACTION.SET_GENDER:
            return { ...state, gender: action.payload };
        default:
            throw new Error();
    }
}

const ACTION = {
    SET_NAME: 'SET_NAME',
    SET_EMAIL: 'SET_EMAIL',
    SET_AGE: 'SET_AGE',
    SET_GENDER: 'SET_GENDER',
}