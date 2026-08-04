export const getPosts = () => {
  try {
    const data = localStorage.getItem('posts');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to get posts:', error);
    return [];
  }
};

export const savePosts = (posts) => {
  try {
    localStorage.setItem('posts', JSON.stringify(posts));
    return true;
  } catch (error) {
    console.error('Failed to save posts:', error);
    return false;
  }
};

export const getUsers = () => {
  try {
    const data = localStorage.getItem('users');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to get users:', error);
    return [];
  }
};

export const saveUsers = (users) => {
  try {
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  } catch (error) {
    console.error('Failed to save users:', error);
    return false;
  }
};

export const deletePosts = () => {
  try {
    localStorage.removeItem('posts');
    return true;
  } catch (error) {
    console.error('Failed to delete posts:', error);
    return false;
  }
};

export const deleteUsers = () => {
  try {
    localStorage.removeItem('users');
    return true;
  } catch (error) {
    console.error('Failed to delete users:', error);
    return false;
  }
};

export const updatePosts = (posts) => {
  try {
    localStorage.setItem('posts', JSON.stringify(posts));
    return true;
  } catch (error) {
    console.error('Failed to update posts:', error);
    return false;
  }
};

export const updateUsers = (users) => {
  try {
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  } catch (error) {
    console.error('Failed to update users:', error);
    return false;
  }
};