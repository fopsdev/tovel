"use strict";
exports.__esModule = true;
exports.setLoadingPosts = function (_a) {
    var state = _a.state;
    return (state.isLoadingPosts = true);
};
exports.changeFoo = function (_a) {
    var state = _a.state;
    return (state.foo = "hoho");
};
exports.unsetLoadingPosts = function (_a) {
    var state = _a.state;
    return (state.isLoadingPosts = false);
};
exports.setPosts = function (_a) {
    var state = _a.state, posts = _a.value;
    state.posts = posts;
};
