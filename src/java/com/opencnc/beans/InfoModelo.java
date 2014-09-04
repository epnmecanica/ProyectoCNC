/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.beans;

/**
 *
 * @author root
 */
public class InfoModelo {
      private Integer modeloId;
     private String unidadMedida;
     private Usuario usuario;
     private String tipoMaquina;
     private String nombre;
     private String descripcion;
     private float puntoCeroMaquinaX;
     private float puntoCeroMaquinaY;
     private float piezaAncho;
     private float piezaLargo;

    /**
     * @return the modeloId
     */
    public Integer getModeloId() {
        return modeloId;
    }

    /**
     * @param modeloId the modeloId to set
     */
    public void setModeloId(Integer modeloId) {
        this.modeloId = modeloId;
    }

    

    /**
     * @return the usuario
     */
    public Usuario getUsuario() {
        return usuario;
    }

    /**
     * @param usuario the usuario to set
     */
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    
    /**
     * @return the nombre
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * @param nombre the nombre to set
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * @return the descripcion
     */
    public String getDescripcion() {
        return descripcion;
    }

    /**
     * @param descripcion the descripcion to set
     */
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    /**
     * @return the puntoCeroMaquinaX
     */
    public float getPuntoCeroMaquinaX() {
        return puntoCeroMaquinaX;
    }

    /**
     * @param puntoCeroMaquinaX the puntoCeroMaquinaX to set
     */
    public void setPuntoCeroMaquinaX(float puntoCeroMaquinaX) {
        this.puntoCeroMaquinaX = puntoCeroMaquinaX;
    }

    /**
     * @return the puntoCeroMaquinaY
     */
    public float getPuntoCeroMaquinaY() {
        return puntoCeroMaquinaY;
    }

    /**
     * @param puntoCeroMaquinaY the puntoCeroMaquinaY to set
     */
    public void setPuntoCeroMaquinaY(float puntoCeroMaquinaY) {
        this.puntoCeroMaquinaY = puntoCeroMaquinaY;
    }

    /**
     * @return the piezaAncho
     */
    public float getPiezaAncho() {
        return piezaAncho;
    }

    /**
     * @param piezaAncho the piezaAncho to set
     */
    public void setPiezaAncho(float piezaAncho) {
        this.piezaAncho = piezaAncho;
    }

    /**
     * @return the piezaLargo
     */
    public float getPiezaLargo() {
        return piezaLargo;
    }

    /**
     * @param piezaLargo the piezaLargo to set
     */
    public void setPiezaLargo(float piezaLargo) {
        this.piezaLargo = piezaLargo;
    }

    /**
     * @return the unidadMedida
     */
    public String getUnidadMedida() {
        return unidadMedida;
    }

    /**
     * @param unidadMedida the unidadMedida to set
     */
    public void setUnidadMedida(String unidadMedida) {
        this.unidadMedida = unidadMedida;
    }

    /**
     * @return the tipoMaquina
     */
    public String getTipoMaquina() {
        return tipoMaquina;
    }

    /**
     * @param tipoMaquina the tipoMaquina to set
     */
    public void setTipoMaquina(String tipoMaquina) {
        this.tipoMaquina = tipoMaquina;
    }
    
     
}
