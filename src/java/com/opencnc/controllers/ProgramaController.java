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
public class ProgramaController {
    @RequestMapping  ("/programa/crearProgrma")
    public ModelAndView crearProgrma (){
        return null;
    }
    
    @RequestMapping  ("/programa/borrarPrograma")
    public ModelAndView borrarPrograma (){
        return null;
    }
    
    @RequestMapping  ("/programa/actualizarPrograma")
    public ModelAndView actualizarPrograma (){
        return null;
    }
    
    @RequestMapping  ("/programa/obtenerPrograma")
    public ModelAndView obtenerPrograma (){
        return null;
    }
    @RequestMapping  ("/programa/obtenerProgramaPorModelo")
    public ModelAndView obtenerProgramaPorModelo (){
        return null;
    }
}
