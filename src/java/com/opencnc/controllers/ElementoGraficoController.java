/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.controllers;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.opencnc.beans.Arco;
import com.opencnc.beans.ElementoGrafico;
import com.opencnc.beans.GetJson;
import com.opencnc.beans.Linea;
import com.opencnc.beans.Modelo;
import com.opencnc.beans.Serializacion;
import com.opencnc.beans.Texto;
import com.opencnc.beans.lineatool;
import com.opencnc.util.HibernateUtil;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.FetchMode;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author root
 */
@Controller
//******************************************************************************
//CRUD de los Elementos Graficos de CAM, ListaLinea, getJSON, lista
//******************************************************************************
public class ElementoGraficoController {
    int ident = 0;
    // Implemento Log4j para eventos tipo log
    
    private static final Logger logger = Logger.getLogger(UsuarioController.class.getName());
    
//******************************************************************************
//AJAX, recibe los elementos de el js del cliente y los procesa para almacenar
// en la base de datos.
//******************************************************************************
    @RequestMapping(    value="elemento/crear/linea/lista", 
                        method=RequestMethod.GET,
                        headers = "Accept=*/*"
                        )
    public void listaLinea(@RequestParam(value = "datos", required = true) String datos, 
                            
                            //@ModelAttribute ElementoGrafico elemento,
                            HttpServletRequest request, 
                            HttpServletResponse response) throws Exception{
        
        Session s = HibernateUtil.getSessionFactory().openSession();
        Criteria cs = s.createCriteria(ElementoGrafico.class);
        List<ElementoGrafico> leg = cs.list();
        
        int index=0;
        
        index = leg.size() + 1;
        
        Gson gson = new Gson();
       
        Type collectionType = new TypeToken<List<lineatool>>(){}.getType();
        List<lineatool> ints2 = gson.fromJson(datos, collectionType);
        
        Iterator<lineatool> elem = ints2.iterator();
        
        
        
        while(elem.hasNext()){
            
           ElementoGrafico elemento = new ElementoGrafico();
            
            lineatool tipo = elem.next();
              
            Modelo u = (Modelo)s.get(Modelo.class,ident);
           
            elemento.setModelo(u);
            Calendar c = new GregorianCalendar();
            Date d1 = c.getTime();
            elemento.setCreadoFecha(d1);
            elemento.setPosicionX(tipo.getX1());
            elemento.setPosicionY(tipo.getY1());
            elemento.setElementoId(index);
            elemento.setTipoElemento(tipo.getType());
            elemento.setCreadoPor(u.getCreadoPor());
            elemento.setDescripcion(tipo.getText());
            //falta seguir 
            Transaction t = s.getTransaction();
            s.beginTransaction();
            s.saveOrUpdate(elemento);
            t.commit();
            
            
            index++;
           
            switch (tipo.getType()) {
                case 1:  System.out.print("es punto");
                         break;
                case 2:  System.out.print("es linea");
                        
                         Session ss = HibernateUtil.getSessionFactory().openSession();
                         Linea l = new Linea();
                         ElementoGrafico gr = (ElementoGrafico)ss.get(ElementoGrafico.class, elemento.getElementoId());
                         l.setElementoGrafico(gr);
                         l.setPosicionX2(tipo.getX2());
                         l.setPosicionY2(tipo.getY2());
                         
                         Transaction tt = ss.getTransaction();
                         ss.beginTransaction();
                         ss.saveOrUpdate(l);
                         tt.commit();
                         
                         break;
                case 3:  System.out.print("es circulo");
                         break;
                case 4:  System.out.print("es rectangulo");
                         break;
                case 5:  System.out.print("es arco");
                         Session s1 = HibernateUtil.getSessionFactory().openSession();
                         Arco arc = new Arco();
                         
                         ElementoGrafico gr1 = (ElementoGrafico)s1.get(ElementoGrafico.class, elemento.getElementoId());
                         arc.setElementoGrafico(gr1);
                         arc.setRadio(tipo.getRadius());
                         arc.setAngulo1(tipo.getX2());
                         arc.setAngulo2(tipo.getY2());
                         
                         Transaction t1 = s1.getTransaction();
                         s1.beginTransaction();
                         s1.saveOrUpdate(arc);
                         
                         t1.commit();
                         
                         break;
                case 6:  System.out.print("es label");
                         break;
                case 7:  System.out.print("es texto");
                         Session s2 = HibernateUtil.getSessionFactory().openSession();
                         Texto tx = new Texto();
                         ElementoGrafico gr2 = (ElementoGrafico)s2.get(ElementoGrafico.class, elemento.getElementoId());
                         tx.setElementoGrafico(gr2);
                         tx.setTamanio(12);
                         Transaction t2 = s2.getTransaction();
                         s2.beginTransaction();
                         s2.saveOrUpdate(tx);
                         
                         t2.commit();
                         
                         break;
                case 8:  System.out.print("es circulo");
                         break;
                case 9:  System.out.print("es circulo");
                         break;
                case 10:  System.out.print("es circulo");
                         break;
                default: System.out.print("no es");
                         break;
            }
        }
    }
    
//******************************************************************************
//Obtiene la base de datos con los elementos graficos por modelo y los 
//envia al Ajax del cliente
//******************************************************************************
//******************************************************************************
//Metodo faltante de desarrollo y problemas en el envio de datos.
//******************************************************************************
    
    @RequestMapping(    value="elemento/crear/linea/getJSON", 
                        method=RequestMethod.GET,headers = "Accept=*/*")
    public @ResponseBody String getJSON(){
                   
        Session s = HibernateUtil.getSessionFactory().openSession();
            
        Modelo mod = (Modelo)s.get(Modelo.class, ident);
        
        ElementoGrafico elem = new ElementoGrafico();
        
        Criteria c = s.createCriteria(ElementoGrafico.class);
        
        c.add(Restrictions.eq("modelo", mod));
        
        List<ElementoGrafico> leg = c.list();
        
        if (leg.isEmpty()){
            return null;
        }else{
            ArrayList<Serializacion> lsr = new ArrayList<>();

            Gson gson = new Gson();

            Serializacion sr = new Serializacion();

            for ( int j = 0; j <= leg.size()-1; j ++ ) {
                    elem = leg.get(j);
                    sr.setActive(true);
                    sr.setType(elem.getTipoElemento());
                    sr.setColor("blue");
                    sr.setRadius(1);
                    sr.setText(null);
                    sr.setX(elem.getPosicionX());
                    sr.setY(elem.getPosicionY());
                    //Linea l = new Linea();
                    sr.setX1(elem.getLinea().getPosicionX2());
                    sr.setY2(elem.getLinea().getPosicionY2());
                    sr.setX3(0);
                    sr.setY3(0);
                    lsr.add(sr);

            }
            String js = gson.toJson(lsr);  
                return js;
        }
        
    }


/**
 * *****************************************************************************
 * Se visualiza los elementos graficos de todos los usuarios.
 *******************************************************************************
 *******************************************************************************
 * Metodo faltante de desarrllo.
 *******************************************************************************
 * @param request
 * @param response
 * @return
 * @throws Exception 
 */
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
    
/**
 * *****************************************************************************
 * Crea la vista del CAD, dependiendo del modelo.
 * *****************************************************************************
 * @param id
 * @param request
 * @param response
 * @return
 * @throws Exception 
 */
    
    @RequestMapping  ("/elemento/crear/{id}")
    public ModelAndView   crear  (@PathVariable Integer id,
                                    HttpServletRequest request, 
                                    HttpServletResponse response) throws Exception{
        HttpSession sess =  request.getSession();
        if (sess != null){
            Session  s = HibernateUtil.getSessionFactory().openSession();
        
            //ElementoGrafico e = new ElementoGrafico();
            ModelAndView m = new ModelAndView("/elemento/crear");
            m.addObject("Id",id);
            Modelo mod = (Modelo)s.get(Modelo.class, id);
            m.addObject("NombreModel",mod.getNombre());
            //m.addObject("TipoMaquina",mod.getTipoMaquina());
            ident = id;
            
            
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
    
/**
 * *****************************************************************************
 * Actualiza los elementos graficos
 * *****************************************************************************
 * Metodo sin desarrollo.
 * *****************************************************************************
 * La funcion de este metodo es encontrar todos los elementos graficos del mismo 
 * modelo, los borra y sobrescribe.
 * *****************************************************************************
 * @param ln
 * @param Id
 * @param request
 * @param response
 * @return
 * @throws Exception 
 */
    @RequestMapping  ("/elemento/actualizar")
    public ElementoGrafico   actualizar  (lineatool ln,
                                        
                                        @RequestParam Integer Id,
                                    HttpServletRequest request, 
                                    HttpServletResponse response) throws Exception{
        //HttpSession sess =  request.getSession();
        //if (sess != null){
            ElementoGrafico e = new ElementoGrafico();
            Session s = HibernateUtil.getSessionFactory().openSession();
            
            Modelo u = (Modelo)s.get(Modelo.class,Id);
            e.setModelo(u);
            Calendar c = new GregorianCalendar();
            Date d1 = c.getTime();
            e.setCreadoFecha(d1);
            e.setPosicionX(ln.getX1());
            e.setPosicionY(ln.getY1());
            //falta seguir 
            Transaction t = s.getTransaction();
            s.beginTransaction();
            s.saveOrUpdate(e);
            t.commit();
            
            return e; 
       // }else{
        //     request.removeAttribute("usuario");
         //   return new ModelAndView("redirect:/usuario/login.htm");
        //}
    }
    
/**
 * *****************************************************************************
 * Borra los elementos graficos del modelo.
 * *****************************************************************************
 * Metodo sin funcion.
 * *****************************************************************************
 * @param id
 * @param request
 * @param response
 * @return
 * @throws Exception 
 */
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
    
/**
 * *****************************************************************************
 * Obtiene los Elementos graficos de la base de datos.
 * *****************************************************************************
 * Metodo sin desarrollo.
 * *****************************************************************************
 * @param id
 * @param request
 * @param response
 * @return
 * @throws Exception 
 */
    
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

/**
 * *****************************************************************************
 * Obtiene el elemento grafico por modelo.
 * *****************************************************************************
 * Metodo sin desarrollo.
 * *****************************************************************************
 * @param ModeloID
 * @param request
 * @param response
 * @return
 * @throws Exception 
 */
    
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
