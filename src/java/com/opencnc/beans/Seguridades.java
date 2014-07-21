/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.beans;

import java.util.ArrayList;

/**
 *
 * @author root
 */
public class Seguridades {
    private boolean pass;
    private String codigo;
    private int    codigoError;
    private int    codigoAcceso;
    private ArrayList thisArrayList = new ArrayList( ) ;

    /**
     * @return the pass
     */
    public boolean isPass() {
        return pass;
    }

    /**
     * @param pass the pass to set
     */
    public void setPass(boolean pass) {
        this.pass = pass;
    }

    /**
     * @return the codigo
     */
    public String getCodigo() {
        return codigo;
    }

    /**
     * @param codigo the codigo to set
     */
    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    /**
     * @return the codigoError
     */
    public int getCodigoError() {
        return codigoError;
    }

    /**
     * @param codigoError the codigoError to set
     */
    public void setCodigoError(int codigoError) {
        this.codigoError = codigoError;
    }

    /**
     * @return the codigoAcceso
     */
    public int getCodigoAcceso() {
        return codigoAcceso;
    }

    /**
     * @param codigoAcceso the codigoAcceso to set
     */
    public void setCodigoAcceso(int codigoAcceso) {
        this.codigoAcceso = codigoAcceso;
    }

    /**
     * @return the thisArrayList
     */
    public ArrayList getThisArrayList() {
        return thisArrayList;
    }

    /**
     * @param thisArrayList the thisArrayList to set
     */
    public void setThisArrayList(ArrayList thisArrayList) {
        this.thisArrayList = thisArrayList;
    }
}
