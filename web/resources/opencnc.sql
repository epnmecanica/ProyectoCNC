/==============================================================/ /* DBMS name: MySQL 5.0 / / Created on: 06/05/2014 18:26:39 / /==============================================================*/ create database opencnc;

use opencnc;

drop table if exists Arco;

drop table if exists Comando;

drop table if exists ElementoGrafico;

drop table if exists Linea;

drop table if exists Modelo;

drop table if exists Programa;

drop table if exists Rol;

drop table if exists Sentencia;

drop table if exists Texto;

drop table if exists TipoCodigo;

drop table if exists TipoMaquina;

drop table if exists UnidadMedida;

drop table if exists Usuario;

drop table if exists rolUsuario;

/==============================================================/ /* Table: Arco / /==============================================================*/ create table Arco ( elementoID int not null, radio int not null, angulo1 float not null, angulo2 float not null, primary key (elementoID) );

/==============================================================/ /* Table: Comando / /==============================================================*/ create table Comando ( comandoID int not null, tipoCodigoID int, variable varchar(20) not null, nombre varchar(254) not null, descripcion varchar(254), primary key (comandoID) );

/==============================================================/ /* Table: ElementoGrafico / /==============================================================*/ create table ElementoGrafico ( elementoID int not null, modeloID int not null, tipoElemento int not null, posicionX int not null, posicionY int not null, orden int not null, color int not null, descripcion varchar(100), creadoPor int not null, creadoFecha datetime, modificadoPor int, modificadoFecha datetime, primary key (elementoID) );

/==============================================================/ /* Table: Linea / /==============================================================*/ create table Linea ( elementoID int not null, posicionX2 int not null, posicionY2 int not null, primary key (elementoID) );

/==============================================================/ /* Table: Modelo / /==============================================================*/ create table Modelo ( modeloID int not null auto_increment, unidadMedidaID int not null, tipoMaquinaID int not null, usuarioID int not null, nombre varchar(254) not null, descripcion varchar(254), puntoCeroMaquinaX float not null, puntoCeroMaquinaY float not null, piezaAncho float not null, piezaLargo float not null, creadoPor int not null, creadoFecha datetime not null, modificadoPor int, modificadoFecha datetime, primary key (modeloID) );

/==============================================================/ /* Table: Programa / /==============================================================*/ create table Programa ( programaID int not null auto_increment, modeloID int not null, descripcion varchar(254) not null, primary key (programaID) );

/==============================================================/ /* Table: Rol / /==============================================================*/ create table Rol ( rolID int not null auto_increment, codigo varchar(50) not null, nombreRol varchar(100) not null, creadoPor int not null, creadoFecha datetime not null, modificadoPor int, modificadoFecha datetime, primary key (rolID) );

/==============================================================/ /* Table: Sentencia / /==============================================================*/ create table Sentencia ( sentenciaID int not null auto_increment, elementoID int, programaID int not null, comandoID int not null, orden int not null, bloque int, cotaEjeX float, cotaEjeY float, cotaEjeZ float, velocidadAvance int, velocidadHusillo int, numeroHerramienta int, funcionAuxiliar int, comentario varchar(254), primary key (sentenciaID) );

/==============================================================/ /* Table: Texto / /==============================================================*/ create table Texto ( elementoID int not null auto_increment, tamanio int not null, primary key (elementoID) );

/==============================================================/ /* Table: TipoCodigo / /==============================================================*/ create table TipoCodigo ( tipoCodigoID int not null, nombre int not null, primary key (tipoCodigoID) );

/==============================================================/ /* Table: TipoMaquina / /==============================================================*/ create table TipoMaquina ( tipoMaquinaID int not null auto_increment, nombre varchar(254) not null, primary key (tipoMaquinaID) );

/==============================================================/ /* Table: UnidadMedida / /==============================================================*/ create table UnidadMedida ( unidadMedidaID int not null auto_increment, nombre varchar(254), primary key (unidadMedidaID) );

/==============================================================/ /* Table: Usuario / /==============================================================*/ create table Usuario ( usuarioID int not null auto_increment, nombre varchar(100) not null, apellido varchar(100) not null, organizacion varchar(100), email varchar(200) not null, clave blob, estado varchar(1) not null, creadoPor int not null, creadoFecha datetime not null, modificadoPor int, modificadoFecha datetime, primary key (usuarioID) );

/==============================================================/ /* Table: rolUsuario / /==============================================================*/ create table rolUsuario ( usuarioID int not null, rolID int not null, primary key (usuarioID, rolID) );

alter table Arco add constraint FK_ElementoGraficoArco foreign key (elementoID) references ElementoGrafico (elementoID) on delete restrict on update restrict;

alter table Comando add constraint FK_tipoCodigoComando foreign key (tipoCodigoID) references TipoCodigo (tipoCodigoID) on delete restrict on update restrict;

alter table ElementoGrafico add constraint FK_modeloElemento foreign key (modeloID) references Modelo (modeloID) on delete restrict on update restrict;

alter table Linea add constraint FK_ElementoGraficoLinea foreign key (elementoID) references ElementoGrafico (elementoID) on delete restrict on update restrict;

alter table Modelo add constraint FK_propietarioModelo foreign key (usuarioID) references Usuario (usuarioID) on delete restrict on update restrict;

alter table Modelo add constraint FK_tipoMaquinaModelo foreign key (tipoMaquinaID) references TipoMaquina (tipoMaquinaID) on delete restrict on update restrict;

alter table Modelo add constraint FK_unidadMedidaModelo foreign key (unidadMedidaID) references UnidadMedida (unidadMedidaID) on delete restrict on update restrict;

alter table Programa add constraint FK_programaModelo foreign key (modeloID) references Modelo (modeloID) on delete restrict on update restrict;

alter table Sentencia add constraint FK_association5 foreign key (elementoID) references ElementoGrafico (elementoID) on delete restrict on update restrict;

alter table Sentencia add constraint FK_association6 foreign key (comandoID) references Comando (comandoID) on delete restrict on update restrict;

alter table Sentencia add constraint FK_sentenciaPrograma foreign key (programaID) references Programa (programaID) on delete restrict on update restrict;

alter table Texto add constraint FK_ElementoGraficoTexto foreign key (elementoID) references ElementoGrafico (elementoID) on delete restrict on update restrict;

alter table rolUsuario add constraint FK_rolUsuario_rol foreign key (rolID) references Rol (rolID) on delete restrict on update restrict;

alter table rolUsuario add constraint FK_rolUsuario_usuario foreign key (usuarioID) references Usuario (usuarioID) on delete restrict on update restrict;
