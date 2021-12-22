import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';


const Header = ({ title, path}) => (
    <div className="">
        <Link to={path}>
            {title}
        </Link>
    </div>
);

Header.propTypes = {
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
};

export default Header;