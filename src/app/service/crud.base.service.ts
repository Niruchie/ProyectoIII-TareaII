import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IEntity from '../../types/IEntity';

@Injectable({
  providedIn: 'root'
})
export class CrudBaseService<Type extends IEntity = IEntity> {
  constructor(private client: HttpClient) { }

  protected service = '/query';

  create(entity: Type) : Observable<Type> {
    return this.client
      .post(this.service, entity) as Observable<Type>;
  }

  obtain(entity: Type) : Observable<Array<Type>> {
    return this.client
      .get(this.service) as Observable<Array<Type>>;
  }

  search(entity: Type) : Observable<Array<Type>> {
    const { id } = entity;

    const url = this.service
      .concat('/', id.toString());

    return this.client.get(url) as Observable<Array<Type>>;
  }

  update(entity: Type) : Observable<Type> {
    const { id } = entity;

    const url = this.service
      .concat('/', id.toString());

    return this.client.put(url, entity) as Observable<Type>;
  }

  delete(entity: Type) : Observable<any> {
    const { id } = entity;

    const url = this.service
      .concat('/', id.toString());

    return this.client.delete(url) as Observable<any>;
  }
}
