/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.controllers;

import com.opencnc.beans.Texto;
import com.opencnc.util.HibernateUtil;
import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author root
 */
//******************************************************************************
//Sin uso por el momento
//******************************************************************************
@Controller

public class TextoController {
    private static final Logger logger = Logger.getLogger(TextoController.class.getName());
    @RequestMapping(value="texto/crear", 
                        method=RequestMethod.GET,
                        headers = "Accept=*/*")
    public ModelAndView crear(){
        try{
        Texto tx = new Texto();
        Session s = HibernateUtil.getSessionFactory().openSession();
        logger.info("Se abre sesion y se crea");
        }catch (Exception ex){ 
        logger.error("Error... Al crear"+ex); 
               
       }
       return null;
       
    }
    @RequestMapping(value="texto/obtener", 
                        method=RequestMethod.GET,
                        headers = "Accept=*/*")
    public ModelAndView obtener(){
        try{
        Session s = HibernateUtil.getSessionFactory().openSession();
        logger.info("Se obtendra.");
         }catch (Exception ex){ 
        logger.error("Error... Al obtener"+ex); 
               
       }
       return null;
    }
    @RequestMapping(value="texto/actualizar", 
                        method=RequestMethod.GET,
                        headers = "Accept=*/*")
    public ModelAndView actualizar(){
        try{
        Session s = HibernateUtil.getSessionFactory().openSession();
        logger.info("Se modificara.");
         }catch (Exception ex){ 
        logger.error("Error... Al modificar"+ex);     
       }
       return null;
    }
    @RequestMapping(value="texto/borrar", 
                        method=RequestMethod.GET,
                        headers = "Accept=*/*")
    public ModelAndView borrar(){
        try{
        Session s = HibernateUtil.getSessionFactory().openSession();
        logger.info("Se eliminara.");
         }catch (Exception ex){ 
        logger.error("Error... Al eliminar"+ex);   
       }
       return null;
    }
}
