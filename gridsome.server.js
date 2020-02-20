const axios = require("axios");
const Sources = require("./Sources");

const ID_LIST = Sources.map(tech =>
  tech.videoTutorials.map(video => video.url)
);
const FORMATTED = ID_LIST.join("%2C");

module.exports = function(api) {
  api.loadSource(async actions => {
    const API_URL = "https://www.googleapis.com/youtube/v3/videos";
    const data = await axios
      .get(
        `${API_URL}?part=snippet&key=${process.env.GRIDSOME_API_KEY}&type=video&id=${FORMATTED}`
      )
      .then(res => res.data);

    const VideoCollection = actions.addCollection("Video");

    for (const item of data.items) {
      const VIDEO_URL = Sources.find(tech =>
        tech.videoTutorials.find(video => video.url === item.id)
      );

      VideoCollection.addNode({
        id: item.id,
        category: VIDEO_URL.name,
        title: item.snippet.title,
        description: item.snippet.description,
        // hebrew: Sources.find(tech => tech.videoTutorials[videoTutorials.findOf()]),
        thumbnail: item.snippet.thumbnails.medium.url,
        color: VIDEO_URL.color
      });
    }
  });

  api.createPages(({ createPage }) => {
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

      createPage({
        path: "/:technology/:id",
        component: "./src/templates/VideoPage.vue"
      });
    });
  });
};
