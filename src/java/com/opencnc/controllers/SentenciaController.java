/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.controllers;

import com.opencnc.beans.Comando;
import com.opencnc.beans.ElementoGrafico;
import com.opencnc.beans.Programa;
import com.opencnc.beans.Sentencia;
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
public class SentenciaController {
    // Implemento Log4j para eventos tipo log
    private static final Logger logger = Logger.getLogger(UsuarioController.class.getName());
    
    @RequestMapping  ("/sentencia/lista")
    public ModelAndView   lista  (HttpServletRequest request, 
                                            HttpServletResponse response)
                                            throws Exception{
        Session  s = HibernateUtil.getSessionFactory().openSession();
        
        Criteria  c =s.createCriteria(Sentencia.class);
        List<Sentencia> l = c.list();
        
        ModelAndView m = new ModelAndView("/sentencia/lista");
        m.addObject("sentencia",l);
 
        return m;
    }
    @RequestMapping  ("/sentencia/crear/{id}")
    public ModelAndView crear (@PathVariable Integer id,
                                            HttpServletRequest request, 
                                            HttpServletResponse response)
                                            throws Exception{
         HttpSession sess =  request.getSession();
        if (sess != null){
            Sentencia sen = new Sentencia();
            Session s = HibernateUtil.getSessionFactory().openSession();
            // no es el id que se debe usar
            ElementoGrafico e = (ElementoGrafico)s.get(ElementoGrafico.class, id);
            Programa p = (Programa)s.get(Programa.class, id);
            Comando com = (Comando)s.get(Comando.class,id);
            
            sen.setElementoGrafico(e);
            sen.setPrograma(p);
            sen.setComando(com);
            
            Transaction t = s.getTransaction();
            s.beginTransaction();
            s.saveOrUpdate(sen);
            t.commit();
            
            
            ModelAndView m = new ModelAndView("/sentencia/crear");
            m.addObject("sentencia",s);
            
            return m; 
        }else{
             request.removeAttribute("usuario");
            return new ModelAndView("redirect:/usuario/login.htm");
        }
        
    }
    
    @RequestMapping  ("/sentencia/actualizar")
    public ModelAndView actualizar (@ModelAttribute Sentencia s,
                                            HttpServletRequest request, 
                                            HttpServletResponse response)
                                            throws Exception{
        HttpSession sess =  request.getSession();
        if (sess != null){
           return null; 
        }else{
             request.removeAttribute("usuario");
            return new ModelAndView("redirect:/usuario/login.htm");
        }
    }
    
    @RequestMapping  ("/sentencia/borrar")
    public ModelAndView borrar (@PathVariable Integer id,
                                            HttpServletRequest request, 
                                            HttpServletResponse response)
                                            throws Exception{
        HttpSession sess =  request.getSession();
        if (sess != null){
           Session s = HibernateUtil.getSessionFactory().openSession();
            Sentencia e = (Sentencia) s.get(Sentencia.class, id);
            Transaction t = s.beginTransaction();
            s.delete(e);
            t.commit();
            return null; 
        }else{
             request.removeAttribute("usuario");
            return new ModelAndView("redirect:/usuario/login.htm");
        }
        
    }
    
    @RequestMapping  ("/sentencia/obtenerSentencia")
    public ModelAndView obtenerSentencia (int sentenciaID,
                                            HttpServletRequest request, 
                                            HttpServletResponse response)
                                            throws Exception{
        HttpSession sess =  request.getSession();
        if (sess != null){
           return null; 
        }else{
             request.removeAttribute("usuario");
            return new ModelAndView("redirect:/usuario/login.htm");
        }
    }
    
    @RequestMapping  ("/sentencia/obtenerSentenciaPorPrograma")
    public ModelAndView obtenerSentenciaPorProgrma (int programaID,
                                            HttpServletRequest request, 
                                            HttpServletResponse response)
                                            throws Exception{
       HttpSession sess =  request.getSession();
        if (sess != null){
           return null; 
        }else{
             request.removeAttribute("usuario");
            return new ModelAndView("redirect:/usuario/login.htm");
        }
    }
}
