/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.controllers;

import com.opencnc.beans.Comando;
import com.opencnc.beans.TipoCodigo;
import com.opencnc.util.HibernateUtil;
import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author root
 */
//******************************************************************************
//Sin uso por el momento
//******************************************************************************
@Controller
@RequestMapping("/comando")
public class ComandoController {
     private static final Logger logger = Logger.getLogger(ComandoController.class.getName());
    public void agregar(){
        try{
            logger.info("Se agrego el comando");
        Comando com = new Comando();
        Session s = HibernateUtil.getSessionFactory().openSession();
        TipoCodigo tp = (TipoCodigo)s.get(TipoCodigo.class, s);
        }catch (Exception ex){ 
        logger.error("Error... Al Agregar el comando "+ex); 
       }

    }
    public void borrar(){
        logger.info("Se elimina el comando");
        Session s = HibernateUtil.getSessionFactory().openSession();
    }
    public void editar(){
        
    }
}
