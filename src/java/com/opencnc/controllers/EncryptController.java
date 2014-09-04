/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.controllers;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.log4j.Logger;

/**
 *
 * @author root
 */
public class EncryptController {
     private static final Logger logger = Logger.getLogger(EncryptController.class.getName());
     
    public byte[] encriptado(byte[] clave){
        byte[] encript=DigestUtils.md2(clave);
         logger.info("Elementos Encriptados");
        return encript;
        //System.out.println("shaHex:"+encript);
    }
}
