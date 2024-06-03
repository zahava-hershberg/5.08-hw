import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCandidateCount } from '../CandidateCountContext';
const AddCandidate=()=>{
    const { refreshPendingCount } = useCandidateCount();
    const navigate = useNavigate();
    const[candidate, setCandidate]=useState({
        firstName:'',
        lastName:'',
        email:'',
        number:'',
        notes:'',
       
    })
    const onTextChange = e => {
        const copy = { ...candidate };
        copy[e.target.name] = e.target.value;
        setCandidate(copy);

    }
    const onSubmitClick=async ()=>{
        await axios.post('/api/candidate/add', candidate);
        refreshPendingCount();
        navigate('/pending');
    }
    const{firstName, lastName, email, number, notes}=candidate;
    return(
        <div className='container' style={{marginTop:'80px'}}>
            <div className='row' style={{marginTop:'20px'}}>
                <div className='col-md-6 offset-md-3'>
                    <div className='card card-body bg-light'>
                        <h4>Add Candidate</h4>
                        <form>
                            <input type='text' onChange={onTextChange} name='firstName' className='form-control' value={firstName} placeholder='First Name'/>
                            <br/>
                            <input type='text' onChange={onTextChange} name='lastName' className='form-control' value={lastName} placeholder='Last Name'/>
                            <br/>
                            <input type='text' onChange={onTextChange} name='email' className='form-control' value={email} placeholder='Email'/>
                            <br/>
                            <input type='text' onChange={onTextChange} name='number' className='form-control' value={number} placeholder='Phone Number'/>
                            <br/>
                            <textarea name='notes' onChange={onTextChange} className='form-control' value={notes} rows='5'/>
                            <br/>
                            <button onClick={onSubmitClick} className='btn btn-primary'>Submit</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default AddCandidate;