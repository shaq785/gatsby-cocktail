import React from 'react';
import PropTypes from 'prop-types';


const UnorderedLists = ({ list, classes, title }) => (
    <div className={classes}>
        <h2 className="mb-4 text-2xl font-medium">{title}</h2>
        <div dangerouslySetInnerHTML={{__html: list }} className="pl-4"/>
    </div>
);

UnorderedLists.propTypes = {
    list: PropTypes.string.isRequired,
    classes: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};


export default UnorderedLists;