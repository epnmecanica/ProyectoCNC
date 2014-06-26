/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.controllers;

import com.opencnc.beans.Comando;
import com.opencnc.beans.TipoCodigo;
import com.opencnc.util.HibernateUtil;
import org.hibernate.Session;
import org.springframework.stereotype.Controller;

/**
 *
 * @author root
 */
@Controller
public class ComandoController {
    public void agregar(){
        Comando com = new Comando();
        Session s = HibernateUtil.getSessionFactory().openSession();
        TipoCodigo tp = (TipoCodigo)s.get(TipoCodigo.class, s);
    }
    public void borrar(){
        Session s = HibernateUtil.getSessionFactory().openSession();
    }
    public void editar(){
        
    }
}
