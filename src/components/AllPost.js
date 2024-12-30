import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { readUser } from '../redux/features/userDetailSlice';
import CustomModal from './CustomModal';


const AllPost = () => {
    const dispatch = useDispatch();
    const { users: posts, loading, error, searchData } = useSelector(state => state.user);
    const [postList, setPostList] = useState([])
    const [userId, setUserId] = useState('');
    const [flag, setFlag] = useState('');
    const [genderFilter, setGenderFilter] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(readUser());
    }, [])

    useEffect(() => {
        const items = posts.filter((ele) => {
            if (searchData.length === 0) {
                return ele
            } else {
                const items = ele.name.toLowerCase().includes(searchData.toLowerCase());
                return items;
            }
        }).filter((ele) => {
            if (genderFilter === 'Male') {
                return ele.gender === genderFilter
            }
            if (genderFilter === 'Female') {
                return ele.gender === genderFilter
            } else {
                return ele;
            }
        })
        setPostList(items)
    }, [searchData, genderFilter])

    const viewUser = (id) => {
        setFlag('view')
        setUserId(id);
        setShowModal(true);
    }

    const deleteUser = (id) => {
        setFlag('delete')
        setUserId(id);
        setShowModal(true);
    }

    const updateUser = (id) => {
        setFlag('edit')
        setUserId(id);
        setShowModal(true);
    }

    if (loading) {
        return (<h2>Loading...</h2>)
    }
    return (
        <>
            <div className='container mt-2'>
                <h2>Added Posts</h2>
                <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center">
                        <input
                            className="form-check-input me-2"
                            name="gender"
                            type="radio"
                            checked={genderFilter === ''}
                            onChange={(e) => setGenderFilter('')}
                        />
                        <label className="form-check-label">All</label>
                    </div>
                    <div className="d-flex align-items-center">
                        <input
                            className="form-check-input me-2"
                            name="gender"
                            type="radio"
                            value="Male"
                            checked={genderFilter === 'Male'}
                            onChange={(e) => setGenderFilter(e.target.value)}
                        />
                        <label className="form-check-label">Male</label>
                    </div>
                    <div className="d-flex align-items-center">
                        <input
                            className="form-check-input me-2"
                            name="gender"
                            type="radio"
                            value="Female"
                            checked={genderFilter === 'Female'}
                            onChange={(e) => setGenderFilter(e.target.value)}
                        />
                        <label className="form-check-label">Female</label>
                    </div>
                </div>


                {showModal && <CustomModal openModal={setShowModal} id={userId} flag={flag} />}
                <div className='row gap-4 mt-4'>
                    {posts &&
                        postList.map(post => (
                            <Card key={post.id} style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{post.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{post.email}</Card.Subtitle>
                                    <Card.Text>
                                        Age : {post.age}
                                    </Card.Text>
                                    <Card.Text>
                                        {post.gender}
                                    </Card.Text>
                                    <Card.Link style={{
                                        color: '#007bff',
                                        fontWeight: 'bold',
                                        textDecoration: 'underline',
                                        cursor: 'pointer',
                                    }} onClick={() => { viewUser(post.id) }}>View</Card.Link>
                                    <Card.Link style={{
                                        color: '#007bff',
                                        fontWeight: 'bold',
                                        textDecoration: 'underline',
                                        cursor: 'pointer',
                                    }} onClick={() => { updateUser(post.id) }}>Edit</Card.Link>
                                    <Card.Link style={{
                                        color: '#007bff',
                                        fontWeight: 'bold',
                                        textDecoration: 'underline',
                                        cursor: 'pointer',
                                    }} onClick={() => { deleteUser(post.id) }}>Delete</Card.Link>
                                </Card.Body>
                            </Card>))}
                </div>

            </div>

        </>


    );
}

export default AllPost