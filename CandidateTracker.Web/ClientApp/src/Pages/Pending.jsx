import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Pending = () => {

    const [candidates, setCandidates] = useState([])
    useEffect(() => {
        const getCandidate = async () => {
            const { data } = await axios.get('/api/candidate/getbystatus?status=pending');
            setCandidates(data);
        }
        getCandidate();
    }, []);
    return (
        <div className='container' style={{ marginTop: '80px' }}>
            <table className='table table-striped table-bordered table-hover'>
                <thead>
                    <tr>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates.map(c => (
                        <tr key={c.id}>
                            <td>
                                <Link to={`/details/${c.id}`}>
                                    View Details
                                </Link>
                            </td>
                            <td>View Details</td>
                            <td>{c.firstName}</td>
                            <td>{c.lastName}</td>
                            <td>{c.email}</td>
                            <td>{c.number}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )

}

export default Pending