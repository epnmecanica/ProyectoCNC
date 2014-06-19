<%-- 
    Document   : cad
    Created on : 19/06/2014, 08:19:34 AM
    Author     : root
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript"
            src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js">
        </script>
        <script type="text/javascript"
            src="<c:url value='/resources/js/configAjaxJason.js'/>">
        </script> 
        <title>JSP Page</title>
    </head>
    <body>
        <h1>AJAX CRUD!</h1>
        <button type="button" onclick="RestGet()">GET</button>
        <button type="button" onclick="RestPut()">PUT</button>
        <button type="button" onclick="RestPost()">POST</button>
        <button type="button" onclick="RestDelete()">DELETE</button>
    </body>
</html>
