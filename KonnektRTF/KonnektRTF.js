define([],function(){
  function CreaKonnektRTF()
  {
    var _base = '',
        _onChange = function(){},
        _hashlisteners = [],
        _onEvent = function(e)
        {
          for(var x=0,len=_hashlisteners.length;x<len;x++)
          {
            if(!e._stopPropogation) _hashlisteners[x](e);
          }
          return e._preventDefault;
        }

    function KonnektRTF(name)
    {
      if(name.length === 0) name = _base;
      var e = new eventObject(name);
      if(!_onEvent(e))
      {
        document.body.innerHTML = "<"+e.hash+"></"+e.hash+">";
        _onChange(e.hash);
      }
      return KonnektRTF;
    }
    
    function eventObject(hash)
    {
      this.preventDefault = function(){this._preventDefault = true;}
      this.stopPropogation = function(){this._stopPropogation = true;}
      this.hash = hash;
      this.url = window.location.href;
    }

    KonnektRTF.base = function(v)
    {
      if(v === undefined) return _base;
      _base = (typeof v === 'string' ? v : _base);
      return KonnektRTF;
    }
    
    KonnektRTF.addHashListener = function(func)
    {
      _hashlisteners.push(func);
      return KonnektRTF;
    }
    
    KonnektRTF.removeHashListener = function(func)
    {
      for(var x=0,len=_hashlisteners.length;x<len;x++)
      {
        if(_hashlisteners[x].toString() === func.toString())
        {
          _hashlisteners.splice(x,1);
          break;
        }
      }
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
