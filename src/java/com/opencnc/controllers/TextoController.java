/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.controllers;

import com.opencnc.beans.Texto;
import com.opencnc.util.HibernateUtil;
import org.hibernate.Session;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author root
 */
@Controller

public class TextoController {
    @RequestMapping(value="texto/crear", 
                        method=RequestMethod.GET,
                        headers = "Accept=*/*")
    public ModelAndView crear(){
        Texto tx = new Texto();
        Session s = HibernateUtil.getSessionFactory().openSession();
        return null;
    }
    @RequestMapping(method = RequestMethod.POST)
    public ModelAndView obtener(){
        Session s = HibernateUtil.getSessionFactory().openSession();
        return null;
    }
    @RequestMapping(method = RequestMethod.POST)
    public ModelAndView actualizar(){
        Session s = HibernateUtil.getSessionFactory().openSession();
        return null;
    }
    @RequestMapping(method = RequestMethod.POST)
    public ModelAndView borrar(){
        Session s = HibernateUtil.getSessionFactory().openSession();
        return null;
    }
}
