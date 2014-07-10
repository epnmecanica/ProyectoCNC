/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author root
 */

//******************************************************************************
//Sin uso por el momento
//******************************************************************************
@Controller

public class CadController {
    @RequestMapping ("/cad/cad")
    public ModelAndView cadView (){
        ModelAndView m = new ModelAndView("/cad/cad");
        return m;
    }
   
    @RequestMapping(value = "/get" , method = RequestMethod.GET)
    public void getJSON() {
        System.out.print("Hola");
        //return cadView();
 }
}
