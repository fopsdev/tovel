import { Operation } from "overmind"
import { Post } from "./state"

export const setLoadingPosts: Operation.Mutate = ({ state }) =>
  (state.isLoadingPosts = true)

export const changeFoo: Operation.Mutate = ({ state }) =>
  (state.tblTableTestData["1"].CustomerFirstName = "Ueli")

export const unsetLoadingPosts: Operation.Mutate = ({ state }) =>
  (state.isLoadingPosts = false)

export const setPosts: Operation.Mutate<Post[]> = ({ state, value: posts }) => {
  state.posts = posts
}
