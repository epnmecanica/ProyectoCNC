/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.controllers;

import org.apache.commons.codec.digest.DigestUtils;

/**
 *
 * @author root
 */
public class EncryptController {
    public byte[] encriptado(byte[] clave){
        byte[] encript=DigestUtils.md2(clave);
        return encript;
        //System.out.println("shaHex:"+encript);
    }
}
