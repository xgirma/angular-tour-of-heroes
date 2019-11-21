import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageService = TestBed.get(MessageService);
    expect(service).toBeTruthy();
  });

  it('should add message', () => {
    const service: MessageService = TestBed.get(MessageService);
    service.add('Message 1');
    service.add('Message 2');
    expect(service.messages.length).toEqual(2);
    expect(service.messages[0]).toEqual('Message 1');
    expect(service.messages[1]).toEqual('Message 2');
  });

  it('should clear message', () => {
    const service: MessageService = TestBed.get(MessageService);
    service.add('Message 3');
    service.clear();
    expect(service.messages.length).toEqual(0);
  });
});
