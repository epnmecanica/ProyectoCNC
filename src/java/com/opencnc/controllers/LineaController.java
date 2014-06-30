/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.opencnc.beans.Linea;
import com.opencnc.util.HibernateUtil;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.hibernate.Criteria;
import org.hibernate.FetchMode;
import org.hibernate.Session;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
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
   @RequestMapping(     value="linea/lista", 
                        method=RequestMethod.GET,
                        headers = "Accept=*/*"
                        )
   
    public ResponseEntity<String> listaLinea(@RequestParam int modeloId){
      
      // Session  s = HibernateUtil.getSessionFactory().openSession();
        
        //Criteria  c =s.createCriteria(Linea.class).setFetchMode("elementografico", FetchMode.JOIN);
        //List<Linea> l = c.list();
       
        //HttpHeaders headers = new HttpHeaders();
       // headers.set(  "Content-Type", "application/json" );
      
        return null;
    }   

    private ResponseEntity<String> createJsonResponse( Object o )
    {
        Gson gson = new Gson();
        HttpHeaders headers = new HttpHeaders();
        headers.set(  "Content-Type", "application/json" );
        String json = gson.toJson( o );
        return new ResponseEntity<String>( json, headers, HttpStatus.CREATED );
    }
    @RequestMapping ("/linea/crear")
    public ModelAndView crear ( int modeloId){
        Linea ar = new Linea();
       
        return null;
    }
    
    public ModelAndView obtener(){
        Session s = HibernateUtil.getSessionFactory().openSession();
        return null;
    }
   
    public ModelAndView actualizar(){
        Session s = HibernateUtil.getSessionFactory().openSession();
        return null;
    }
    
    public ModelAndView borrar(){
        Session s = HibernateUtil.getSessionFactory().openSession();
        return null;
    }
}
