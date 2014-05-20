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
public class RolController {
    @RequestMapping  ("/rol/crear")
    public ModelAndView   crear  (){
        
        ModelAndView m = new ModelAndView("/rol/crear");
        
 
        return m;
    }
    @RequestMapping  ("/rol/borrarRol")
    public ModelAndView borrarRol (){
        return null;
    }
    
    @RequestMapping ("/rol/actualizar")
    public ModelAndView actualizar (){
        return null;
    }
    
    @RequestMapping ("/rol/obtenerRol")
    public ModelAndView obtenerRol (){
        return null;
    }
    
}
