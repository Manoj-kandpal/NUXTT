import axios from "axios";
import Vuex from "vuex";
import Cookie from "js-cookie";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPost: [],
      token: null,
    },

    mutations: {
      setPosts(state, posts) {
        state.loadedPost = posts;
      },
      addPost(state, post) {
        state.loadedPost.push(post);
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPost.findIndex(
          (post) => post.id === editedPost.id
        );
        state.loadedPost[postIndex] = editedPost;
      },
      setToken(state, token) {
        state.token = token;
        // console.log("token is: ", state.token);
      },
      clearToken(state) {
        state.token = null;
      },
    },

    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios
          .get(process.env.baseUrl + "/posts.json")
          .then((res) => {
            const postArray = [];
            for (const key in res.data) {
              postArray.push({ ...res.data[key], id: key });
            }
            vuexContext.commit("setPosts", postArray);
          })
          .catch((e) => context.error(e));
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      },
      addPost(vuexContext, post) {
        return axios
          .post(
            "https://nuxt-3dc38-default-rtdb.firebaseio.com/posts.json?auth==" +
              vuexContext.state.token,
            {
              ...post,
              updatedDate: new Date(),
            }
          )
          .then((result) => {
            // console.log("added post", result);
            vuexContext.commit("addPost", { ...post, id: result.data.name });
          })
          .catch((e) => console.log(e));
      },
      editPost(vuexContext, editedPost) {
        return axios
          .put(
            "https://nuxt-3dc38-default-rtdb.firebaseio.com/posts/" +
              editedPost.id +
              ".json?auth=" +
              vuexContext.state.token,
            editedPost
          )
          .then((result) => vuexContext.commit("editPost", editedPost))
          .catch((e) => console.log("error: ", e));
      },
      userAuthentication(vuexContext, authData) {
        let authUrl =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
          process.env.firebaseApiKey;
        if (!authData.isLogin) {
          authUrl =
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
            process.env.firebaseApiKey;
        }
        axios
          .post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          })
          .then((result) => {
            // console.log(result);
            vuexContext.commit("setToken", result.data.idToken);
            localStorage.setItem("token", result.data.idToken);
            let expirationTime =
              new Date().getTime() +
              Number.parseInt(result.data.expiresIn) * 1000;

            localStorage.setItem("expirationTime", expirationTime);
            Cookie.set("jwt", result.data.idToken);
            Cookie.set("expirationTime", expirationTime);
          })
          .catch((e) => console.log(e));
      },
      initAuth(vuexContext, req) {
        let token;
        let expirationTime;
        if (req) {
          if (!req.headers.cookie) {
            return;
          }
          const jwtCookie = req.headers.cookie
            .split(";")
            .find((c) => c.trim().startsWith("jwt="));
          if (!jwtCookie) {
            return;
          }
          token = jwtCookie.split("=")[1];
          expirationTime = req.headers.cookie
            .split(";")
            .find((c) => c.trim().startsWith("expirationTime="))
            .split("=")[1];
        } else if (process.client) {
          token = localStorage.getItem("token");
          expirationTime = localStorage.getItem("expirationTime");
        }
        if (new Date().getTime() > +expirationTime || !token) {
          console.log("No Token or Clear Token");
          vuexContext.dispatch("logout");
          return;
        }
        vuexContext.commit("setToken", token);
      },
      logout(vuexContext) {
        vuexContext.commit("clearToken");
        Cookie.remove("jwt");
        Cookie.remove("expirationTime");
        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("expirationTime");
        }
      },
    },

    getters: {
      loadedPost(state) {
        return state.loadedPost;
      },
      isAuthenticated(state) {
        return state.token != null;
      },
    },
  });
};

export default createStore;
