export type Post = {
    id: number
    title: string
    body: string
}

export let isLoadingPosts: boolean = false

export let posts: Post[] = []

export const foo: string = "bar";