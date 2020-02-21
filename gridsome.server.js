const axios = require("axios");
const Sources = require("./Sources");

let id_list = Sources.map(tech => tech.videoTutorials.map(video => video.url));

const ID_LIST = [].concat.apply([], id_list);

const CHUNK_SIZE = 50;

const CHUNKS_OF_FIFTY = ID_LIST.map((e, i) => {
  return i % CHUNK_SIZE === 0 ? ID_LIST.slice(i, i + CHUNK_SIZE) : null;
}).filter(e => e);

const formatted = CHUNKS_OF_FIFTY.map(chunk => chunk.join("%2C"));

module.exports = function(api) {
  api.loadSource(async actions => {
    const BASE_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet&key=${process.env.GRIDSOME_API_KEY}&type=video&id=`;

    const data = await axios
      .all(formatted.map(req => axios.get(`${BASE_URL}${req}`)))
      .then(res => res.map(r => r.data));

    const VideoCollection = actions.addCollection("Video");
    for (const ite of data) {
      for (const item of ite.items) {
        const VIDEO_URL = Sources.find(tech =>
          tech.videoTutorials.find(video => video.url === item.id)
        );

        VideoCollection.addNode({
          id: item.id,
          category: VIDEO_URL.name,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.medium.url,
          color: VIDEO_URL.color
        });
      }
    }
  });

  api.createPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(`
      {
        allVideo {
          edges {
            node {
              id
              title
              description
            }
          }
        }
      }
    `);

    data.allVideo.edges.forEach(({ node }) => {
      createPage({
        path: `/:category/${node.id}`,
        component: "./src/templates/VideoPage.vue",
        context: {
          id: node.id,
          title: node.title,
          description: node.description
        }
      });
    });

    const videoCategories = Sources.map(tech => tech.name);
    videoCategories.forEach(cat => {
      createPage({
        path: `/${cat.toLowerCase()}`,
        component: "./src/templates/TechnologyPage.vue",
        context: {
          technology: cat.toLowerCase(),
          color: Sources.find(tech => tech.name === cat).color
        }
      });
    });
  });
};
