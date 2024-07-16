import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../models/store.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private id: string = '';
  private apiStores: string = 'http://127.0.0.1:8000/api/stores';
  private apiProducts: string = 'http://127.0.0.1:8000/api/products';

  constructor(private http: HttpClient) {}

  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(this.apiStores);
  }

  updateStore(store: Store): Observable<Store> {
    const url = `${this.apiStores}/${store.id}`;
    return this.http.put<Store>(url, store);
  }

  newStore(store: Store): Observable<Store> {
    return this.http.post<Store>(this.apiStores, store);
  }

  deleteStore(store: Store): Observable<Store> {
    const url = `${this.apiStores}/${store.id}`;
    return this.http.delete(url);
  }

  getProductsByStore(store: Store): Observable<Product[]> {
    const url = `${this.apiStores}/${store.id}/products`;
    return this.http.get<Product[]>(url);
  }

  updateProduct(product: Product): Observable<Product> {
    const url = `${this.apiProducts}/${product.id}`;
    return this.http.put<Product>(url, product);
  }

  newProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiProducts, product);
  }

  deleteProduct(product: Product): Observable<Product> {
    const url = `${this.apiProducts}/${product.id}`;
    return this.http.delete(url);
  }
}
