import { UsuariosService } from './usuarios.service';
import { EndereçoService } from './endereço.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { EnderecosComponent } from './components/enderecos/enderecos.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    EnderecosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
  providers: [HttpClientModule, UsuariosService, EndereçoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
