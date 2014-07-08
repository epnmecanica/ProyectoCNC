/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.opencnc.beans;

/**
 *
 * @author root
 */
public class GetJson {
    private long milliTime = 0;
	
	public GetJson() { }
	
	public GetJson(long init) {
		this.milliTime = init;
	}

    /**
     * @return the milliTime
     */
    public long getMilliTime() {
        return milliTime;
    }

    /**
     * @param milliTime the milliTime to set
     */
    public void setMilliTime(long milliTime) {
        this.milliTime = milliTime;
    }

	
}
