export const getAuthFromLocalStorage = () => {
  if (typeof window === 'undefined') return { username: null, jobTitle: null };
  
  const username = localStorage.getItem("username");
  const jobTitle = localStorage.getItem("jobTitle");
  return { username, jobTitle };
};

export const setAuthInLocalStorage = (username: string, jobTitle: string) => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem("username", username);
  localStorage.setItem("jobTitle", jobTitle);
};
