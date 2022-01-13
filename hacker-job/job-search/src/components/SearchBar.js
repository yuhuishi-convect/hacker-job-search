import React, { useContext, useState } from "react";
import { JobListContext } from "../App";

const SearchBar = () => {

    const [keyword, setKeyword] = useState('');
    const { setJobList } = useContext(JobListContext);

    const onQueryChange = (event) => {
        const query = event.target.value;

        setKeyword(query);
    };

    const onSubmitSearch = () => {
        setJobList([{id: 1, description: keyword}]);
    };

    return (
        <div className="level m-5" style={{ width: '80%' }}>
            <div className="level-item has-text-centered">
                <div className="field has-addons">
                    <p className="control">
                        <input className="input" type="text" placeholder="Job keywords ..." onChange={onQueryChange} value={keyword} />
                    </p>
                    <p className="control">
                        <button className="button" onClick={onSubmitSearch}>
                            Search
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )


};


export default SearchBar;