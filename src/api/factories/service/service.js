import SpotifyService from '../../service';
import AxiosService from '../../service/axios-service';
import AxiosInstance from '../../../helpers/axios/interceptors';

export default class {
  static create() {
    return new SpotifyService({
      axios: new AxiosService({axiosInstance: AxiosInstance})
    })
  }
}