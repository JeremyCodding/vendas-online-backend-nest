import { Test, TestingModule } from '@nestjs/testing';
import { CityController } from '../city.controller';
import { CityService } from '../city.service';
import { stateMock } from '../../state/__mocks__/state.mock';
import { cityMock } from '../__mocks__/city.mock';

describe('AddressController', () => {
  let controller: CityController;
  let cityService: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CityService,
          useValue: {
            getAllCitiesByStateId: jest.fn().mockResolvedValue([cityMock]),
          },
        },
      ],
      controllers: [CityController],
    }).compile();

    controller = module.get<CityController>(CityController);
    cityService = module.get<CityService>(CityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(cityService).toBeDefined();
  });

  it('should return all cities in state', async () => {
    const cities = await controller.getCityByStateId(stateMock.id);

    expect(cities).toEqual([cityMock]);
  });
});
