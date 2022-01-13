import React, { useContext } from 'react';
import { JobListContext } from "../App";

const JobList = ({ data }) => {

    const {jobList} = useContext(JobListContext);

    return (
        <div className="tile is-ancestor is-flex-direction-row is-flex-wrap-wrap	is-justify-content-space-between	">

            {!!jobList && jobList.map(
                item => (
                    <div className="tile is-6 is-parent" key={item.id}>
                        <div className="tile is-child box">
                            <p className="title">{item.description}</p>
                        </div>
                    </div>
                )
            )}

        </div>
    )
};


export default JobList;