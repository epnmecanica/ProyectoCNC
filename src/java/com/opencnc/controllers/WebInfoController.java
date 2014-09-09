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
public class WebInfoController {
    @RequestMapping ("/web_info/Inicio")
    public ModelAndView inicio (){
        ModelAndView m = new ModelAndView("/web_info/Inicio");
        return m;
    }
    @RequestMapping ("/web_info/contacto_info")
    public ModelAndView contacto (){
        ModelAndView m = new ModelAndView("/web_info/contacto_info");
        return m;
    }
    @RequestMapping ("/web_info/github_info")
    public ModelAndView github (){
        ModelAndView m = new ModelAndView("/web_info/github_info");
        return m;
    }
    @RequestMapping ("/web_info/grupo_info")
    public ModelAndView grupo (){
        ModelAndView m = new ModelAndView("/web_info/grupo_info");
        return m;
    }
    @RequestMapping ("/web_info/proyecto_info")
    public ModelAndView proyecto (){
        ModelAndView m = new ModelAndView("/web_info/proyecto_info");
        return m;
    }
    @RequestMapping ("/web_info/ubicacion_info")
    public ModelAndView ubicacion (){
        ModelAndView m = new ModelAndView("/web_info/ubicacion_info");
        return m;
    }
    
    
    
}
