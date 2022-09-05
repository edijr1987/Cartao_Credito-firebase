import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { CartaoCredito } from '../models/CartaoCredito';

@Injectable({
  providedIn: 'root'
})
export class CartaoService {
  private cartao$ = new Subject<any>();

  constructor(private firestore: AngularFirestore) { }

  guardarCartao(cartao: CartaoCredito): Promise<any> {
    return this.firestore.collection('cartoes').add(cartao);
  }

  obterCartoes(): Observable<any> {
    return this.firestore.collection('cartoes', ref=> ref.orderBy('dataCriacao', 'asc')).snapshotChanges();
  }

  deletarCartao(id: string): Promise<any> {
    return this.firestore.collection('cartoes').doc(id).delete();
  }

  editarCartao(id: string, cartao: any): Promise<any> {
    return this.firestore.collection('cartoes').doc(id).update(cartao);
  }

  addCartaoEdit(cartao: CartaoCredito) {
    this.cartao$.next(cartao);
  }

  getCartaoEdit(): Observable<CartaoCredito> {
    return this.cartao$.asObservable();
  }
}
