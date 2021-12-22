import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import UnorderedLists from '../components/unordered-lists';
import OrderedLists from '../components/Ordered-lists';
import ArticlePreview from '../components/articlePreview';

const Article = ({ data }) => {
    const post = data.nodeArticle;

    return (
        <Layout>
            <h2 className="text-3xl font-bold my-8">{post.title}</h2>
            <div className="flex flex-col lg:flex-row lg:mb-8">
                <img  className="object-cover object-top w-full h-96 lg:h-full lg:w-96 mr-8 mb-8 lg:mb-0"
                    src={post.relationships.field_image.localFile.publicURL}
                    alt={post.field_image.alt}
                />
                <div>
                    <Link to="/cocktails"><span className="px-4 py-2 bg-black text-white rounded-md">Back to Cocktails</span></Link>

                    <div dangerouslySetInnerHTML={{__html: post.body.processed}} className="mt-8"/>

                    <div className="grid grid-cols-1 mt-8 md:grid-cols-2 lg:gap-6">
                        <UnorderedLists 
                            key={post.id}
                            title="Ingredients"
                            list={post.field_ingredients.processed}
                            classes="flex-1 mb-8 md:mb-0 "
                        />

                        <OrderedLists 
                            key={post.id}
                            title="Directions"
                            list={post.field_directions.processed}
                            classes="flex-1" 
                        />
                    </div>
                    <div>
                        <p><span className="font-bold">Base Spirit:</span> <Link to={post.relationships.field_spirit.path.alias } className="text-indigo-900 underline">{post.relationships.field_spirit.title }</Link></p>
                    </div>
                </div>  
            </div>
            <h3 className="text-2xl font-bold mb-0 text-center">Related Cocktails</h3>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 mt-5 ">
                {post.relationships.field_related_cocktails.map(article => (
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

Article.propTypes = {
    data: PropTypes.object.isRequired,
};

export const query = graphql`
    query($ArticleId: String!){
        nodeArticle(id: { eq: $ArticleId }){
            id
            title
            body {
                processed
            }
            field_image {
                alt
            }
            field_directions {
                processed
            }
            field_ingredients {
                processed
            }
            relationships {
                field_image {
                    localFile {
                        publicURL
                    }
                }
                field_related_cocktails {
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
                field_spirit {
                    title
                    path {
                      alias
                    }
                }
            }
        }
    }
`;


export default Article;