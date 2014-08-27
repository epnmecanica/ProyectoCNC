/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.controllers;

import com.opencnc.beans.Seguridades;
import com.opencnc.beans.Usuario;
import com.opencnc.util.HibernateUtil;
import java.util.ArrayList;
import java.util.List;
import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;

/**
 *
 * @author root
 */

@Controller
public class SeguridadesController {
    /**
    * **************************************************************************
    * Validador de Creador de usuarios.
    * **************************************************************************
     * @param usuario
     * @return 
     */
     private static final Logger logger = Logger.getLogger(SeguridadesController.class.getName());
    public Seguridades seguridad (@ModelAttribute Usuario usuario){
        //Cantidad minima caracteres para la contraseña
        int cantidadCaracteres = 7;
        //Caracter valido para el correo email.
        String validcaracters = "@";
        //Cantidad maxima de caracteres para el nombre.
        int maxNom = 60;
        //Valores de prueba
        int prueba = 0;
        // lista de Errores.
        ArrayList listaError = new ArrayList( ) ; 
        
        Session s = HibernateUtil.getSessionFactory().openSession();
        
//******************************************************************************
// valida si existe un mismo correo para no loguear el mismo usuario
        Criteria criterio = s.createCriteria(Usuario.class);
        criterio.add(Restrictions.eq("email", usuario.getEmail()));
        List<Usuario> users = criterio.list();
//******************************************************************************
   
        Seguridades acces = new Seguridades();
        try{
        logger.info("Mensajes de Validacion de los campos");
        if (usuario.getNombre().isEmpty() || usuario.getNombre().length() > maxNom){
            System.out.println("muy corto o largo el nombre");
        
            listaError.add("Muy corto o largo el nombre");
            prueba = 1;
        }
        
        if (usuario.getApellido().isEmpty() || usuario.getApellido().length() > maxNom){
            System.out.println("muy corto o largo el apellido");
        
            listaError.add("Muy corto o largo el apellido");
            prueba = 2;
        }
        
        if (usuario.getEmail().isEmpty()|| usuario.getEmail().length() > maxNom){
            System.out.println("muy corto o largo el email ");
        
            listaError.add("muy corto o largo el email ");
            prueba = 3;
        }
        
        if(!usuario.getEmail().contains(validcaracters)){
           // m.addObject("error", "no es un mail vaido");  
            System.out.println("no es un mail valido");
           
            listaError.add("No es un mail valido");
            prueba = 4;
        }
               
        if (!users.isEmpty()){
            System.out.println("hay usuarios con el mismo mail, cuenta invalida");
            listaError.add("La cuenta ya existe");
            prueba = 5;
        }
                
        if(usuario.getClave().length < cantidadCaracteres){
            System.out.println("No son suficientes caracteres.");
            listaError.add("No son suficientes caracteres en la clave.");
            prueba = 6;
        }
        if(prueba == 0){
            acces.setPass(true);
        }else{
            acces.setPass(false);
            acces.setThisArrayList(listaError);
        }
        
        }catch (Exception ex){ 
        logger.error("Error...  En los mensajes de validacion"+ex); 
               
       }
        return acces;
    }
    
    
}
