export default class {
  constructor({axios}) {
    this.axios = axios
  }

  async searchArtist(name) {
    return this.axios.getArtist(name)
  }

}
