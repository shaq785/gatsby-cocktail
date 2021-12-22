import React from "react";
import { Link, StaticQuery, graphql } from 'gatsby';


class Navigation extends React.Component {

  render() {

      return (
          <div className="flex flex-col md:flex-row justify-between items-center">
              <h1 className="text-4xl font-bold my-8">{this.props.site.siteMetadata.title}</h1>
              <ul>
                {this.props.allMenuItems.nodes.map(item => (
                    <li className="inline-block mx-4 text-xl">
                        <Link key={item.id} to={item.url}>
                            {item.title}
                        </Link>
                    </li>
                ))}
              </ul>

          </div>

      )
  }
}


export default function Layout({ children }) {
  return (
    <div style={{ margin: `0 auto 5rem`, maxWidth: 1200, padding: `0 1rem` }}>
      <StaticQuery
        query={graphql`
          query {
            site {
              siteMetadata {
                title
              }
            }
            allMenuItems {
              nodes {
                url
                title
                id
              }
            }
          }
        `}
        render={(data) => (
            <Navigation site={data.site} allMenuItems={data.allMenuItems} />
        )}
      />
      {children}
    </div>
  )
}

