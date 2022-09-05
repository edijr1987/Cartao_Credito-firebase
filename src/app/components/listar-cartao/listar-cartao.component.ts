import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartaoCredito } from 'src/app/models/CartaoCredito';
import { CartaoService } from 'src/app/services/cartao.service';

@Component({
  selector: 'app-listar-cartao',
  templateUrl: './listar-cartao.component.html',
  styleUrls: ['./listar-cartao.component.css']
})

export class ListarCartaoComponent implements OnInit {
  listCartoes: CartaoCredito[] = [];

  constructor(private _cartaoService: CartaoService, 
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obterCartoes();
  }

  obterCartoes() {
    this. _cartaoService.obterCartoes().subscribe(doc => {
      this.listCartoes = [];
      doc.forEach((element: any) => {
        this.listCartoes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
      console.log(this.listCartoes)
    })
  }

  deletarCartao(id: any) {
    this._cartaoService.deletarCartao(id).then(() => {
      this.toastr.error('O cartão foi deletado com êxito!', 'Registro Eliminado')
    }, error => {
      this.toastr.error('Opps...alguma coisa deu errado!', 'Error')
      console.log(error);
    })
  }

  editarCartao(cartao: CartaoCredito) {
    this._cartaoService.addCartaoEdit(cartao);
  }
}
