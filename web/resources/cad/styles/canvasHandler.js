/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function WindowHandler(){
     
       this.compensacionWidth = 500;
       this.compensacionHeight = 220;
       this.width;
       this.height;
       this.beforeWidth = 0;
       this.beforeHeight = 0;
};

WindowHandler.prototype.init = function (){
    if( typeof( window.innerWidth ) == 'number' ) {
          //No-IE
          this.width = window.innerWidth - this.compensacionWidth;
          this.height = window.innerHeight - this.compensacionHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
          //IE 6+
          this.width = document.documentElement.clientWidth - this.compensacionWidth;
          this.height = document.documentElement.clientHeight - this.compensacionHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
          //IE 4 compatible
          this.width = document.body.clientWidth - this.compensacionWidth;
          this.height = document.body.clientHeight - this.compensacionHeight;
        }
        if(this.width !== this.beforeWidth){
            this.beforeWidth = this.width;
            //console.log('w ' + this.width);
        }
        if(this.height !== this.beforeHeight){
            this.beforeHeight = this.height;
            //console.log('h ' + this.height);
        }
        
        
};

WindowHandler.prototype.getWidth = function (){
    return this.width;
};

WindowHandler.prototype.getHeight = function (){
    return this.height;
};



