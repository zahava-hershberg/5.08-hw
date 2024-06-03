import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Confirmed=()=>{
    const[candidates, setCandidates]=useState([]);
    useEffect(() => {
        const getCandidate = async () => {
            const { data } = await axios.get('/api/candidate/getbystatus?status=confirmed');
            setCandidates(data);
        }
        getCandidate();
    }, []);

    return(
        <div className='container' style={{marginTop:'80px'}}>
            <div>
                <h1>Confirmed</h1>
            </div>
            <div>
                <button className='btn btn-success'>Toggle Notes</button>
                <table className='table table-striped table-bordered table-hover'>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                {candidates.map(c => (
                        <tr key={c.id}>
                            <td>{c.firstName}</td>
                            <td>{c.lastName}</td>
                            <td>{c.email}</td>
                            <td>{c.number}</td>
                            <td>{c.notes}</td>
                        </tr>
                    ))}
                   
                </tbody>
            </table>
            </div>
        </div>
    )
    

}
export default Confirmed;