export default class {
  constructor({axiosInstance}) {
    this.axios = axiosInstance
  }

  async getArtist(name) {
    return Promise.resolve([
      {
        name: name
      }
    ]);
  };
}