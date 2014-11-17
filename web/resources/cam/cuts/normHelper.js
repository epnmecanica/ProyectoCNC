/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function normVect (cut){
      this.cut = cut;
      this.aux = [];
      if(this.cut[0].radius){
          this.aux.push(this.cut[0].points[0]);
          this.aux[0].rad =  this.cut[0].radius;
      }else{
          this.aux.push(this.cut[0].points[0]);
      }
      
    
      for(var i = 0 ; i < this.cut.length ; i++){
          if(this.cut[i].radius){
                this.aux.push(this.cut[i].points[1]);
                this.aux[i + 1].rad =  this.cut[i].radius;
            }else{
                this.aux.push(this.cut[i].points[1]);
            }
               //this.aux.push(this.cut[i].points[1]);        
      }
      
      if (min(this.aux) != 0){
          this.aux.reverse();
          
      }
      //console.log(this.aux);
          return this.aux;
  }
  
  function min (auxi){
      this.auxi = auxi;

      var dis1 = (Math.sqrt(Math.pow(this.auxi[0][0] - 0, 2) + Math.pow(this.auxi[0][1]-0, 2)));
      var dis2 = (Math.sqrt(Math.pow(this.auxi[this.auxi.length - 1][0] - 0, 2) + Math.pow(this.auxi[this.auxi.length - 1][1]-0, 2)));
      var aus = (dis1 < dis2) ? this.auxi.length : 0; 
      return aus;
  }


