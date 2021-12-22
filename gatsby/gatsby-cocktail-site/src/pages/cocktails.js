import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import ArticlePreview from '../components/articlePreview';

const Articles = ({ data }) => {
    const articles = data.allNodeArticle.nodes;
    
    // var settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 2,
    //     slidesToScroll: 1,
    //     responsive: [
    //       {
    //         breakpoint: 480,
    //         settings: {
    //           slidesToShow: 1,
    //         }
    //       }
    //     ]
    //   };
    return (
        <Layout>
            <h1 className="text-3xl font-bold mt-8">Cocktails</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 ">
                {articles.map(article => (
                    <ArticlePreview
                        key={article.id}
                        title={article.title}
                        path={article.path.alias}
                        image={article.relationships.field_image.localFile.publicURL}
                        alt={article.field_image.alt}
                        summary={article.body.summary ? article.body.summary : article.body.processed.substring(0, 100) + "..."}
                    />
                ))}
              </div>
        </Layout>
    );

}

Articles.propTypes = {
    data: PropTypes.object.isRequired,
};

export const data = graphql`
{
  allNodeArticle(sort: {fields: created, order: DESC}) {
    nodes {
      id
      title
      body {
        summary
        processed
      }
      created
      field_image {
        alt
      }
      relationships {
        field_image {
            localFile {
              publicURL
            }
        }
        field_related_cocktails {
          title
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
      path {
        alias
      }
    }
  }
}

  
`;

export default Articles;