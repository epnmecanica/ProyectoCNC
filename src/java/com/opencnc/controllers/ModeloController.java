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
public class ModeloController {
    @RequestMapping  ("/modelo/abrir")
    public ModelAndView   abrir  (){
        Session s = HibernateUtil.getSessionFactory().openSession();
        
        Criteria c = s.createCriteria(Modelo.class);
        List<Modelo> lm = c.list();
        
        ModelAndView m = new ModelAndView("/modelo/abrir");
        m.addObject("modelos",lm);
        return m;
    }
    
    @RequestMapping  ("/modelo/crearModelo")
    public ModelAndView   crearModelo  (HttpServletRequest request){
        Modelo md = new Modelo();
        
        ModelAndView m = new ModelAndView("/modelo/crearModelo");
        m.addObject("modelo",md);
        
        Session s = HibernateUtil.getSessionFactory().openSession();
        
        //Criteria user = s.createCriteria(Usuario.class);
        Criteria c = s.createCriteria(TipoMaquina.class);
        Criteria ma = s.createCriteria(UnidadMedida.class);
        
        //List<Usuario> luser = user.list();
        List<UnidadMedida> lm = ma.list();
        List<TipoMaquina> l = c.list();
        
        m.addObject("listaTipoMaquina",l);
        m.addObject("listaUnidadMedida",lm);
        
        return m;
    }
   
    @RequestMapping  ("/modelo/guardarModelo")
    public ModelAndView   guardarModelo  (@ModelAttribute Modelo modelo, @RequestParam Integer unidadMedidaId, @RequestParam Integer tipoMaquinaId){
        if (!"".equals(modelo.getNombre()) ){
            
            
            Calendar c = new GregorianCalendar();
            Date d1 = c.getTime();
            
            modelo.setCreadoFecha(d1);
            Session s = HibernateUtil.getSessionFactory().openSession();
            
            UnidadMedida un = (UnidadMedida)s.get(UnidadMedida.class, unidadMedidaId);
            modelo.setUnidadMedida(un);
            TipoMaquina tm = (TipoMaquina)s.get(TipoMaquina.class, tipoMaquinaId);
            modelo.setTipoMaquina(tm);
            Usuario us = (Usuario)s.get(Usuario.class, 2);
            modelo.setUsuario(us);
            Transaction t = s.getTransaction();
            s.beginTransaction();
            s.saveOrUpdate(modelo);
            t.commit();
        }
        return abrir();
    }
    
    @RequestMapping  ("/modelo/editarModelo/{id}")
    public ModelAndView   crearModelo  ( @PathVariable  Integer id ){
         
        Session s = HibernateUtil.getSessionFactory().openSession();
        
        Modelo u = (Modelo)s.get(Usuario.class, id);
        ModelAndView m = new ModelAndView ("/modelo/editarModelo");
        m.addObject("modelo",u);
        
        
        return m;
    }
    
    @RequestMapping ("/modelo/borrarModelo/{id}")
    public ModelAndView borrarModelo (@PathVariable Integer id){
        Session s = HibernateUtil.getSessionFactory().openSession();
        
        Modelo u = (Modelo) s.get(Usuario.class, id);
        Transaction t = s.beginTransaction();
        s.delete(u);
        t.commit();
        return abrir();
    }
    
    
    
}
