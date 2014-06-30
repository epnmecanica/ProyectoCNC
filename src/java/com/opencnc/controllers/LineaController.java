/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.opencnc.beans.Linea;
import com.opencnc.beans.Usuario;
import com.opencnc.util.HibernateUtil;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
    
   @RequestMapping(     value="linea/crear", 
                        method=RequestMethod.GET,
                        headers = "Accept=*/*"
                        )
    public void listaLinea(@RequestParam(value = "modeloId", required = true) int modeloId, 
                            /*@RequestParam(value = "myVal2", required = true) String myVal2, */
                            HttpServletRequest request, HttpServletResponse response){
        
        Session s = HibernateUtil.getSessionFactory().openSession();
        int modelos = modeloId;
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
    @RequestMapping (/*"/linea/crear"*/
                        value="linea/lista", 
                        method=RequestMethod.GET,
                        headers = "Accept=*/*"   
                    )
    public ModelAndView crear ( @RequestParam(value = "modeloId", required = true) int modeloId, 
                                /*@RequestParam(value = "myVal2", required = true) String myVal2, */
                                HttpServletRequest request, HttpServletResponse response){
        HttpSession sess =  request.getSession();
        Session s = HibernateUtil.getSessionFactory().openSession();
        Usuario us = (Usuario)sess.getAttribute("usuario");
        Linea ar = new Linea();
       
        return obtener(request, response);
    }
    
    public ModelAndView obtener(HttpServletRequest request, HttpServletResponse response
                               ){
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
