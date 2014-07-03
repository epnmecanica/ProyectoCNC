/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.opencnc.beans.Arco;
import com.opencnc.beans.ElementoGrafico;
import com.opencnc.beans.Linea;
import com.opencnc.beans.Texto;
import com.opencnc.beans.Usuario;
import com.opencnc.beans.lineatool;
import com.opencnc.util.HibernateUtil;
import java.lang.reflect.Type;
import java.util.Iterator;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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

public class LineaController {
    
   
    @RequestMapping (
                        value="linea/crear", 
                        method=RequestMethod.GET,
                        headers = "Accept=*/*"   
                    )
    public ModelAndView crear ( 
                                @RequestParam(value = "modeloId", required = true) int modeloId, 
                                @RequestParam(value = "myVal2", required = true) String myVal2, 
                                @RequestParam(value = "color", required = true) String color,
                                @RequestParam(value = "x2", required = true) int x2,
                                @RequestParam(value = "y2", required = true) int y2,
                                HttpServletRequest request, HttpServletResponse response) throws Exception{
        HttpSession sess =  request.getSession();
        Session s = HibernateUtil.getSessionFactory().openSession();
        Usuario us = (Usuario)sess.getAttribute("usuario");
        Linea ar = new Linea();
       
        return obtener(request, response);
    }
    @RequestMapping (/*"/linea/crear"*/
                        value="linea/obtener", 
                        method=RequestMethod.GET,
                        headers = "Accept=*/*"   
                    )
    public ModelAndView obtener(HttpServletRequest request, 
                                HttpServletResponse response
                               ){
        Session s = HibernateUtil.getSessionFactory().openSession();
 
        return null;
    }
     @RequestMapping (
                        value="linea/actualizar", 
                        method=RequestMethod.GET,
                        headers = "Accept=*/*"   
                    )
    public ModelAndView actualizar(){
        Session s = HibernateUtil.getSessionFactory().openSession();
        return null;
    }
     @RequestMapping (
                        value="linea/borrar", 
                        method=RequestMethod.GET,
                        headers = "Accept=*/*"   
                    )
    public ModelAndView borrar(){
        Session s = HibernateUtil.getSessionFactory().openSession();
        return null;
    }
    @RequestMapping(    value="elemento/crear/linea/lista", 
                        method=RequestMethod.GET,
                        headers = "Accept=*/*"
                        )
    public void listaLinea(@RequestParam(value = "datos", required = true) String datos, 
                           
                            HttpServletRequest request, 
                            HttpServletResponse response) throws Exception{
        
        Session s = HibernateUtil.getSessionFactory().openSession();
        Gson gson = new Gson();
       
        Type collectionType = new TypeToken<List<lineatool>>(){}.getType();
        List<lineatool> ints2 = gson.fromJson(datos, collectionType);
      
        Iterator<lineatool> elem = ints2.iterator();
        ElementoGraficoController egc = new ElementoGraficoController();
        while(elem.hasNext()){
            lineatool tipo = elem.next();
           // System.out.println("el tipo es: "+ tipo.getType());
            switch (tipo.getType()) {
                case 1:  System.out.print("es punto");
                         break;
                case 2:  System.out.print("es linea");
                         egc.actualizar(tipo, 63, request, response);
                         
                         ElementoGrafico e = (ElementoGrafico)s.get(ElementoGrafico.class,0);
                         Linea l = new Linea();
                         
                         
                         l.setPosicionX2(tipo.getX2());
                         l.setPosicionY2(tipo.getY2());
                         l.setElementoId(1);
                         l.setElementoGrafico(e);
                         Transaction t = s.getTransaction();
                         s.beginTransaction();
                         s.saveOrUpdate(l);
                         t.commit();
                         
                         //guardarLinea(tipo);
                         break;
                case 3:  System.out.print("es circulo");
                         break;
                case 5:  System.out.print("es arco");
                         break;
                case 7:  System.out.print("es texto");
                         guardarTexto(tipo);
                         break;
                default: System.out.print("no es");
                         break;
            }
        }
    }
   /*
    public ResponseEntity<String> listaLinea(@RequestParam int modeloId){
     
        return null;
    }   
    */
    //@RequestMapping ("/linea/guardar")
    public void guardarLinea (lineatool tipo) throws Exception{
      
        Session s = HibernateUtil.getSessionFactory().openSession();
        Linea l = new Linea();
        l.setPosicionX2(tipo.getX2());
        l.setPosicionY2(tipo.getY2());
        ElementoGraficoController fm = new ElementoGraficoController();
        fm.actualizar(tipo ,63, null, null);
    }
    public void guardarTexto (lineatool tipo){
        System.out.print(tipo);
        Session s = HibernateUtil.getSessionFactory().openSession();
        Texto tx = new Texto();
        
        
    }
    
    private ResponseEntity<String> createJsonResponse( Object o )
    {
       
        return null;
    }
}
