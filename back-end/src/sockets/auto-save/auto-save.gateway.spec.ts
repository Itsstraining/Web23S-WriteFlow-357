import { Test, TestingModule } from '@nestjs/testing';
import { AutoSaveGateway } from './auto-save.gateway';

describe('AutoSaveGateway', () => {
  let gateway: AutoSaveGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutoSaveGateway],
    }).compile();

    gateway = module.get<AutoSaveGateway>(AutoSaveGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
