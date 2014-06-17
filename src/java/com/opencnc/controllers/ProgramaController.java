/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.controllers;

import com.opencnc.beans.Programa;
import com.opencnc.util.HibernateUtil;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author root
 */
@Controller
public class ProgramaController {
    // Implemento Log4j para eventos tipo log
    private static final Logger logger = Logger.getLogger(UsuarioController.class.getName());
    @RequestMapping  ("/programa/lista")
    public ModelAndView   lista  (HttpServletRequest request, 
                                            HttpServletResponse response)
                                            throws Exception{
        Session  s = HibernateUtil.getSessionFactory().openSession();
        
        Criteria  c =s.createCriteria(Programa.class);
        List<Programa> l = c.list();
        
        ModelAndView m = new ModelAndView("/programa/lista");
        m.addObject("programa",l);
 
        return m;
    }
    @RequestMapping  ("/programa/crear")
    public ModelAndView crear (
                                    HttpServletRequest request, 
                                    HttpServletResponse response) throws Exception{
         HttpSession sess =  request.getSession();
        if (sess != null){
            Programa p = new Programa();
            ModelAndView m = new ModelAndView("/programa/crear");
            m.addObject("programa",p);
        return m;
        }else{
             request.removeAttribute("usuario");
            return new ModelAndView("redirect:/usuario/login.htm");
        }
    }
    
    @RequestMapping  ("/programa/borrar")
    public ModelAndView borrar  (@PathVariable Integer id,
                                    HttpServletRequest request, 
                                    HttpServletResponse response) throws Exception{
        HttpSession sess =  request.getSession();
        if (sess != null){
           Session s = HibernateUtil.getSessionFactory().openSession();
            Programa e = (Programa) s.get(Programa.class, id);
            Transaction t = s.beginTransaction();
            s.delete(e);
            t.commit();
            return null;
        }else{
             request.removeAttribute("usuario");
            return new ModelAndView("redirect:/usuario/login.htm");
        }
        
    }
    
    @RequestMapping  ("/programa/actualizarPrograma")
    public ModelAndView actualizar (@ModelAttribute Programa p,
                                    HttpServletRequest request, 
                                    HttpServletResponse response) throws Exception{
        HttpSession sess =  request.getSession();
        if (sess != null){
           return null; 
        }else{
             request.removeAttribute("usuario");
            return new ModelAndView("redirect:/usuario/login.htm");
        }
    }
    
    @RequestMapping  ("/programa/obtenerPrograma")
    public ModelAndView obtenerPrograma (int programaID,
                                            HttpServletRequest request, 
                                            HttpServletResponse response) throws Exception{
        HttpSession sess =  request.getSession();
        if (sess != null){
           return null; 
        }else{
             request.removeAttribute("usuario");
            return new ModelAndView("redirect:/usuario/login.htm");
        }
    }
    @RequestMapping  ("/programa/obtenerProgramaPorModelo")
    public ModelAndView obtenerProgramaPorModelo (int ModeloID,
                                                    HttpServletRequest request, 
                                                    HttpServletResponse response) throws Exception{
        HttpSession sess =  request.getSession();
        if (sess != null){
           return null; 
        }else{
             request.removeAttribute("usuario");
            return new ModelAndView("redirect:/usuario/login.htm");
        }
    }
}
