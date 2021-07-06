import { FormControl, FormGroup } from '@angular/forms';
import { UsuariosService } from './../../usuarios.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Usuario } from 'src/app/Model/Usuario';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  form: any;
  tituloForm: string ;
  usuarios: Usuario[] ;
  nomeUsuario: string;
  usuarioId: number;
  

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false; 
  

  constructor(private usuariosService: UsuariosService,
    private modalService: BsModalService) { }

  ngOnInit():  void {
    this.usuariosService.PegarTodos().subscribe((resultado) => {
      this.usuarios = resultado;
    });
  
  
  }
  ExibirFormularioCadastro(): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.tituloForm = 'Novo Usuario';
    this.form = new FormGroup({
      nome: new FormControl(null),
      cpfcnpj: new FormControl(null),
      tipo: new FormControl(null),
      status: new FormControl(null),
      darahora: new FormControl(null)
    });
  }

  ExibirFormularioAtualizacao(usuarioId): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.usuariosService.PegarPeloId(usuarioId).subscribe((resultado) => {
      this.tituloForm = `Atualizar ${resultado.nome} ${resultado.cpfcnpj}`;

      this.form = new FormGroup({
        usuarioId: new FormControl(resultado.usuarioId),
        nome: new FormControl(resultado.nome),
        sobrenome: new FormControl(resultado.cpfcnpj),
        idade: new FormControl(resultado.tipo),
        status: new FormControl(resultado.status),
        datahora: new FormControl(resultado.datahora)

      });
    });
  }

  EnviarFormulario(): void {
    const usuario : Usuario = this.form.value;

    if (usuario.usuarioId > 0) {
      this.usuariosService.AtualizarUsuario(usuario).subscribe((resultado) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('Usuario atualizado com sucesso');
        this.usuariosService.PegarTodos().subscribe((registros) => {
          this.usuarios = registros;
        });
      });
    } else {
      this.usuariosService.SalvarUsuario(usuario).subscribe((resultado) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('Usuario inserido com sucesso');
        this.usuariosService.PegarTodos().subscribe((registros) => {
          this.usuarios = registros;
        });
      });
    }
  }

  Voltar(): void {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  function validarCNPJ(cnpj) {

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;

    return true;

}

function validaCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf == '') return false;
  
  if (cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999")
      return false;
 
  add = 0;
  for (i = 0; i < 9; i++)
      add += parseInt(cpf.charAt(i)) * (10 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11)
      rev = 0;
  if (rev != parseInt(cpf.charAt(9)))
      return false;
  
  add = 0;
  for (i = 0; i < 10; i++)
      add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11)
      rev = 0;
  if (rev != parseInt(cpf.charAt(10)))
      return false;
  return true;
}

  

