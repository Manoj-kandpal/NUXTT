export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "project",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: 'stylesheet"',
        href: "https://fonts.googleapis.com/css2?family=Gluten:wght@100&display=swap",
      },
    ],
  },
  loading: {
    color: "blue",
    height: "2px",
    throttle: 0,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/core-components.js", "@/plugins/date-filter.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    standalone: true,
  },

  env: {
    baseUrl: "https://nuxt-3dc38-default-rtdb.firebaseio.com",
    firebaseApiKey: "AIzaSyBXp8KMOEDhrLu0JSO9mu5TkMcVUgAfOis",
  },
};
