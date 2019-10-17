import React from 'react';
import _ from 'lodash';

const SelectYears = (props) => {
    const { defaultValue, handleYears, min_release_date, max_release_date } = props;
    const options = _.range(min_release_date, max_release_date + 1);
    return (
        <div className="form-group">
            <label htmlFor="selectYears">Select Year:</label>
            <select className="custom-select custom-select-lg mb-3" name="selectYears" onChange={handleYears} defaultValue={defaultValue}>
                {options.map(option =>
                    <option key={option} value={option}>{option}</option>
                )}
            </select>
        </div>
    );
}

export default SelectYears;