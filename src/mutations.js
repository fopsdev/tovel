export const setLoadingPosts = ({ state }) => (state.isLoadingPosts = true);
export const changeFoo = ({ state }) => (state.foo = "hoho");
export const unsetLoadingPosts = ({ state }) => (state.isLoadingPosts = false);
export const setPosts = ({ state, value: posts }) => {
    state.posts = posts;
};
//# sourceMappingURL=mutations.js.map