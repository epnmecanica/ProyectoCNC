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
//******************************************************************************
//Lista, Crea, Guarda, Borra, Actualiza y Obtiene Rol.
//Son creados con el animo de modificar los permisos de los usuarios.
//Por arquitectura solo usaremos 2, (A y B).
//******************************************************************************
@Controller
public class RolController {
    // Implemento Log4j para eventos tipo log
    private static final Logger logger = Logger.getLogger(RolController.class.getName());
    
/**
 * *****************************************************************************
 * Crea la lista de roles para la visualizacion.
 * *****************************************************************************
 * @param request
 * @param response
 * @return
 * @throws Exception 
 */
    @RequestMapping  ("/rol/lista")
    public ModelAndView   lista  (HttpServletRequest request, 
                                            HttpServletResponse response)
                                            throws Exception{
        
        try{
        logger.info("Se obtendra la lista de roles");
        Session  s = HibernateUtil.getSessionFactory().openSession();
        Criteria  c =s.createCriteria(Rol.class);
        List<Rol> l = c.list();
        
        ModelAndView m = new ModelAndView("/rol/lista");
        m.addObject("rol",l);
 
        return m;
        }catch (Exception ex){ 
        logger.error("Error... Al obtener la lista de roles"+ex); 
               
       }
       return null;
    }
    
/**
 * *****************************************************************************
 * Crea Rol.
 * *****************************************************************************
 * @param request
 * @param response
 * @return
 * @throws Exception 
 */
    @RequestMapping  ("/rol/crear")
    public ModelAndView   crear  (
                                    HttpServletRequest request, 
                                    HttpServletResponse response)
                                    throws Exception{
        try{
        logger.info("Se crea el rol de Usuario");
        HttpSession sess =  request.getSession();
        if (sess != null){
            Rol r = new Rol();
            
            ModelAndView m = new ModelAndView("/rol/crear");
            m.addObject("rol",r);

            return m; 
        }else{
             request.removeAttribute("usuario");
            return new ModelAndView("redirect:/usuario/login.htm");
        }
        }catch (Exception ex){ 
        logger.error("Error... Al crear el rol."+ex); 
               
       }
       return null;
    }
    
/**
 * *****************************************************************************
 * Guarda Rol
 * *****************************************************************************
 * @param rol
 * @param request
 * @param response
 * @return
 * @throws Exception 
 */
    @RequestMapping("/rol/guardarRol")
    public ModelAndView guardarRol(@ModelAttribute Rol rol,
                                            HttpServletRequest request, 
                                            HttpServletResponse response)
                                            throws Exception{
        
        try{
        logger.info("Se guardara el Rol");
        HttpSession sess =  request.getSession();
        if (sess != null){
            
            Calendar c = new GregorianCalendar();
            Date d1 = c.getTime();

            rol.setCreadoFecha(d1);
            Session s = HibernateUtil.getSessionFactory().openSession();

            Transaction t = s.getTransaction();
            s.beginTransaction();
            s.saveOrUpdate(rol);
            t.commit();

            return lista(request, response);
        }else{
             request.removeAttribute("usuario");
            return new ModelAndView("redirect:/usuario/login.htm");
        }
        }catch (Exception ex){ 
        logger.error("Error... Al guardar el rol"+ex); 
               
       }
       return null;
    }
    
/**
 * *****************************************************************************
 * Borra Rol
 * *****************************************************************************
 * @param id
 * @param request
 * @param response
 * @return
 * @throws Exception 
 */
    @RequestMapping  ("/rol/borrarRol/{id}")
    public ModelAndView borrarRol (@PathVariable  Integer id,
                                            HttpServletRequest request, 
                                            HttpServletResponse response)
                                            throws Exception{
        try{
        logger.info("Se elminara el Rol");
        HttpSession sess =  request.getSession();
        if (sess != null){
           Session s = HibernateUtil.getSessionFactory().openSession();
        
            Rol r = (Rol) s.get(Rol.class, id);
            Transaction t = s.beginTransaction();
            s.delete(r);
            t.commit();

            return lista(request,response);
        }else{
             request.removeAttribute("usuario");
            return new ModelAndView("redirect:/usuario/login.htm");
        }
        }catch (Exception ex){ 
        logger.error("Error... Al eliminar el rol"+ex); 
               
       }
       return null;
    }
    

/**
 * *****************************************************************************
 * Actualiza los roles.
 * *****************************************************************************
 * Metodo sin desarrollo.
 * *****************************************************************************
 * @param rol
 * @param request
 * @param response
 * @return
 * @throws Exception 
 */
    @RequestMapping ("/rol/actualizar")
    public ModelAndView actualizar (@ModelAttribute Rol rol,
                                            HttpServletRequest request, 
                                            HttpServletResponse response)
                                            throws Exception{
        try{
        logger.info("Se modificara el rol");
        HttpSession sess =  request.getSession();
        if (sess != null){
           return null; 
        }else{
             request.removeAttribute("usuario");
            return new ModelAndView("redirect:/usuario/login.htm");
        }
        }catch (Exception ex){ 
        logger.error("Error... Al modificar el rol"+ex); 
               
       }
       return null;
    }
    
/**
 * *****************************************************************************
 * Obtiene el Rol
 * *****************************************************************************
 * Metodo sin desarrollo.
 * *****************************************************************************
 * @param rolID
 * @param request
 * @param response
 * @return
 * @throws Exception 
 */
    
    @RequestMapping ("/rol/obtenerRol")
    public ModelAndView obtenerRol (int rolID,        
                                            HttpServletRequest request, 
                                            HttpServletResponse response)
                                            throws Exception{
        try{
        logger.info("Se obtendra el rol");
        HttpSession sess =  request.getSession();
        if (sess != null){
           return null; 
        }else{
             request.removeAttribute("usuario");
            return new ModelAndView("redirect:/usuario/login.htm");
        }
        }catch (Exception ex){ 
        logger.error("Error... Al obtener el rol"+ex); 
               
       }
       return null;
    }
    /*
    @RequestMapping("/rol/obtenerRol")
    public ModelAndView obtenerRol(String codigoRol,            
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
    */
}
