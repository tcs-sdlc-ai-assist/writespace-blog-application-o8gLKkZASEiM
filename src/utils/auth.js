/**
 * Session management utilities
 */

export const getSession = () => {
  try {
    const data = localStorage.getItem('authSession');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to get session:', error);
    return null;
  }
};

export const setSession = (session) => {
  try {
    localStorage.setItem('authSession', JSON.stringify(session));
    return true;
  } catch (error) {
    console.error('Failed to set session:', error);
    return false;
  }
};

export const clearSession = () => {
  try {
    localStorage.removeItem('authSession');
    return true;
  } catch (error) {
    console.error('Failed to clear session:', error);
    return false;
  }
};
```