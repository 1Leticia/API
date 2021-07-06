import { EnderecosService } from './../../enderecos.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Endereço } from 'src/app/Model/Endereço';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-enderecos',
  templateUrl: './enderecos.component.html',
  styleUrls: ['./enderecos.component.css']
})
export class EnderecosComponent implements OnInit {

  formulario: any;
  tituloFormulario: string;
  enderecos : Endereço[];
  nomeEndereço: string;
  endereçoId: number;

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false; 
  
  modalRef: BsModalRef | undefined;

  constructor(private enderecosService: EnderecosService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.enderecosService.PegarTodos().subscribe((resultado) => {
      this.enderecos = resultado;
    });
  }

  ExibirFormularioCadastro(): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.tituloFormulario = 'Novo Formulario';
    this.formulario = new FormGroup({
      logradouro: new FormControl(null),
      numero: new FormControl(null),
      complemento: new FormControl(null),
      bairro: new FormControl(null),
      cep: new FormControl(null),
      cidade: new FormControl(null),
      estado: new FormControl(null)
    });
  }

  ExibirFormularioAtualizacao(endereçoId): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.enderecosService.PegarPeloId(endereçoId).subscribe((resultado) => {
      this.tituloFormulario = `Atualizar ${resultado.logradouro} ${resultado.numero}`;

      this.formulario = new FormGroup({
        endereçoId: new FormControl(resultado.endereçoId),
        logradouro: new FormControl(resultado.logradouro),
        numero: new FormControl(resultado.numero),
        complemento: new FormControl(resultado.complemento),
        bairro: new FormControl(resultado.bairro),
        cep: new FormControl(resultado.cep),
        cidade: new FormControl(resultado.cidade),
        estado: new FormControl(resultado.estado)
      });
    });
  }

  EnviarFormulario(): void {
    const enderecos: Endereço = this.formulario.value;

    if (enderecos.endereçoId > 0) {
      this.enderecosService.AtualizarEndereço(enderecos).subscribe((resultado) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('Endereço atualizado com sucesso');
        this.enderecosService.PegarTodos().subscribe((registros) => {
          this.enderecos = registros;
        });
      });
    } else {
      this.enderecosService.SalvarEndereços(enderecos).subscribe((resultado) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('Endereço inserido com sucesso');
        this.enderecosService.PegarTodos().subscribe((registros) => {
          this.enderecos = registros;
        });
      });
    }
  }

  Voltar(): void {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

 
  Excluir(endereçoId){
    this.enderecosService.ExcluirEndereço(endereçoId).subscribe(resultado => {
      this.modalRef.hide();
      alert('Endereço excluído com sucesso');
      this.enderecosService.PegarTodos().subscribe(registros => {
        this.enderecos = registros;
      });
    });
  }


  }



