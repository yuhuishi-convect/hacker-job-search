import React from 'react';


const JobListContext = React.createContext(
    {
      jobList:
        [
          { id: 1, description: 'Cool job1' },
          { id: 2, description: 'Cool job2' },
          { id: 3, description: 'Cool job3' },
          { id: 4, description: 'Cool job4' },
          { id: 5, description: 'Cool job5' }
        ],
      setJobList: () => {}
    }
  );

export default JobListContext;