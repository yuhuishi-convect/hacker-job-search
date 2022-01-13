import React, { useContext } from 'react';
import JobListContext from '../jobStore';
import JobCard from './JobCard';

const JobList = ({ data }) => {

    const { jobList } = useContext(JobListContext);

    return (
        <div className="tile is-ancestor is-flex-direction-row is-flex-wrap-wrap	is-justify-content-space-between	">

            {!!jobList && jobList.map(
                item => (
                    <div className="tile is-6 is-parent" key={item.guid}>
                        <div className="tile is-child">
                            <JobCard item={item} />
                        </div>

                    </div>
                )
            )}

        </div>
    )
};


export default JobList;