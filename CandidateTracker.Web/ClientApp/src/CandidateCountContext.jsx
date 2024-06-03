import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const CandidateCountContext = createContext();

const CandidateCountContextComponent = (props) => {
    const [pendingCount, setPendingCount] = useState(0);
    const [confirmedCount, setConfirmedCount] = useState(0);
    const [declinedCount, setDeclinedCount] = useState(0);

    const refreshPendingCount = async () => {
        const { data } = await axios.get('/api/candidate/getpendingcounts');
        setPendingCount(data);
    }

    const refreshConfirmedCounts = async () => {
        const { data } = await axios.get('/api/candidate/getconfirmedcounts');
        setConfirmedCount(data);
    }

    const refreshDeclinedCounts = async () => {
        const { data } = await axios.get('/api/candidate/getdeclinedcounts');
        setDeclinedCount(data);
    }

    useEffect(() => {
        refreshPendingCount();
        refreshConfirmedCounts();
        refreshDeclinedCounts();
    }, []);

    const obj = {
        pendingCount,
        refreshPendingCount,
        confirmedCount,
        refreshConfirmedCounts,
        declinedCount,
        refreshDeclinedCounts
    }

    return (
        <CandidateCountContext.Provider value={obj}>
            {props.children}
        </CandidateCountContext.Provider>
    );
}

const useCandidateCount = () => {
    return useContext(CandidateCountContext);
}

export default CandidateCountContextComponent;
export { useCandidateCount };

