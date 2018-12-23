import SpotifyService from '../../service';
import AxiosService from '../../service/axios-service';

export class {
  static create() {
    return new SpotifyService({axios: new AxiosService()})
  }
}