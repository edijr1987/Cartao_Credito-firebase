import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartaoCredito } from 'src/app/models/CartaoCredito';
import { CartaoService } from 'src/app/services/cartao.service';

@Component({
  selector: 'app-criar-cartao',
  templateUrl: './criar-cartao.component.html',
  styleUrls: ['./criar-cartao.component.css']
})

export class CriarCartaoComponent implements OnInit {
  form: FormGroup;
  loading = false;
  titulo = "Adicionar Cartão";
  id: string | undefined;

  constructor(private fb: FormBuilder,
              private _cartaoService: CartaoService,
              private toastr: ToastrService) { 
    this.form = this.fb.group({
      titular: ['', [Validators.required, Validators.minLength(5)]],
      numeroCartao: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      dataExpiracao: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    })
   }


  ngOnInit(): void {
    this._cartaoService.getCartaoEdit().subscribe(data => {
      console.log(data);
      this.id = data.id;
      this.titulo = 'Editar Cartão';
      this.form.patchValue({
        titular: data.titular,
        numeroCartao: data.numeroCartao,
        dataExpiracao: data.dataExpiracao,
        cvv: data.cvv,
      })
    })
  }

  guardarCartao() {

    if(this.id === undefined) {
      // Criamos um novo cartão
      this.adicionarCartao();
    } else {
      // Editamos um novo cartão
      this.editarCartao(this.id)
    }

  }

  editarCartao(id: string) {
    const CARTAO: any = {
      titular: this.form.value.titular,
      numeroCartao: this.form.value.numeroCartao,
      dataExpiracao: this.form.value.dataExpiracao,
      cvv: this.form.value.cvv,
      dataAtualizacao: new Date(),
    }
    this.loading = true;
    this._cartaoService.editarCartao(id, CARTAO).then(() => {
      this.loading = false;
      this.titulo = 'Adicionar cartão';
      this.form.reset()
      this.id = undefined;
      this.toastr.info('O cartão foi atualizado com sucesso!', 'Registro atualizado!')
    }, error => {
      console.log(error)
    })
  }

  adicionarCartao() {
    const CARTAO: CartaoCredito = {
      titular: this.form.value.titular,
      numeroCartao: this.form.value.numeroCartao,
      dataExpiracao: this.form.value.dataExpiracao,
      cvv: this.form.value.cvv,
      dataCriacao: new Date(),
      dataAtualizacao: new Date()
    }

    this.loading = true;
    this._cartaoService.guardarCartao(CARTAO).then(() => {
      this.loading = false;
      console.log('Cartão registrado');
      this.toastr.success('O cartão foi registrado com sucesso!', 'Cartão registrado!')
      this.form.reset();
    }, error => {
      this.loading = false;
      this.toastr.error('Opss... aconteceu um erro', 'Error')
      console.log(error);
    })
  }
}
