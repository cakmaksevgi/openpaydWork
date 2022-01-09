import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import {HttpClientModule} from '@angular/common/http';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

import { LaunchFacadeService } from './launch-facade.service';

export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({uri: 'https://api.example.com/graphql'}),
    cache: new InMemoryCache(),
  };
}

describe('LaunchFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [provideMockStore({}), {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    }],
    imports: [HttpClientModule, ApolloModule, HttpLinkModule],
  }));

  it('should be created', () => {
    const service: LaunchFacadeService = TestBed.get(LaunchFacadeService);
    expect(service).toBeTruthy();
  });
});
