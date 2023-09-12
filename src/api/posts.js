import axios from "axios";

// const Api = axios.create({ baseURL: "http://localhost:5000" });
const Api = axios.create({ baseURL: "https://kind-jade-goshawk-slip.cyclic.app" });

Api.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchAllPosts = (page) => Api.get(`/posts?page=${page}`);
export const fetchAllPost = (id) => Api.get(`/posts/getPost/${id}`);
export const fetchPostsBySearch = (searchQuery) =>
  Api.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
// export const createPost = (newPost) => {
//   console.log(newPost);
//   return fetch(`http://localhost:5000/posts/`, {
//     method: "POST",
//     body: newPost,
//     headers: {
//       Authorization: `Bearer ${
//         JSON.parse(localStorage.getItem("profile")).token
//       }`,
//     },
//   });
// };
// Api.post("/posts", newPost, {
//   headers: {
//     "Content-Type": "multipart/form-data",
//   },
// });
export const createPost = (newPost) => Api.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  Api.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => Api.delete(`/posts/${id}`);
export const updateLikeCount = (id) => Api.patch(`/posts/${id}/likeCount`);
export const comment = (value, id) =>
  Api.post(`/posts/${id}/comment`, { value: value });
