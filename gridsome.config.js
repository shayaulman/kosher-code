const collections = [
  {
    query: `{
      allVideo {
       edges {
         node {
          title
         }
        }
      }
    }`,
    transformer: ({ data }) => data.allVideo.edges.map(({ node }) => node),
    indexName: process.env.ALGOLIA_INDEX_NAME, // Algolia index name
    itemFormatter: (item) => {
      return {
        id: item.id,
        title: item.title,
      };
    }, // optional
    // matchFields: ["slug", "modified"], // Array<String> required with PartialUpdates
  },
];

module.exports = {
  siteName: "חומרי למידה לתכנות",
  plugins: [
    {
      use: "gridsome-plugin-tailwindcss",
    },
    {
      use: "gridsome-plugin-algolia",
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        collections,
        chunkSize: 10000, // default: 1000
        enablePartialUpdates: true, // default: false
      },
    },
  ],
};
