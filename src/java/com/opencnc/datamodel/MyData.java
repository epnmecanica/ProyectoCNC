/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.datamodel;

/**
 *
 * @author root
 */
public class MyData {
    
	private long time = 0;
	private String message = "";
	
	public MyData() { }
	
	public MyData(long time, String message) {
		this.time = time;
        this.message = message;
	}

	public long getTime() {
		return time;
	}

	public void setTime(long time) {
		this.time = time;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
}
