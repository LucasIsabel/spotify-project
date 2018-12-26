export default class {
  constructor({axiosInstance}) {
    this.axios = axiosInstance
  }

  async getArtist(name) {
    return this.axios.get(`/search?q=${name}&type=artist`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('secure_token')}`
      }
    });
  };

  async getAlbumsById(id){
    return this.axios.get(`/artists/${id}/albums?include_groups=album`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('secure_token')}`
      }
    });
  };
}