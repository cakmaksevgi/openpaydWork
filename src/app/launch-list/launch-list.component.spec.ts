import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import {HttpClientModule} from '@angular/common/http';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

import { LaunchListComponent } from './launch-list.component';
import { LoaderComponent } from '../loader/loader.component';

export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({uri: 'https://api.example.com/graphql'}),
    cache: new InMemoryCache(),
  };
}

describe('LaunchListComponent', () => {
  let component: LaunchListComponent;
  let fixture: ComponentFixture<LaunchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaunchListComponent, LoaderComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideMockStore({}), {
        provide: APOLLO_OPTIONS,
        useFactory: createApollo,
        deps: [HttpLink],
      }],
      imports: [HttpClientModule, ApolloModule, HttpLinkModule,],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
