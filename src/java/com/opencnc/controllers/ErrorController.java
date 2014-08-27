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
public class ErrorController {
     @RequestMapping ("/error/abrir_error")
    public ModelAndView error (){
        ModelAndView m = new ModelAndView("/error/abrir_error");
        return m;
    }
}
