export default ({ localStorage }) => ({
  get(name) {
    const storedString = localStorage.getItem(name);
    if (!storedString) {
      return null;
    }
    return JSON.parse(storedString);
  },

  set(name, item) {
    const stringToStore = JSON.stringify(item);
    localStorage.setItem(name, stringToStore);
  },

  clear(name) {
    localStorage.removeItem(name);
  }
});
