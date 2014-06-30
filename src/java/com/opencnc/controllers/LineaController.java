/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.controllers;

import com.opencnc.beans.Linea;
import com.opencnc.beans.Usuario;
import com.opencnc.util.HibernateUtil;
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
    
   @RequestMapping(     value="linea/lista", 
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
                        value="linea/crear", 
                        method=RequestMethod.GET,
                        headers = "Accept=*/*"   
                    )
    public ModelAndView crear ( @RequestParam(value = "modeloId", required = true) int modeloId, 
                                @RequestParam(value = "myVal2", required = true) String myVal2, 
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
}
