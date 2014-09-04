/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.controllers;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author root
 */

//******************************************************************************
//Sin uso por el momento
//******************************************************************************
@Controller
@RequestMapping("/tipocodigo")
public class TipoCodigoController {
     private static final Logger logger = Logger.getLogger(TipoCodigoController.class.getName());
    @RequestMapping(method = RequestMethod.POST)
    public void crear(){
        logger.info("Se creara el tipo de codigo");
    }
    @RequestMapping(method = RequestMethod.POST)
    public void obtener(){
         logger.info("Se obtendra el tipo de codigo");
    }
    @RequestMapping(method = RequestMethod.POST)
    public void actualizar(){
        logger.info("Se modificara el tipo de codigo");
    }
    @RequestMapping(method = RequestMethod.POST)
    public void borrar(){
        logger.info("Se eliminara el tipo de codigo");
    }
}
