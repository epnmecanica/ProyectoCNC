/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author root
 */
//******************************************************************************
//Sin uso por el momento
//******************************************************************************
@Controller

public class LineaController {
    
    private static final Logger logger = Logger.getLogger(LineaController.class.getName());
    @RequestMapping (
                        value="linea/crear", 
                        method=RequestMethod.GET,
                        headers = "Accept=*/*"   
                    )
    public ModelAndView crear () throws Exception{
        logger.info("Se creara una linea...");
       
        return null;
    }
    @RequestMapping (/*"/linea/crear"*/
                        value="linea/obtener", 
                        method=RequestMethod.GET,
                        headers = "Accept=*/*"   
                    )
    public ModelAndView obtener(HttpServletRequest request, 
                                HttpServletResponse response
                               ){
        logger.info("Se obtendra la linea.");
 
        return null;
    }
     @RequestMapping (
                        value="linea/actualizar", 
                        method=RequestMethod.GET,
                        headers = "Accept=*/*"   
                    )
    public ModelAndView actualizar(){
       
        return null;
    }
     @RequestMapping (
                        value="linea/borrar", 
                        method=RequestMethod.GET,
                        headers = "Accept=*/*"   
                    )
    public ModelAndView borrar(){
        
        return null;
    }
    @RequestMapping(    //value="elemento/crear/linea/lista", 
                        value="linea/lista",
                        method=RequestMethod.GET,
                        headers = "Accept=*/*"
                        )
    public void listaLinea(@RequestParam(value = "datos", required = true) String datos, 
                           
                            HttpServletRequest request, 
                            HttpServletResponse response) throws Exception{
        logger.info("La lista de lineas es:");
            }    
    }