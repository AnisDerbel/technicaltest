export  const groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};


export const convertTime = ( sec ) => {
  
  var hours = Math.floor(sec/3600);
  (hours >= 1) ? sec = sec - (hours*3600) : hours = '00';
  var min = Math.floor(sec/60);
  (min >= 1) ? sec = sec - (min*60) : min = '00';
  (sec < 1) ? sec='00' : void 0;

  (min.toString().length === 1) ? min = '0'+min : void 0;    
  (sec.toString().length === 1) ? sec = '0'+sec : void 0;    

  return hours+':'+min+':'+sec;
}
