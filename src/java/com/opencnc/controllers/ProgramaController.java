/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.controllers;

import com.opencnc.beans.Modelo;
import com.opencnc.beans.Programa;
import com.opencnc.beans.Usuario;
import com.opencnc.util.HibernateUtil;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author root
 */

//******************************************************************************
//CRUD de programa.
//Almacena en la base de datos los comandos de programa para el CAM
//******************************************************************************
@Controller
public class ProgramaController {
    // Implemento Log4j para eventos tipo log
    private static final Logger logger = Logger.getLogger(UsuarioController.class.getName());
    
/**
 * *****************************************************************************
 * Crea la lista de programas de los usuarios.
 * *****************************************************************************
 * @param request
 * @param response
 * @return
 * @throws Exception 
 */
    @RequestMapping  ("/programa/lista")
    public ModelAndView   lista  (HttpServletRequest request, 
                                            HttpServletResponse response)
                                            throws Exception{
        HttpSession sess =  request.getSession();
         if (sess != null){
              Session  s = HibernateUtil.getSessionFactory().openSession();
                Usuario us = (Usuario)sess.getAttribute("usuario");
                Criteria  c =s.createCriteria(Programa.class);
                //c.add(Restrictions.eq("modelo", us));
                List<Programa> l = c.list();

                ModelAndView m = new ModelAndView("/programa/lista");
                m.addObject("programas",l);
 
                return m;
         }else{
             request.removeAttribute("usuario");
            return new ModelAndView("redirect:/usuario/login.htm");
        }
       
    }
 /**
     * *****************************************************************************
    * CAM.
    *******************************************************************************
    *******************************************************************************
    * Metodo faltante de desarrllo.
    *******************************************************************************
     * @param request
     * @param response
     * @return
     * @throws Exception 
     */
    @RequestMapping  ("/programa/crear_G")
    public ModelAndView   crear_G  (HttpServletRequest request, 
                                            HttpServletResponse response)
                                            throws Exception{
        
        ModelAndView m = new ModelAndView("/programa/crear_G");
               
        return m;
    }
    
/**
 * *****************************************************************************
 * Crea los programas de los usuarios y los almacena en la base de datos.
 * *****************************************************************************
 * @param id
 * @param request
 * @param response
 * @return
 * @throws Exception 
 */
    @RequestMapping  ("/programa/crear/{id}")
    public ModelAndView crear (@PathVariable Integer id,
                                    HttpServletRequest request, 
                                    HttpServletResponse response) throws Exception{
        HttpSession sess =  request.getSession();
        if (sess != null){
            Programa p = new Programa();              
            ModelAndView m = new ModelAndView("/programa/crear");
            
            Session s = HibernateUtil.getSessionFactory().openSession();
            Modelo u = (Modelo)s.get(Modelo.class,id);
                        
            Criteria  cm = s.createCriteria(Programa.class);
            cm.add(Restrictions.eq("modelo", u));
            List<Programa> l = cm.list();
            //cm.add(Restrictions.eq(id, u.getModeloId()));
            if(l.isEmpty()){
                //System.out.print("si");
                p.setModelo(u);
                p.setDescripcion("");
                Transaction t = s.getTransaction();
                s.beginTransaction();
                s.saveOrUpdate(p);
                t.commit();
                m.addObject("programa",p);
                //p.setModelo(u.getModeloId());
                return m;
            }
            
            return lista(request , response);
        }else{
             request.removeAttribute("usuario");
            return new ModelAndView("redirect:/usuario/login.htm");
        }
    }
    
/**
 *******************************************************************************
 * Borra los programas de CAD de cualquier usuario.
 * *****************************************************************************
 * @param id
 * @param request
 * @param response
 * @return
 * @throws Exception 
 */
    @RequestMapping  ("/programa/borrar/{id}")
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
            return lista(request , response);
        }else{
             request.removeAttribute("usuario");
            return new ModelAndView("redirect:/usuario/login.htm");
        }
        
    }
    
    
/**
 * *****************************************************************************
 * Actualiza los atributos en la base de datos de los programas.
 * *****************************************************************************
 * @param p
 * @param request
 * @param response
 * @return
 * @throws Exception 
 */
    @RequestMapping  ("/programa/actualizar")
    public ModelAndView actualizar (@ModelAttribute Programa p,
                                    HttpServletRequest request, 
                                    HttpServletResponse response) throws Exception{
        HttpSession sess =  request.getSession();
        if (sess != null){
            Session s = HibernateUtil.getSessionFactory().openSession();
            p.setDescripcion("Nombre");
            Transaction  t= s.getTransaction();
            s.beginTransaction(); 
            s.saveOrUpdate(p);
            t.commit();
           return lista(request , response); 
        }else{
            request.removeAttribute("usuario");
            return new ModelAndView("redirect:/usuario/login.htm");
        }
    }
    
/**
 * *****************************************************************************
 * Obtiene los programas de los usuarios.
 * *****************************************************************************
 * Metodo sin desarrollo.
 * *****************************************************************************
 * @param programaID
 * @param request
 * @param response
 * @return
 * @throws Exception 
 */
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
    
/**
 * *****************************************************************************
 * Obtiene programas por modelo
 * *****************************************************************************
 * Metodo sin desarrollo.
 * *****************************************************************************
 * @param ModeloID
 * @param request
 * @param response
 * @return
 * @throws Exception 
 */
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
