module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "Gatsby Drupal Cocktail Site",
  },
  plugins: [
    "gatsby-plugin-emotion",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: `gatsby-source-drupal-menu-links`,
      options: {
        baseUrl: `http://lando-drupal.lndo.site/`,
        menus: ["main"], // Which menus to fetch, there are the menu IDs.
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-drupal",
      options: {
        baseUrl: "http://lando-drupal.lndo.site/",
      } 
    }
  ]
};
