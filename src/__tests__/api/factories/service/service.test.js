import ServiceFactory from '../../../../api/factories/service/service';
import SpotiFyService from '../../../../api/service';

describe('Service Factory', () => {

  let serviceFactory = null;

  beforeAll(() => {
    serviceFactory = ServiceFactory.create();
  })

  it('return instance of SpotifyService', () => {
    expect(serviceFactory).toBeInstanceOf(SpotiFyService);
  })

})