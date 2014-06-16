/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author root
 */
@Controller

public class ElementoGraficoController {
    @RequestMapping  ("/elemento/crearElementoGrafico")
    public ModelAndView   crear  (){
        ModelAndView m = new ModelAndView("/elemento/crearElementoGrafico");
        return m;
    }
    @RequestMapping  ("/elemento/borrar")
    public ModelAndView   borrar  (){
        
        return null;
    }
    @RequestMapping  ("/elemento/actualizar")
    public ModelAndView   actualizar  (){
        
        return null;
    }
    
    @RequestMapping  ("/elemento/obtenerElemento")
    public ModelAndView   obtenerElemento  (){
        
        return null;
    }
    
    @RequestMapping  ("/elemento/obtenerElementoPorModelo")
    public ModelAndView   obtenerElementoPorModelo  (){
        
        return null;
    }
    
    
    
}
