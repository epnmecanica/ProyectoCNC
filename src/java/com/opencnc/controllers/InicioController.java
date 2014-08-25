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
public class InicioController {
    @RequestMapping ("/inicio/acercade")
    public ModelAndView acercade (){
        ModelAndView m = new ModelAndView("/inicio/acercade");
        return m;
    }
    @RequestMapping ("/inicio/infcam")
    public ModelAndView infcam (){
        ModelAndView m = new ModelAndView("/inicio/infcam");
        return m;
    }
    @RequestMapping ("/inicio/infcad")
    public ModelAndView infcad (){
        ModelAndView m = new ModelAndView("/inicio/infcad");
        return m;
    }
    
}
