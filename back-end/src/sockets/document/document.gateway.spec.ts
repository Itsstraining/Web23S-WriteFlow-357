import { Test, TestingModule } from '@nestjs/testing';
import { DocumentGateway } from './document.gateway';

describe('DocumentGateway', () => {
  let gateway: DocumentGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentGateway],
    }).compile();

    gateway = module.get<DocumentGateway>(DocumentGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
