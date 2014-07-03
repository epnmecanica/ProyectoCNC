/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.opencnc.beans.Linea;
import com.opencnc.beans.Usuario;
import com.opencnc.beans.lineatool;
import com.opencnc.util.HibernateUtil;
import java.lang.reflect.Type;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.hibernate.Session;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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
    @RequestMapping(    value="linea/lista", 
                        method=RequestMethod.GET,
                        headers = "Accept=*/*"
                        )
    public void listaLinea(@RequestParam(value = "datos", required = true) String datos, 
                            
                            HttpServletRequest request, HttpServletResponse response){
        
        Session s = HibernateUtil.getSessionFactory().openSession();
        Gson gson = new Gson();
       
        Type collectionType = new TypeToken<List<lineatool>>(){}.getType();
        List<lineatool> ints2 = gson.fromJson(datos, collectionType);
        //GsonBuilder gsonBuilder = new GsonBuilder();
        //Gson gson = gsonBuilder.registerTypeAdapter(Linea.class, new LineaJson()).create();
        
        //String datos = gson.toJson(l);
        
    }
   /*
    public ResponseEntity<String> listaLinea(@RequestParam int modeloId){
     
        return null;
    }   
*/
    private ResponseEntity<String> createJsonResponse( Object o )
    {
       
        return null;
    }
}
