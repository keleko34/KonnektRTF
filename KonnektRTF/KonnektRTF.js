define([],function(){
  function CreaKonnektRTF()
  {
    var _base = '',
        _onChange = function(){};

    function KonnektRTF(name)
    {
      if(name.length === 0) name = _base;

      document.body.innerHTML = "<"+name+"></"+name+">";
      _onChange(name);
      return KonnektRTF;
    }

    KonnektRTF.base = function(v)
    {
      if(v === undefined) return _base;
      _base = (typeof v === 'string' ? v : _base);
      return KonnektRTF;
    }

    KonnektRTF.onChange = function(v)
    {
      if(v === undefined) return _onChange;
      _onChange = (typeof v === 'function' ? v : _onChange);
      return KonnektRTF;
    }

    KonnektRTF.watch = function(v)
    {
      if(v)
      {
        window.onhashchange = function(){
          KonnektRTF(window.location.hash.replace('#',''));
        }
      }
      else
      {
        window.onhashchange = null;
      }
      return KonnektRTF;
    }

    return KonnektRTF;
  }
  return CreaKonnektRTF;
});
