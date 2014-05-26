/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.log;

import java.io.File;
import java.io.IOException;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import org.apache.log4j.BasicConfigurator;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

@WebServlet(name = "CargaLog4j", urlPatterns = {"/cargalog4j"},
        initParams = {@WebInitParam(name = "log4jPropertiesFile",
        value = "/WEB-INF/classes/log4j.properties")}, loadOnStartup = 1)
public class CargadorLog4j extends HttpServlet {
    private static final Logger logger = Logger.getLogger(CargadorLog4j.class.getName());
    
     @Override
    public void init(ServletConfig config) throws ServletException{
        
        // Obtiene el parametro de inicio
        String log4jFile = config.getInitParameter("log4jPropertiesFile");
       
        // Obtiene la ruta real del archivo (ruta absoluta)
        ServletContext context = config.getServletContext();
        log4jFile = context.getRealPath(log4jFile);
        
        // Carga el log4j.properties si existe y sino carga BasicConfigurator
        if (new File(log4jFile).isFile()) {
            PropertyConfigurator.configure(log4jFile);
            
        }
        else {
            BasicConfigurator.configure();
        }
        super.init(config);
     
        logger.info("Se ejecuta e inicializa con exito Log4j");
    }
}
