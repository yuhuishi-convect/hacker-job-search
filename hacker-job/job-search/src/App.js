import Header from './components/Header';
import SearchBar from './components/SearchBar';
import JobList from './components/JobList';
import React, { useState } from "react";


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


function App() {
  const [ jobList, setJobList ] = useState([]);

  return (
    <main>
      <div className='container'>
        <Header />

        <JobListContext.Provider value={
          {jobList, setJobList}
        }>
          <SearchBar />

          <JobList />

        </JobListContext.Provider>
      </div>
    </main>
  );
};

export { JobListContext };
export default App;