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
public class SentenciaController {
    @RequestMapping  ("/sentencia/crearSentencia")
    public ModelAndView crearSentencia (){
        return null;
    }
    
    @RequestMapping  ("/sentencia/actualizarSentencia")
    public ModelAndView actualizarSentencia (){
        return null;
    }
    
    @RequestMapping  ("/sentencia/borrarSentencia")
    public ModelAndView borrarSentencia (){
        return null;
    }
    
    @RequestMapping  ("/sentencia/obtenerSentencia")
    public ModelAndView obtenerSentencia (){
        return null;
    }
    
    @RequestMapping  ("/sentencia/obtenerSentenciaPorPrograma")
    public ModelAndView obtenerSentenciaPorProgrma (){
        return null;
    }
}
