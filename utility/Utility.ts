class Utility {
  getRandomId(string: string) {
    return string + Math.random().toString(36).substr(2, 9);
  }

  extract(str: string, regex: string, group: number) {
    const matches = str.match(regex);
    try {
      if (matches) {
        console.log(matches[group]);
        return matches[group];
      }
    } catch (error) {
      console.log(error + " String doesn't match expected regex");
    }
  }
}

export default new Utility();
