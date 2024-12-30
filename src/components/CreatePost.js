import React, { useReducer } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { createUser } from '../redux/features/userDetailSlice';
import { useNavigate } from 'react-router-dom';


const CreatePost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, stateDispatch] = useReducer(stateReducer, { name: '', email: '', age: '', gender: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(state);
        dispatch(createUser(state));
        navigate('/allpost');
    }

    return (
        <Form className='w-50 mx-auto' onSubmit={handleSubmit}>
            <h1 className='my-2'>Enter your details</h1>
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
                    onChange={(e) => stateDispatch({ type: ACTION.SET_GENDER, payload: e.target.value })}
                />
                <Form.Check
                    inline
                    label="Female"
                    name="gender"
                    type='radio'
                    value='Female'
                    onChange={(e) => stateDispatch({ type: ACTION.SET_GENDER, payload: e.target.value })}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default CreatePost;

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