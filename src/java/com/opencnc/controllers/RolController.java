/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.controllers;

import com.opencnc.beans.Rol;
import com.opencnc.util.HibernateUtil;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author root
 */
@Controller
public class RolController {
    @RequestMapping  ("/rol/crear")
    public ModelAndView   crear  (){
        Rol r = new Rol();
        ModelAndView m = new ModelAndView("/rol/crear");
        m.addObject("rol",r);
 
        return m;
    }
    @RequestMapping("/rol/guardarRol")
    public ModelAndView guardarRol(@ModelAttribute Rol rol){
        Calendar c = new GregorianCalendar();
        Date d1 = c.getTime();
        
        rol.setCreadoFecha(d1);
        Session s = HibernateUtil.getSessionFactory().openSession();
        
        Transaction t = s.getTransaction();
        s.beginTransaction();
        s.saveOrUpdate(rol);
        t.commit();
        
        return crear();
    }
    @RequestMapping  ("/rol/borrarRol")
    public ModelAndView borrarRol (){
        return null;
    }
    
    @RequestMapping ("/rol/actualizar")
    public ModelAndView actualizar (){
        return null;
    }
    
    @RequestMapping ("/rol/obtenerRol")
    public ModelAndView obtenerRol (){
        return null;
    }
    
}
