/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.controllers;

import com.opencnc.beans.Modelo;
import com.opencnc.beans.TipoMaquina;
import com.opencnc.beans.UnidadMedida;
import com.opencnc.beans.Usuario;
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
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
 
  
/**
 *
 * @author root
 */

@Controller
//@SessionAttributes("usuario")
public class ModeloController {
    // Implemento Log4j para eventos tipo log
    private static final Logger logger = Logger.getLogger(UsuarioController.class.getName());
       
    //@RequestMapping  (value="/modelo/abrir", method=RequestMethod.POST)
    @RequestMapping  (value="/modelo/abrir")
    public ModelAndView   abrir  (/*@RequestParam Integer usuarioId,*/
                                            HttpServletRequest request, 
                                            HttpServletResponse response)
                                            throws Exception{
        
        HttpSession sess =  request.getSession();
        if (sess != null){
          //String sid = session.getId();
        
            Session s = HibernateUtil.getSessionFactory().openSession();
            //Usuario us = (Usuario)s.get(Usuario.class, usuarioId);

           
            Usuario us = (Usuario)sess.getAttribute("usuario");

            Integer luser = us.getUsuarioId();

            Criteria c = s.createCriteria(Modelo.class);
            c.add(Restrictions.eq("usuario", us));
            List<Modelo> lm = c.list();



            ModelAndView m = new ModelAndView("/modelo/abrir");
            m.addObject("modelos",lm);
            m.addObject("nombreUsuario",us.getNombre());
            return m;  
        }else{
             request.removeAttribute("usuario");
            return new ModelAndView("redirect:/usuario/login.htm");
        }
        
    }
    
    @RequestMapping  ("/modelo/crearModelo")
    static ModelAndView   crearModelo  (HttpServletRequest request, 
                                        HttpServletResponse response)
                                        throws Exception{
        
        HttpSession sess =  request.getSession();
        if (sess != null){
            Modelo md = new Modelo();
            ModelAndView m = new ModelAndView("/modelo/crearModelo");
            m.addObject("modelo",md);




            Session s = HibernateUtil.getSessionFactory().openSession();
            //Usuario us = (Usuario)request.getAttribute("usuario");

            Usuario us = (Usuario)sess.getAttribute("usuario");

            Criteria c = s.createCriteria(TipoMaquina.class);
            Criteria ma = s.createCriteria(UnidadMedida.class);
            Criteria user = s.createCriteria(Usuario.class);

            List<UnidadMedida> lm = ma.list();
            List<TipoMaquina> l = c.list();
            //List<Usuario> luser = user.list();
            Integer luser = us.getUsuarioId();

            m.addObject("listaTipoMaquina",l);
            m.addObject("listaUnidadMedida",lm);  
            m.addObject("listaUsuarios",luser);
            m.addObject("nombreUsuario",us.getNombre());
            //HttpSession session = request.getSession();
            //m.addObject("numUsuarioId", us.getUsuarioId());
            return m;
        }else{
            request.removeAttribute("usuario");
            return new ModelAndView("redirect:/usuario/login.htm");
        }  
    }
   
    @RequestMapping  ("/modelo/guardarModelo")
    public ModelAndView   guardarModelo     (@ModelAttribute Modelo modelo, 
                                            @RequestParam Integer unidadMedidaId, 
                                            @RequestParam Integer tipoMaquinaId,
                                            @RequestParam Integer usuarioId,
                                            HttpServletRequest request, 
                                            HttpServletResponse response
                                            )throws Exception{
        
        HttpSession sess =  request.getSession();
        if (sess != null){
            if (!"".equals(modelo.getNombre())){
            
            
            Calendar c = new GregorianCalendar();
            Date d1 = c.getTime();
            
            modelo.setCreadoFecha(d1);
            Session s = HibernateUtil.getSessionFactory().openSession();
                       
            UnidadMedida un = (UnidadMedida)s.get(UnidadMedida.class, unidadMedidaId);
            modelo.setUnidadMedida(un);
            TipoMaquina tm = (TipoMaquina)s.get(TipoMaquina.class, tipoMaquinaId);
            modelo.setTipoMaquina(tm);
            
            
            Usuario us = (Usuario)sess.getAttribute("usuario");
            
            //Usuario us = (Usuario)s.get(Usuario.class, usuarioId);
            //Usuario us = (Usuario)s.get(Usuario.class, 2);
            
            modelo.setUsuario(us);
            
            Transaction t = s.getTransaction();
            s.beginTransaction();
            s.saveOrUpdate(modelo);
            t.commit();
        }
        //return abrir(usuarioId);
        return abrir(request, response);
        }else{
            request.removeAttribute("usuario");
            return new ModelAndView("redirect:/usuario/login.htm");
        }
        
    }
    
    //@RequestMapping(value = "/modelo/editarModelo/{id}", method = RequestMethod.GET)
    @RequestMapping  ("modelo/editarModelo/{id}")
    public ModelAndView   editarModelo  (@PathVariable Integer id, 
                                            HttpServletRequest request, 
                                            HttpServletResponse response
                                            )throws Exception{
        
        HttpSession sess =  request.getSession();
        if (sess != null){
            Session s = HibernateUtil.getSessionFactory().openSession();
        
            //Modelo u = (Modelo)s.get(Modelo.class, 2);
            Modelo u = (Modelo)s.get(Modelo.class,id);

            ModelAndView m = new ModelAndView ("/modelo/editarModelo");
            m.addObject("modelo",u);


            return m;
        }else{
            request.removeAttribute("usuario");
            return new ModelAndView("redirect:/usuario/login.htm");
        }
        
    }
    
    
    @RequestMapping ("/modelo/borrarModelo/{id}")
    public ModelAndView borrarModelo (@PathVariable Integer id, 
                                            HttpServletRequest request, 
                                            HttpServletResponse response)
                                            throws Exception{
        HttpSession sess =  request.getSession();
        if (sess != null){
           Session s = HibernateUtil.getSessionFactory().openSession();

            
            Usuario us = (Usuario)sess.getAttribute("usuario");

            Modelo u = (Modelo) s.get(Modelo.class, id);
            Transaction t = s.beginTransaction();
            s.delete(u);
            t.commit();
            //return new ModelAndView("redirect:/usuario/login.htm");
            //return abrir(1);
            return abrir(request, response); 
        }else{
            request.removeAttribute("usuario");
            return new ModelAndView("redirect:/usuario/login.htm");
        }
        
        
    }    
}
