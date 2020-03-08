const axios = require("axios");

const videoTutorials = require("./data/videoTutorials");
const redditChannels = require("./data/redditChannels");
const podcasts = require("./data/podcasts");

let id_list = videoTutorials.map(tech =>
  tech.videoTutorials.map(video => video.url)
);

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
    for (const d of data) {
      for (const item of d.items) {
        // API returns reversed
        const technologyName = videoTutorials.find(tech =>
          tech.videoTutorials.find(video => video.url === item.id)
        );
        VideoCollection.addNode({
          id: item.id,
          name: technologyName.name.toLowerCase(),
          category: technologyName.category,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.medium.url,
          publishedAt: item.snippet.publishedAt,
          color: technologyName.color
        });
      }
    }

    const RedditChannels = actions.addCollection("Reddit");
    redditChannels.forEach(channel => {
      RedditChannels.addNode({
        name: channel.name,
        color: channel.color
      });
    });

    const PodcastsCollection = actions.addCollection("Podcast");
    podcasts.forEach(podcast => {
      PodcastsCollection.addNode({
        name: podcast.name,
        description: podcast.description,
        link: podcast.link,
        color: podcast.color,
        image: podcast.image
      });
    });

    const Categories = actions.addCollection("Category");
    videoTutorials.forEach(category => {
      Categories.addNode({
        name: category.name,
        hebrewName: category.hebrewName,
        category: category.category,
        tags: category.tags,
        thumbnail: category.thumbnail,
        officialSite: category.officialSite,
        color: category.color,
        amountOfVideos: category.videoTutorials.length
      });
    });
  });

  api.createPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(`
      {
        allVideo {
          edges {
            node {
              name
              id
              title
              description
              category
              publishedAt
            }
          }
        }
      }
    `);

    data.allVideo.edges.forEach(({ node }) => {
      if (node.category !== "playlist") {
        createPage({
          path: `/video-tutorials/${node.name}/${node.id}`,
          component: "./src/templates/VideoPage.vue",
          context: {
            id: node.id,
            name: node.name,
            title: node.title,
            description: node.description,
            category: node.category,
            publishedAt: node.publishedAt
          }
        });
      }
    });

    videoTutorials.forEach(category => {
      if (category.category !== "playlist") {
        createPage({
          path: `/video-tutorials/${category.name.toLowerCase()}`,
          component: "./src/templates/TechnologyPage.vue",
          context: {
            technology: category.name.toLowerCase(),
            category: category.category,
            hebrewName: category.hebrewName,
            amountOfVideos: category.videoTutorials.length,
            color: category.color
          }
        });
      } else if (category.category === "playlist") {
        const PRETTY_PATH = category.name.replace(" ", "-").toLowerCase();
        createPage({
          path: `/video-tutorials/playlists/${PRETTY_PATH}`,
          component: "./src/templates/PlaylistPage.vue",
          context: {
            name: category.name.toLowerCase(),
            hebrewName: category.hebrewName,
            amountOfVideos: category.videoTutorials.length,
            allVideos: category.videoTutorials,
            color: category.color
          }
        });
      }
    });
  });
};
