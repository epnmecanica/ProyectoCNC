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
    @RequestMapping ("/web_info/aguinaga_info")
    public ModelAndView aguinaga (){
        ModelAndView m = new ModelAndView("/web_info/aguinaga_info");
        return m;
    }
    
    @RequestMapping ("/web_info/avila_info")
    public ModelAndView avila (){
        ModelAndView m = new ModelAndView("/web_info/avila_info");
        return m;
    }
    
    @RequestMapping ("/web_info/cando_info")
    public ModelAndView cando (){
        ModelAndView m = new ModelAndView("/web_info/cando_info");
        return m;
    }
    @RequestMapping ("/web_info/celso_recalde_info")
    public ModelAndView celso_recalde (){
        ModelAndView m = new ModelAndView("/web_info/celso_recalde_info");
        return m;
    }
    @RequestMapping ("/web_info/duque_info")
    public ModelAndView duque (){
        ModelAndView m = new ModelAndView("/web_info/duque_info");
        return m;
    }
    @RequestMapping ("/web_info/jara_info")
    public ModelAndView jara (){
        ModelAndView m = new ModelAndView("/web_info/jara_info");
        return m;
    }
    @RequestMapping ("/web_info/licencia_info")
    public ModelAndView licencia (){
        ModelAndView m = new ModelAndView("/web_info/alicencia_info");
        return m;
    }
    @RequestMapping ("/web_info/cedia_info")
    public ModelAndView cedia (){
        ModelAndView m = new ModelAndView("/web_info/cedia_info");
        return m;
    }
    @RequestMapping ("/web_info/ups_info")
    public ModelAndView ups (){
        ModelAndView m = new ModelAndView("/web_info/ups_info");
        return m;
    }
    @RequestMapping ("/web_info/espoch_info")
    public ModelAndView espoch (){
        ModelAndView m = new ModelAndView("/web_info/espoch_info");
        return m;
    }
    @RequestMapping ("/web_info/epn_info")
    public ModelAndView epn (){
        ModelAndView m = new ModelAndView("/web_info/epn_info");
        return m;
    }
    @RequestMapping ("/web_info/gnu_info")
    public ModelAndView gnu (){
        ModelAndView m = new ModelAndView("/web_info/gnu_info");
        return m;
    }
    @RequestMapping ("/web_info/faq_info")
    public ModelAndView faq (){
        ModelAndView m = new ModelAndView("/web_info/faq_info");
        return m;
    }
        
    
}
