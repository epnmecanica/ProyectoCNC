/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.controllers;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author root
 */
@Controller
public class CamController {
     private static final Logger logger = Logger.getLogger(CamController.class.getName());
    @RequestMapping ("cam/abrir")
    public ModelAndView abrir (){
        ModelAndView m = new ModelAndView("/cam/abrir");
        logger.info("Se abrio el programa");
        return m;
    }
}
