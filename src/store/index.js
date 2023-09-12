import { configureStore } from "@reduxjs/toolkit";

import authReduser from "./auth-slice";
import postsReduser from "./posts-slice";

const store = configureStore({
  reducer: {
    auth: authReduser,
    posts: postsReduser,
  },
});
export default store;
