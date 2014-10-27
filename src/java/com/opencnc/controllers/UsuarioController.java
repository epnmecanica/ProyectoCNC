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
import java.util.Objects;
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
import javax.swing.JOptionPane;
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
 
                final String username="cepravii@gmail.com";//correo de la empresa
                final String password="epncepra";//clave del correo 
                String mensaje = "";
           
            
                Properties props= new Properties();
//           

            javax.mail.Session session=javax.mail.Session.getInstance(props,new javax.mail.Authenticator() {
                         protected PasswordAuthentication
                                 getPasswordAuthentication(){
                                     return new PasswordAuthentication(username,password);
                                 }       
            });
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
 * @param email
 * @param usuario
 * @param request
 * @param response
 * @return
 * @throws Exception 
 */
    @RequestMapping ("/usuario/guardar")
    public ModelAndView guardar (@RequestParam String email,@ModelAttribute Usuario usuario, 
                                            HttpServletRequest request, 
                                            HttpServletResponse response)
                                            throws Exception{
        
           
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable","true");
            props.put("mail.smtp.host","smtp.gmail.com");
            props.put("mail.smtp.port", 587);

                  
        byte[] clave = usuario.getClave();
        Session s = HibernateUtil.getSessionFactory().openSession();
        
        //Clase de seguridades
        SeguridadesController  sr = new SeguridadesController ();
        EncryptController enc = new EncryptController();
        ModelAndView m = new ModelAndView("/usuario/crear");
        
        
        
       
        
        // verifica las seguridades.     
        if (sr.seguridad(usuario).isPass()){
            
            usuario.setEstado("P");
            Calendar c = new GregorianCalendar();
            Date d1 = c.getTime();
            
            usuario.setCreadoFecha(d1);
// usuarios validos todos los que son creados por 0, si son 1 son invalidos
// Posterior.
            usuario.setCreadoPor(0);  
            usuario.setModificadoPor(0);//modificado la contraseña por el usuario
            // se codifica la clave
            usuario.setClave(enc.encriptado(clave));
            
            Transaction t = s.getTransaction();
            s.beginTransaction();
            s.saveOrUpdate(usuario);
            t.commit();
            
            //mensaje de bienvenida al sistema
                Message message = new MimeMessage(session);
                message.setFrom(new InternetAddress("cepravii@gmail.com"));
                message.setRecipients(Message.RecipientType.TO,InternetAddress.parse(email));//
                message.setSubject("Bienvenido OpenCNC");//el asunto del correo 
                mensaje = mensaje.concat(usuario.getNombre());
                message.setText(mensaje);// mensaje 
                Transport.send(message); 
                System.out.println("mensaje enviado");   
            
        }else{
            
            m.addObject("error", sr.seguridad(usuario).getThisArrayList());
            return m;
        }
        logger.info("Guarda un nuevo usuario");
        //return lista(request, response);
        return login();
    
     }
    
    /**
 * *****************************************************************************
 * Recoge la informacion del formulario de creacion de usuario y valida que ç
 * tenga contenido y los guarda en la base de datos.
 * *****************************************************************************
 * @param nombre
 * @param apellido
 * @param organizacion
 * @param mail
 * @param request
 * @param response
 * @return
 * @throws Exception 
 */
    @RequestMapping ("/usuario/guardar1")
    public ModelAndView guardar1 (@RequestParam String mail,@RequestParam String nombre, 
                @RequestParam String apellido,@RequestParam String organizacion,HttpServletRequest request, 
                                            HttpServletResponse response )
                                            throws Exception{
        
           
            Session s = HibernateUtil.getSessionFactory().openSession();
            Criteria c = s.createCriteria(Usuario.class);
            List<Usuario> l = c.list();
            String validcaracters = "@";
            Usuario us= l.get(0);
           
            if(l.isEmpty()){
                return new ModelAndView("redirect:/error/abrir_error.htm");
            }else{
            
            if(!mail.contains(validcaracters)){
             return new ModelAndView("redirect:/usuario/lista.htm");
           /* ModelAndView m1 = new ModelAndView("/usuario/editar");
            ArrayList listaError = new ArrayList( ) ;
            listaError.add("Verifica que los datos Ingresados sean Correctos");
            m1.addObject("errorId",listaError);
            return m1;*/
            } 
            else
            
              {  
                
                
                
                
            us.setEstado("P");
            Calendar cl = new GregorianCalendar();
            Date d1 = cl.getTime();
            us.setCreadoFecha(d1);
            us.setModificadoFecha(d1);
            us.setCreadoPor(0);  
            us.setModificadoPor(0);
            us.setNombre(nombre);
            us.setApellido(apellido);
            us.setOrganizacion(organizacion);
            us.setEmail(mail);
            
            Transaction t = s.getTransaction();
            s.beginTransaction();
            s.saveOrUpdate(us);
            t.commit();
            logger.info("Guarda un nuevo usuario");
            return new ModelAndView("redirect:/usuario/lista.htm");
            } 
     
          
         } 
       
     }
    
    
    
    
    
    
    
 /*   
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
            if (Objects.equals(us.getUsuarioId(), u.getUsuarioId())){
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
                                            throws IOException,MessagingException{
        
      
  
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
          
          ModelAndView m1 = new ModelAndView("/usuario/login");
          ArrayList listaError = new ArrayList( ) ;
          listaError.add("Verifica que los datos Ingresados sean Correctos");
          m1.addObject("errorId",listaError);
          //m.addObject("errorId", null);
          request.removeAttribute("usuario");
          try {
              logger.info("Debe... Inicie sesion por favor...");
              //return login();
              return m1;
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
          //
          logger.info("A ingresado al sistema con el siguiente usuario "+ul.getNombre()); 
          ul.setEstado("A");
          Transaction t = s.getTransaction();
          s.beginTransaction();
          s.saveOrUpdate(ul);
          t.commit(); 
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
                   if(diffHoras<=5)
                    {
                        props.put("mail.smtp.auth", "true");
                        props.put("mail.smtp.starttls.enable","true");
                        props.put("mail.smtp.host","smtp.gmail.com");
                        props.put("mail.smtp.port", 587);
                        
                        Message message = new MimeMessage(session);
                        message.setFrom(new InternetAddress("cepravii@gmail.com"));
                        message.setRecipients(Message.RecipientType.TO,InternetAddress.parse(ul.getEmail()));
                        message.setSubject("Informacion OpenCNC");//asunto del mensaje
                        message.setText("Estimad@ "+ ul.getNombre() + " : Le quedan "+ diffHoras+" horas "+restominutos+ " minutos para cambiar la contraseña");
                        Transport.send(message); 
                        System.out.println("la fecha que se envio el msm es: "+fechaInicio);
                        System.out.println("mensaje enviado");
                    }
                    
                    }
                    else{
                        props.put("mail.smtp.auth", "true");
                        props.put("mail.smtp.starttls.enable","true");
                        props.put("mail.smtp.host","smtp.gmail.com");
                        props.put("mail.smtp.port", 587);
                        
                        Message message = new MimeMessage(session);
                        message.setFrom(new InternetAddress("cepravii@gmail.com"));
                        message.setRecipients(Message.RecipientType.TO,InternetAddress.parse(ul.getEmail()));
                        message.setSubject("Caduco Contraseña de OpenCNC");//asunto del mensaje
                        message.setText("Estimad@ "+ ul.getNombre() +" : Caduco su Contraseña temporal.");
                        Transport.send(message); 
                        System.out.println("la fecha que se envio el msm es: "+fechaInicio);
                        System.out.println("mensaje enviado");
                        
                        return new ModelAndView("redirect:/usuario/cambiarContrasena.htm");
//                        ModelAndView m1 = new ModelAndView("redirect:/usuario/cambiarContrasena.htm");
//                        ArrayList listaError = new ArrayList( ) ;
//                        listaError.add("Caduco su Contraseña Temporal Asignada por el Sistema por favor Cambie su Contraseña");
//                        m1.addObject("errorId",listaError);
//                        return m1;
                        
                    }
            }      
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
  ******************************************************************************
 * Nueva Contraseña
 * *****************************************************************************
  * @param mail
  * @param nuevaContrasena
  * @return
  * @throws IOException 
  */
    @RequestMapping ("/usuario/nuevaContrasena")
    public ModelAndView  nuevaContrasena (@RequestParam String mail,
                                            @RequestParam String nuevaContrasena)   
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
                int x = rand.nextInt(100000);
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
                message.setText("Se ha pedido recuperar la contraseña para el usuario: " +us.getNombre()+ ", durante las próximas 24 horas usted puede usar el siguiente código de ingreso: "+clave_prov+  " ; y reestablecer su contraseña. No olvide que en caso de expirar su código, Usted puede volver a solicitar un código de ingreso.");
                Transport.send(message); 
                System.out.println("la fecha que se envio el msm es: "+fechaInicio);
                System.out.println("mensaje enviado");
                
            }             
        }catch(MessagingException e){
            System.out.println("hubo un error al enviar el mensaje");
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
 * @param usuario
 * @return
 * @throws IOException 
 */
    @RequestMapping  ("/usuario/logout")
    public ModelAndView   logout  (@ModelAttribute Usuario usuario,HttpServletRequest request, 
                                    HttpServletResponse response)
                                    throws IOException{
        try{
            logger.info("Se cerrara sesion");
        
        Session s = HibernateUtil.getSessionFactory().openSession();
        Criteria c = s.createCriteria(Usuario.class);
        HttpSession sess =  request.getSession();
        List<Usuario> l = c.list();
        Usuario ul = l.get(0);
        if (sess != null){
            
            ul.setEstado("P");
            Transaction t = s.getTransaction();
            s.beginTransaction();
            s.saveOrUpdate(ul);
            t.commit();
            
            //sess.removeAttribute("usuario");
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
