import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import SliderImg from '../components/slider-img';


const ArticlePreview = ({ title, path, image, alt, summary }) => (
    <div className="bg-indigo-50 rounded-md px-8 py-4">
        <Link to={path}>
            <h2 className="mb-8 text-indigo-900 text-center text-xl font-medium">{title}</h2>
            <SliderImg><img src={image} alt={alt} className="object-cover h-72 w-full" /></SliderImg>
            <div dangerouslySetInnerHTML={{__html: summary}} className="mt-5 text-indigo-900" />
        </Link>
    </div>
);

ArticlePreview.propTypes = {
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
};

export default ArticlePreview;