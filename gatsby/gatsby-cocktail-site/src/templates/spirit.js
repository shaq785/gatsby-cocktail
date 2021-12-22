import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import UnorderedLists from '../components/unordered-lists';
import ArticlePreview from '../components/articlePreview';

const Spirit = ({ data }) => {
    const post = data.nodeSpirits;

    return (
        <Layout>
            <h2 className="text-3xl font-bold my-8">{post.title}</h2>
            <Link to="/spirits"><span className="px-4 py-2 bg-black text-white rounded-md">Back to Spirits</span></Link>

            <div className="flex flex-col mt-8 lg:mb-8">
                <img  className="object-cover object-center w-full h-96 mr-8 mb-8"
                    src={post.relationships.field_image.localFile.publicURL}
                    alt={post.field_image.alt}
                />
                <div>
                    <div dangerouslySetInnerHTML={{__html: post.body.processed}} className="mt-8"/>
                    <div className="grid grid-cols-1 mt-8">
                        <UnorderedLists 
                            key={post.id}
                            title=""
                            list={post.field_details ? post.field_details.processed : "" }
                            classes="flex-1 mb-8 md:mb-0 "
                        />
                    </div> 
                </div> 
            </div>
            <h3 className="text-2xl font-bold mb-0 text-center">{post.title} Cocktails</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-5 ">
                {post.relationships.field_cocktails.map(article => (
                    <ArticlePreview 
                        key={article.id}
                        title={article.title}
                        path={article.path.alias}
                        image={article.relationships.field_image.localFile.publicURL}
                        alt={article.field_image.alt}
                    />
                ))}
             </div>
        </Layout>
    )
};

Spirit.propTypes = {
    data: PropTypes.object.isRequired,
};

export const query = graphql`
    query($SpiritsId: String!){
        nodeSpirits(id: { eq: $SpiritsId }){
            id
            title
            body {
                processed
            }
            field_image {
                alt
            }
            field_details {
                processed
            }
            relationships {
                field_image {
                    localFile {
                        publicURL
                    }
                }
                field_cocktails {
                    title
                    body {
                        summary
                        processed
                    }
                    path {
                      alias
                    }
                    field_image {
                      alt
                    }
                    relationships {
                      field_image {
                        localFile {
                          publicURL
                        }
                      }
                    }
                }
            }
        }
    }
`;


export default Spirit;