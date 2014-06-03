/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.controllers;

import com.opencnc.beans.Usuario;
import com.opencnc.util.HibernateUtil;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
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
@Controller
public class UsuarioController {
    // Implemento Log4j para eventos tipo log
    private static final Logger logger = Logger.getLogger(UsuarioController.class.getName());
 
    @RequestMapping  ("/usuario/lista")
    public ModelAndView   lista  (HttpServletRequest request){
        Session  s = HibernateUtil.getSessionFactory().openSession();
        
        Criteria  c =s.createCriteria(Usuario.class);
        List<Usuario> l = c.list();
        ModelAndView m = new ModelAndView("/usuario/lista");
        //HttpSession session = request.getSession(true);
        Usuario us = (Usuario)request.getAttribute("usuario");
        //Usuario us = (Usuario)session.getAttribute("usuario");
        
        if(us==null){
             return new ModelAndView("redirect:/usuario/login.htm");
            
            
        }else {
            m.addObject("nombreUsuario",us.getNombre());
            m.addObject("usuarios",l);
            logger.info("Empieza a mostrar lista");
            return m;
        }
        
        
    }
    @RequestMapping ("/usuario/crear")
    public ModelAndView crear (){
        Usuario u = new Usuario();
        
        ModelAndView m = new ModelAndView("/usuario/crear");
        m.addObject("usuario",u);
        
        logger.info("Empieza a crear un nuevo usuario");
        return m;
    }
    
    @RequestMapping ("/usuario/guardar")
    public ModelAndView guardar (@ModelAttribute Usuario usuario, HttpServletRequest request){
        if (!"".equals(usuario.getApellido()) 
            && !"".equals(usuario.getNombre()) 
            && !"".equals(usuario.getEmail())
             ){
            
            usuario.setEstado("A");
            Calendar c = new GregorianCalendar();
            Date d1 = c.getTime();
            
            usuario.setCreadoFecha(d1);
            Session s = HibernateUtil.getSessionFactory().openSession();
            
            Transaction t = s.getTransaction();
            s.beginTransaction();
            s.saveOrUpdate(usuario);
            t.commit();
        }
        logger.info("Guarda un nuevo usuario");
        return lista(request);
    }
    
    @RequestMapping  ("/usuario/editar/{id}")
    public ModelAndView   editar  ( @PathVariable  Integer id ){
         
        Session s = HibernateUtil.getSessionFactory().openSession();
        
        Usuario u = (Usuario)s.get(Usuario.class, id);
        ModelAndView m = new ModelAndView ("/usuario/editar");
        m.addObject("usuario",u);
        
        logger.info("Empieza a mostrar lista");
        return m;
    }
    
    @RequestMapping ("/usuario/borrar/{id}")
    
    public ModelAndView borrar(@PathVariable Integer id, HttpServletRequest request){
        Session s = HibernateUtil.getSessionFactory().openSession();
        
        Usuario u = (Usuario) s.get(Usuario.class, id);
        Transaction t = s.beginTransaction();
        s.delete(u);
        t.commit();
        logger.info("Borrar usuario");
        return lista(request);
    }
    
    @RequestMapping("/usuario/login")
    public ModelAndView login (){
        
        Usuario u = new Usuario();
        
        ModelAndView m = new ModelAndView("/usuario/login");
        m.addObject("usuario",u);
        return m;
    }
    
    @RequestMapping("/usuario/iniciarSesion")
    public ModelAndView iniciarSesion (@ModelAttribute Usuario usuario, HttpServletRequest request){
      ModelAndView m = new ModelAndView();
    
      Session s = HibernateUtil.getSessionFactory().openSession();
      
      Criteria c = s.createCriteria(Usuario.class);
      c.add(Restrictions.eq("email", usuario.getEmail()));
      c.add(Restrictions.eq("clave", usuario.getClave()));
      
      List<Usuario> l = c.list();
     
      if (l.isEmpty()){
          m.addObject("error","Usuario no existe");
          request.removeAttribute("usuario");
          return login();
          //return m;
       
          
      }
      else {
          Usuario ul = l.get(0);
          request.setAttribute("usuario", ul); 
          //return lista(request); 
          //return new ModelAndView("redirect:/modelo/crearModelo.htm");
          //return  crearModelo(request);
          
         
          return ModeloController.crearModelo(request);
          
      }        
    }
    
    @RequestMapping("usuario/cambiarContrasena")
    public ModelAndView cambiarContrasena (){
        ModelAndView m = new ModelAndView();
        
        return m;
    }
    
    @RequestMapping  ("/usuario/recuperarContra")
    public ModelAndView   recuperar  (){
        
        ModelAndView m = new ModelAndView("/usuario/recuperarContra");
        
        return m;
    }    
}
