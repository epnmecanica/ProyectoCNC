/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.controllers;

import com.opencnc.datamodel.MyData;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author root
 */
@Controller
@RequestMapping(value = "/MyData")
public class RESTController {
    
        @RequestMapping(value="/{time}", method = RequestMethod.GET)
	public @ResponseBody MyData getMyData(
			@PathVariable long time) {
		
		return new MyData(time, "REST GET Call !!!");
	} 
	
	@RequestMapping(method = RequestMethod.PUT)
	public @ResponseBody MyData putMyData(
			@RequestBody MyData md) {
		
		return md;
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody MyData postMyData() {
		return new MyData(
			System.currentTimeMillis(), "REST POST Call !!!");
	}

	@RequestMapping(value="/{time}", method = RequestMethod.DELETE)
	public @ResponseBody MyData deleteMyData(
			@PathVariable long time) {
		
		return new MyData(time, "REST DELETE Call !!!");
	}

}
