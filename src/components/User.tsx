import { useState, useEffect } from 'react'
import { FaRegEnvelope, FaGlobe, FaPhoneAlt, FaRegHeart, FaEdit, FaTrash } from 'react-icons/fa';
import './User.css'

function User() {

    const [users, setUsers] = useState<any>();

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((data) => {
                setUsers(data.map((user: any) => {
                    //add new property to keep track of favorites
                    return { ...user, favorite: false };
                }));
            });
    }, []);

    const toggleFavorite = (id: number) => {
        setUsers(
            users.map((data: any) => {
                if (data.id === id) {
                    return { ...data, favorite: !data.favorite }
                }
                else {
                    return data
                }
            })
        )
    }

    const removeUser = (id: number) => {
        setUsers(
            users.filter((data: any) => data.id !== id)
        )
    }

    return (
        <div className='users'>
            {users && users.map((user: any) => (
                <div className="card">
                    <img className='user-image' src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}></img>
                    <div className='card-body'>
                        <div className='user-name'>{user.name}</div>
                        <div className='user-detail'><FaRegEnvelope className='card-icon' />{user.email}</div>
                        <div className='user-detail'><FaPhoneAlt className='card-icon' />{user.phone}</div>
                        <div className='user-detail'><FaGlobe className='card-icon' />{user.website}</div>
                    </div>
                    <div className='card-footer'>
                        <FaRegHeart className='card-button' onClick={() => toggleFavorite(user.id)} style={{ color: user.favorite ? '#ea3427' : '#525152' }} />|
                        <FaEdit className='card-button' />|
                        <FaTrash className='card-button' onClick={() => removeUser(user.id)} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default User;