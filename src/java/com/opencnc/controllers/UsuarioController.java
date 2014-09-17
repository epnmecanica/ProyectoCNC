/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.controllers;



import com.opencnc.beans.Usuario;
import com.opencnc.util.HibernateUtil;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Properties;
import java.util.Random;
import java.util.logging.Level;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author root
 */
//******************************************************************************
//Creacion, visualizacion, edicion, borrado, inicio y fin de Sesion de usuarios,
//cambio y recuperacion de contraseña, para los usuarios
//******************************************************************************

@Controller
public class UsuarioController {
    // Implemento Log4j para eventos tipo log
    private static final Logger logger = Logger.getLogger(UsuarioController.class.getName());
                    Date fechaInicio = null;
                    Date fechaLlegada = null;
                   
                Calendar calendario = Calendar.getInstance();
                Calendar fechaenvio=Calendar.getInstance();
                Calendar fecha24horas = Calendar.getInstance();
 
//******************************************************************************
//En lista los usuarios de la base de datos, esto es solo para cuentas 
//administrativas.
//******************************************************************************
    @RequestMapping  ("/usuario/lista")
    public ModelAndView   lista  (HttpServletRequest request, 
                                    HttpServletResponse response) throws IOException{
        
        
       try{
            HttpSession sess =  request.getSession();
         
         
        if (sess != null){
            Session  s = HibernateUtil.getSessionFactory().openSession();
       
            Criteria  c =s.createCriteria(Usuario.class);
            List<Usuario> l = c.list();
            ModelAndView m = new ModelAndView("/usuario/lista");
            //HttpSession session = request.getSession(true);
            //Usuario us = (Usuario)request.getAttribute("usuario");
            Usuario us = (Usuario)sess.getAttribute("usuario");
            //Usuario us = (Usuario)session.getAttribute("usuario");

            if(us == null){
                 return new ModelAndView("redirect:/usuario/login.htm"); 
                 
            }else {
                m.addObject("nombreUsuario",us.getNombre());
                
                m.addObject("usuarios",l);
                logger.info("Se iniciado la sesion con el usuario "+us.getNombre());
                logger.info("Empieza a mostrar lista de los usuarios.");
                return m;
            }
        }else{
            request.removeAttribute("usuario");
            
            return new ModelAndView("redirect:/usuario/login.htm");
        }  
       }catch (Exception ex){ 
        logger.error("Error Inicie session por favor "+ex); 
        return new ModelAndView("redirect:/error/abrir_error.htm");       
       }
       //return null;
      
    }

/**
 * *****************************************************************************
 * Crea la vista para ingresar al formulario los datos para la creacion de 
 * usuarios.
 * *****************************************************************************
 * @return
 * @throws IOException 
 */
    @RequestMapping ("/usuario/crear")
    public ModelAndView crear ()throws IOException{
        
    
        try{
                            
        Usuario u = new Usuario();
        
        ModelAndView m = new ModelAndView("/usuario/crear");
        m.addObject("usuario",u);
        
        logger.info("Empieza a crear un nuevo usuario");
        return m;
        
        }catch(NumberFormatException  ex){
            logger.error("Error...Ingrese sus datos"+ex);
            //Redirecciona para enviar a la pagina de error
            return new ModelAndView("redirect:/error/abrir_error.htm");   
        }
        //return null;
    }
/**
 * *****************************************************************************
 * Recoge la informacion del formulario de creacion de usuario y valida que ç
 * tenga contenido y los guarda en la base de datos.
 * *****************************************************************************
 * @param usuario
 * @param request
 * @param response
 * @return
 * @throws Exception 
 */
    @RequestMapping ("/usuario/guardar")
    public ModelAndView guardar (@ModelAttribute Usuario usuario, 
                                            HttpServletRequest request, 
                                            HttpServletResponse response)
                                            throws Exception{
        byte[] clave = usuario.getClave();
        Session s = HibernateUtil.getSessionFactory().openSession();
        
        //Clase de seguridades
        SeguridadesController  sr = new SeguridadesController ();
        EncryptController enc = new EncryptController();
        ModelAndView m = new ModelAndView("/usuario/crear");
        
        
        
       
        
        // verifica las seguridades.     
        if (sr.seguridad(usuario).isPass()){
            
            usuario.setEstado("A");
            Calendar c = new GregorianCalendar();
            Date d1 = c.getTime();
            
            usuario.setCreadoFecha(d1);
// usuarios validos todos los que son creados por 0, si son 1 son invalidos
// Posterior.
            usuario.setCreadoPor(0);  
            usuario.setModificadoPor(0);//modificado la contraseña por el sistema
            // se codifica la clave
            usuario.setClave(enc.encriptado(clave));
            
            Transaction t = s.getTransaction();
            s.beginTransaction();
            s.saveOrUpdate(usuario);
            t.commit();
        }else{
            
            m.addObject("error", sr.seguridad(usuario).getThisArrayList());
            return m;
        }
        logger.info("Guarda un nuevo usuario");
        return lista(request, response);
    }
    
/**
 * *****************************************************************************
 * Recibe el parametro "id" para editar el usuario ya creado.
 * *****************************************************************************
 * @param id
 * @param request
 * @param response
 * @return
 * @throws IOException 
 */
    @RequestMapping  ("/usuario/editar/{id}")
    public ModelAndView   editar  ( @PathVariable  Integer id, 
                                            HttpServletRequest request, 
                                            HttpServletResponse response)
                                            throws IOException{
        try{
            logger.info("Se Modificara los datos del Usuario");
        HttpSession sess =  request.getSession();
        if (sess != null){
            Session s = HibernateUtil.getSessionFactory().openSession();
        
            Usuario u = (Usuario)s.get(Usuario.class, id);
            ModelAndView m = new ModelAndView ("/usuario/editar");
            m.addObject("usuario",u);

            logger.info("Empieza a mostrar lista de usuarios");
            return m;
        }else{
            request.removeAttribute("usuario");
            return new ModelAndView("redirect:/usuario/login.htm");
        } 
        }catch(Exception ex){
            logger.error("Error... Al Editar los datos del Usuario",ex);
        }
        return null;
    }
    
/**
 * *****************************************************************************
 * Recibe el "id" del usuario y lo borra de la base de datos.
 * *****************************************************************************
 * @param id
 * @param request
 * @param response
 * @return
 * @throws IOException 
 */
    
    @RequestMapping ("/usuario/borrar/{id}")
    
    public ModelAndView borrar(@PathVariable Integer id, 
                                                HttpServletRequest request, 
                                                HttpServletResponse response)
                                                throws IOException{
        logger.info("Se eliminara al usuario");
        HttpSession sess =  request.getSession();
        if (sess != null){
           Usuario us = (Usuario)sess.getAttribute("usuario");
        
            Session s = HibernateUtil.getSessionFactory().openSession();

            Usuario u = (Usuario) s.get(Usuario.class, id);
            if (us.getUsuarioId() == u.getUsuarioId()){
                return lista(request, response);
            }else{
                Transaction t = s.beginTransaction();
                s.delete(u);
                t.commit();
                logger.info("Borrar usuario");
                return lista(request, response);
            } 
        }else{
            request.removeAttribute("usuario");
            return new ModelAndView("redirect:/usuario/login.htm");
        }    
    }
    
/**
 * *****************************************************************************
 * Crea la vista para el login o inicio de la sesion.
 * *****************************************************************************
 * @return
 * @throws IOException 
 */
    
    @RequestMapping("/usuario/login")
    public ModelAndView login ()throws IOException{
       
        try{
            
        logger.info("Ingrese sus datos del login"); 
        Usuario u = new Usuario();
        
        ModelAndView m = new ModelAndView("/usuario/login");
        m.addObject("usuario",u);
        
        return m;
        
        
        }catch(Exception ex){
             java.util.logging.Logger.getLogger(UsuarioController.class.getName()).log(Level.SEVERE, null, ex);
             logger.error("Error... Al ingresar al login");
        }
        return null;
    }
    
/**
 * *****************************************************************************
 * Valida los datos de e-mail y contraseña, crea la variable de sesion.
 * *****************************************************************************
 * @param usuario
 * @param request
 * @param response
 * @return
 * @throws IOException 
 */
        
    @RequestMapping("/usuario/iniciarSesion")
    public ModelAndView iniciarSesion (@ModelAttribute Usuario usuario, 
                                            HttpServletRequest request, 
                                            HttpServletResponse response)
                                            throws IOException{
        
      
  
      ModelAndView m = new ModelAndView();
    
      Session s = HibernateUtil.getSessionFactory().openSession();
       EncryptController enc = new EncryptController();
       
      Criteria c = s.createCriteria(Usuario.class);
      
      c.add(Restrictions.eq("email", usuario.getEmail()));
      
      //encripta la clave y la compara con la de la base de datos.
      c.add(Restrictions.eq("clave", enc.encriptado(usuario.getClave())));
      //c.add(Restrictions.eq("clave", usuario.getClave()));
      
      List<Usuario> l = c.list();
     
      if (l.isEmpty()){
          m.addObject("errorId", null);
          request.removeAttribute("usuario");
          try {
              logger.info("Debe... Inicie sesion por favor...");
            
              return login();
              //return m;
          } catch (Exception ex) {
              java.util.logging.Logger.getLogger(UsuarioController.class.getName()).log(Level.SEVERE,null , ex);
              logger.error("Error de inicio de session"+ex.getMessage());
          }
               
      }
      else {
          Usuario ul = l.get(0);
           
          HttpSession ses =  request.getSession();
          ses.setAttribute("usuario", ul);
          request.setAttribute("usuario", ul);
          logger.info("A ingresado al sistema con el siguiente usuario "+ul.getNombre()); 
     
//                  
           
            if(ul.getModificadoPor()==1){
                
                fechaenvio.setTime(ul.getModificadoFecha()); //obtiene la fecha de envio del msm            
                System.out.println("fecha de envio es: "+fechaenvio.getTime());
                fechaenvio.add(Calendar.HOUR, 24);  // numero de horas a añadir, o restar en caso de horas<0
                fechaLlegada=fechaenvio.getTime();//guarda la fecha despues de 24 horas.
                System.out.println("fecha despues de 24 horas es: "+fechaLlegada);
                Calendar fecha = Calendar.getInstance();
                System.out.println("la fecha del sistema es: "+fecha.getTime());
                fecha24horas.setTime(fechaLlegada); 
                
                
                 if(fecha.before(fecha24horas)){           
                    //Calculos de las fechas para cambiar la fecha en 24 horas
                    
                    long milisegundos1 = fecha24horas.getTimeInMillis();
                    long milisegundos2 = fecha.getTimeInMillis();
                     //diferencia en milisegundos
                    long diferenciaMilisegundos = milisegundos2 - milisegundos1;
                        // calcular la diferencia en minutos
                    long diffMinutos =  Math.abs (diferenciaMilisegundos / (60 * 1000));
                    long restominutos = diffMinutos%60;
                    long diffHoras =   ((diferenciaMilisegundos / (60 * 60 * 1000)))*-1;
                   
                    System.out.println("Le quedan "+ diffHoras+" horas "+restominutos+ " minutos para cambiar la contraseña");
                   
                 
                    }
                    else{
                        return new ModelAndView("redirect:/usuario/cambiarContrasena.htm");
                    }
            }//else{
//                return new ModelAndView("redirect:/modelo/crearModelo.htm");
//              }
//            
          try {
              //return lista(request);
              //return new ModelAndView("redirect:/modelo/crearModelo.htm");
              //return  crearModelo(request);
              return ModeloController.crearModelo(request, response);
          } catch (Exception ex) {
              logger.error("Error... por favor inicie sus datos");
              java.util.logging.Logger.getLogger(UsuarioController.class.getName()).log(Level.SEVERE, null, ex);
          }
          
      }   
        return null;
   
    }
    
/**
 * *****************************************************************************
 * Cambia la contraseña.
 * *****************************************************************************
 * *****************************************************************************
 * Metodo aun si desarrollo.
 * *****************************************************************************
 * @param request
 * @param response
 * @return
 * @throws IOException 
 */
    
    @RequestMapping("usuario/cambiarContrasena")
    public ModelAndView cambiarContrasena (HttpServletRequest request, 
                                            HttpServletResponse response)
                                            throws IOException{
      try {
          logger.info("Ingrese la nueva contraseña.");
        HttpSession sess =  request.getSession();
        if (sess != null){
            ModelAndView m = new ModelAndView();
        
        return m;
        }else{
            request.removeAttribute("usuario");
            return new ModelAndView("redirect:/usuario/login.htm");
        }
         } catch (Exception e) {
              logger.error("Se produjo un error al cambiar la contraseña",e);
          }
          return null;
    }
 /**
 * *****************************************************************************
 * Nueva Contraseña
 * *****************************************************************************
     * @param tipoMaquinaId
     * @param tipoMaquina
 * @return
 * @throws IOException 
 */
    @RequestMapping ("/usuario/nuevaContrasena")
    public ModelAndView  nuevaContrasena (@RequestParam String mail,@RequestParam String nuevaContrasena)   
                                    throws IOException{
        
        logger.info("Ingrese su e-mail para cambiar la contraseña");
                
              try{
            //utilizar para cambiar la contraseña
            Session s = HibernateUtil.getSessionFactory().openSession();
            Criteria c = s.createCriteria(Usuario.class);
            c.add(Restrictions.eq("email", mail));
            List<Usuario> l = c.list();
            if(l.isEmpty()){
                return new ModelAndView("redirect:/error/abrir_error.htm");
            }else{
               
                String clave_prov = nuevaContrasena;
                byte[] clave = clave_prov.getBytes();
                EncryptController enc = new EncryptController();
                Usuario us = l.get(0);
                us.setClave(enc.encriptado(clave));
                us.setModificadoPor(0);//modificado la contrasena por el usuario
                Calendar fecha = Calendar.getInstance();
                us.setModificadoFecha(fecha.getTime());//se guarda la fecha actual de modificacion
                Transaction t = s.getTransaction();
                s.beginTransaction();
                s.saveOrUpdate(us);
                t.commit();
             
                System.out.println("tiene nueva contraseña");
            }             
        }catch(Exception e){
            System.out.println("hubo un error al cambiar la contraseña");
            throw new RuntimeException(e);
            
        }
       return new ModelAndView("redirect:/usuario/login.htm");
    }    
/**
 * *****************************************************************************
 * Recupera la contraseña.
 * *****************************************************************************
 * Metodo aun si desarrollo.
 * *****************************************************************************
 * @return
 * @throws IOException 
 */
    /*implemento carina */
    
    @RequestMapping  ("/usuario/recuperarContra")
    public ModelAndView   recuperar  ()throws IOException{
        logger.info("Ingrese su e-mail para enviarle la contraseña");
        ModelAndView m = new ModelAndView("/usuario/recuperarContra");
        return m;
    } 
    
/**
 * *****************************************************************************
 * Envia mail con contraseña.
 * *****************************************************************************
     * @param tipoMaquinaId
 * @return
 * @throws IOException 
 */
    @RequestMapping ("/usuario/enviarMail")
    public ModelAndView  enviarMail (
                                    @RequestParam String enviarMail)
                                    throws IOException, MessagingException{
        logger.info("Ingrese su e-mail para enviarle la contraseña");
                
        final String username="cepravii@gmail.com";//correo de la empresa
        final String password="epncepra";//clave del correo 
        
        Properties props= new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable","true");
        props.put("mail.smtp.host","smtp.gmail.com");
        props.put("mail.smtp.port", 587);
        
            javax.mail.Session session=javax.mail.Session.getInstance(props,new javax.mail.Authenticator() {
                protected PasswordAuthentication
                        getPasswordAuthentication(){
                            return new PasswordAuthentication(username,password);
                        }       
            });
        try{
            Session s = HibernateUtil.getSessionFactory().openSession();
            Criteria c = s.createCriteria(Usuario.class);
//            Criteria c1=s.createCriteria(Rol.class);
            
            c.add(Restrictions.eq("email", enviarMail));
            List<Usuario> l = c.list();
            if(l.isEmpty()){
                return new ModelAndView("redirect:/error/abrir_error.htm");
            }else{
                 //diferentes claves para cada usuario
                Random rand = new Random();
                int x = rand.nextInt(1000);
                String clave_prov = "cepra"+Integer.toString(x);//creacion de una clave
                byte[] clave = clave_prov.getBytes();
                EncryptController enc = new EncryptController();
                Usuario us = l.get(0);
                us.setClave(enc.encriptado(clave));
                fechaInicio=calendario.getTime();//guarda la fecha actual en la qu envia el msm
                us.setModificadoFecha(fechaInicio);//asigna la fecha actual al usuario
                us.setModificadoPor(1);//modificado la contraseña por el sistema
                
                Transaction t = s.getTransaction();
                s.beginTransaction();
                s.saveOrUpdate(us);
                t.commit();
                
                Message message = new MimeMessage(session);
                message.setFrom(new InternetAddress("cepravii@gmail.com"));
                message.setRecipients(Message.RecipientType.TO,InternetAddress.parse(enviarMail));
                message.setSubject("Clave temporal OpenCNC");
                message.setText("Tiene 24 horas para usar esta clave es : "+clave_prov);
                Transport.send(message);
                System.out.println("la fecha que se envio el msm es: "+fechaInicio);
                System.out.println("mensaje enviado");
                
            }             
        }catch(MessagingException e){
            System.out.println("hubo un error");
            throw new RuntimeException(e);
            
        }
       return new ModelAndView("redirect:/usuario/login.htm");
    } 

/**
 * *****************************************************************************
 * Hace el Logout.
 * *****************************************************************************
 * Metodo aun le fata desarrollo para algunas vistas, solo implementado para el
 * index.jsp
 * *****************************************************************************
 * @param request
 * @param response
 * @return
 * @throws IOException 
 */
    @RequestMapping  ("/usuario/logout")
    public ModelAndView   logout  (HttpServletRequest request, 
                                    HttpServletResponse response)
                                    throws IOException{
        try{
            logger.info("Se cerrara sesion");
        HttpSession sess =  request.getSession();
        if (sess != null){
            sess.removeAttribute("usuario");
    
            return new ModelAndView("redirect:/usuario/login.htm");
        }else{
            return new ModelAndView("redirect:/usuario/login.htm");
        }
        }catch(Exception e) {
              logger.error("Se produjo un error al Cerrar sesion",e);
        }
        return null;
        }
    
    
}
