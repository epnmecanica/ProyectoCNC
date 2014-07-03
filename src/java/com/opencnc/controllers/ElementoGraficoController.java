/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.controllers;

import com.opencnc.beans.ElementoGrafico;
import com.opencnc.beans.Modelo;
import com.opencnc.beans.lineatool;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author root
 */
@Controller

public class ElementoGraficoController {
    
    // Implemento Log4j para eventos tipo log
    private static final Logger logger = Logger.getLogger(UsuarioController.class.getName());
   
    @RequestMapping  ("/elemento/lista")
    public ModelAndView   lista  (HttpServletRequest request, 
                                            HttpServletResponse response)
                                            throws Exception{
        Session  s = HibernateUtil.getSessionFactory().openSession();
        
        Criteria  c =s.createCriteria(ElementoGrafico.class);
        List<ElementoGrafico> l = c.list();
        
        ModelAndView m = new ModelAndView("/elemento/lista");
        m.addObject("sentencia",l);
 
        return m;
    }
    
    @RequestMapping  ("/elemento/crear/{id}")
    public ModelAndView   crear  (@PathVariable Integer id,
                                    HttpServletRequest request, 
                                    HttpServletResponse response) throws Exception{
        HttpSession sess =  request.getSession();
        if (sess != null){
            //ElementoGrafico e = new ElementoGrafico();
            ModelAndView m = new ModelAndView("/elemento/crear");
            m.addObject("Id",id);
            
            /*
            Session s = HibernateUtil.getSessionFactory().openSession();
            Modelo u = (Modelo)s.get(Modelo.class,id);
            e.setModelo(u);
            //falta seguir 
            Transaction t = s.getTransaction();
            s.beginTransaction();
            s.saveOrUpdate(e);
            t.commit();
            
            */
           //m.addObject("elementoGrafico",e);
            return m;
        }else{
             request.removeAttribute("usuario");
            return new ModelAndView("redirect:/usuario/login.htm");
        }
    }
    
    @RequestMapping  ("/elemento/actualizar")
    public ModelAndView   actualizar  (lineatool ln,
                                        @RequestParam Integer Id,
                                    HttpServletRequest request, 
                                    HttpServletResponse response) throws Exception{
        //HttpSession sess =  request.getSession();
        //if (sess != null){
            ElementoGrafico e = new ElementoGrafico();
            Session s = HibernateUtil.getSessionFactory().openSession();
            
            Modelo u = (Modelo)s.get(Modelo.class,Id);
            e.setModelo(u);
            //falta seguir 
            Transaction t = s.getTransaction();
            s.beginTransaction();
            s.saveOrUpdate(e);
            t.commit();
            
            return null; 
       // }else{
        //     request.removeAttribute("usuario");
         //   return new ModelAndView("redirect:/usuario/login.htm");
        //}
    }
    @RequestMapping  ("/elemento/borrar/{id}")
    public ModelAndView   borrar  (@PathVariable Integer id,
                                    HttpServletRequest request, 
                                    HttpServletResponse response) throws Exception{
        HttpSession sess =  request.getSession();
        if (sess != null){
           Session s = HibernateUtil.getSessionFactory().openSession();
            ElementoGrafico e = (ElementoGrafico) s.get(ElementoGrafico.class, id);
            Transaction t = s.beginTransaction();
            s.delete(e);
            t.commit();

            return lista(request , response);
        }else{
             request.removeAttribute("usuario");
            return new ModelAndView("redirect:/usuario/login.htm");
        }
        
    }
    
    @RequestMapping  ("/elemento/obtenerElemento")
    public ModelAndView   obtenerElemento  (@PathVariable Integer id,
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
    
    @RequestMapping  ("/elemento/obtenerElementoPorModelo")
    public ModelAndView   obtenerElementoPorModelo  (int ModeloID,
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

    /**
     * @return the modelID
     */
   
}
