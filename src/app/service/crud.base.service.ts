import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IEntity from '../../types/IEntity';

@Injectable({
  providedIn: 'root'
})
export class CrudBaseService<Type extends IEntity = IEntity> {
  constructor(private client: HttpClient) { }

  protected service = 'query';

  create(entity: Type) {
    return this.client
      .post(this.service, entity)
  }

  obtain(entity: Type) {
    return this.client
      .get(this.service)
  }

  search(entity: Type) {
    const { id } = entity;

    const url = this.service
      .concat('/', id.toString());

    return this.client.get(url)
  }

  update(entity: Type) {
    const { id } = entity;

    const url = this.service
      .concat('/', id.toString());

    return this.client.put(url, entity);
  }

  delete(entity: Type) {
    const { id } = entity;

    const url = this.service
      .concat('/', id.toString());

    return this.client.delete(url);
  }
}
