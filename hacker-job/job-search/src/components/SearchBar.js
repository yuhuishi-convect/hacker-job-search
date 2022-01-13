import React, { useContext, useEffect, useState } from "react";
import JobListContext from "../jobStore";
import { httpClient } from "../App";

const SearchBar = () => {

    const [keyword, setKeyword] = useState('');
    const { setJobList } = useContext(JobListContext);

    const onQueryChange = (event) => {
        const query = event.target.value;

        setKeyword(query);
    };

    // auto complete
    useEffect(() => {
        httpClient.get('/search', {
            params: {
                query: keyword
            }
        }).then(resp => setJobList(resp.data))
            .catch(err => console.log(err))
    }, [keyword]);

    return (
        <div className="level m-5" style={{ width: '80%' }}>
            <div className="level-item has-text-centered">
                <div className="field ">
                    <p className="control has-icons-right">
                        <input className="input" style={{ minWidth: '400px' }} type="text" placeholder="Job keywords ..." onChange={onQueryChange} value={keyword} />
                        <span className="icon is-right">
                            <i className="fas fa-search"></i>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )


};


export default SearchBar;