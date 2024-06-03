import React, { useState, useEffect } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { useCandidateCount } from '../CandidateCountContext';

const ViewDetails = () => {
    const { refreshPendingCount, refreshConfirmedCounts, refreshDeclinedCounts } = useCandidateCount();
    const navigate = useNavigate();
    const [candidate, setCandidate] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        const getCandidate = async () => {
            const { data } = await axios.get(`/api/candidate/getbyid?id=${id}`);
            setCandidate(data);
        }
        getCandidate();
    }, []);
    
    const onConfirmClick=async()=>{
        const{data}= await axios.post('/api/candidate/update', {...candidate, status:'confirmed'});
        setCandidate(data);
        refreshConfirmedCounts();
        refreshPendingCount();
        navigate('/confirmed');
    }
    const onDeclineClick=async()=>{
        const{data}= await axios.post('/api/candidate/update', {...candidate, status:'declined'});
        setCandidate(data);
        refreshDeclinedCounts();
        refreshPendingCount();
        navigate('/declined');
    }

  
    return (
        <div className='container' style={{ marginTop: '80px' }}>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <div className='card card-body bg-light'>
                        <h4>Name: {candidate.firstName} {candidate.lastName}</h4>
                        <h4>Email: {candidate.email} </h4>
                        <h4>Phone Number: {candidate.number}</h4>
                        <h4>Status:{candidate.status}</h4>
                        <h4>Notes:</h4>
                        <p>{candidate.notes}</p>
                        <div>
                          
                            <button onClick={onConfirmClick} className='btn btn-primary'>Confirm</button>
                            <button onClick={onDeclineClick} className='btn btn-danger'>Decline</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}
export default ViewDetails;