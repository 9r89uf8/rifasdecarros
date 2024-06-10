import { useStore } from '../store/store'; // Ensure you import the correct store

// Fetch posts from the API
export const fetchPosts = async () => {
    const setPosts = useStore.getState().setPosts;
    try {
        const response = await fetch('/api/posts/get');

        if (response.ok) {
            const posts = await response.json();
            setPosts(posts);
            return posts;
        } else {
            throw new Error('Failed to fetch posts');
        }
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Fetch a single post by ID
export const fetchPostById = async (id) => {
    const setPost = useStore.getState().setPost;
    try {
        const response = await fetch(`/api/posts/${id}`);
        if (response.ok) {
            const post = await response.json();
            setPost(post);
            return post;
        } else {
            throw new Error('Failed to fetch post');
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Create a new post
export const createPost = async (formData) => {
    const addPost = useStore.getState().addPost;
    try {
        const response = await fetch('/api/posts/create', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const newPost = await response.json();
            addPost(newPost);
            return newPost;
        } else {
            throw new Error('Failed to create post');
        }
    } catch (error) {
        console.error(error.message);
        return null;
    }
};


// Edit an existing post
export const editPost = async (id, post) => {
    const updatePost = useStore.getState().updatePost;
    try {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        });

        if (response.ok) {
            const updatedPost = await response.json();
            updatePost(updatedPost);
            return updatedPost;
        } else {
            throw new Error('Failed to edit post');
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Delete a post
export const deletePost = async (id) => {
    const removePost = useStore.getState().removePost;
    try {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            removePost(id);
            return { id };
        } else {
            throw new Error('Failed to delete post');
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};
