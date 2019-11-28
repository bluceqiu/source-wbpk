class Hook{
    constructor(args){
        this._args = args;
        this.taps = [];
    }
    tap(options, cb){
        options = {name: options}
        options.cb = cb;
        this._insert(options);
    }
    _insert(item){
        this.taps[this.taps.length] = item;
    }
    call(...args){
        let callMethod = this._createCall();
        return callMethod.apply(this, args); // ?this  
    }
    _createCall(){
        return this.compile({
            taps: this.taps,
            _args: this._args
        })
    }
}

module.exports = Hook