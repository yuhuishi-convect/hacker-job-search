import Header from './components/Header';
import SearchBar from './components/SearchBar';
import JobList from './components/JobList';
import React, { useEffect, useState } from "react";
import JobListContext from './jobStore';
import axios from 'axios';


const httpClient = axios.create({
  baseURL: 'https://us-west-2.aws.data.mongodb-api.com/app/hacker-job-geiwg/endpoint/jobs'
})


function App() {
  const [ jobList, setJobList ] = useState([]);

  // load the initial jobs
  useEffect(() => {
    httpClient.get('/search')
    .then(
      resp => {
        setJobList(resp.data);
      }
    )
    .catch(err => console.log(err))
  }, []);



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

export {httpClient}
export default App;