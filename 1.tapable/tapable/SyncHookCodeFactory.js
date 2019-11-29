class SyncHookCodeFactory{
    setup(hookInstance, options){
        this.options = options;
        hookInstance._x = options.taps.map(item=>item.cb);
    }

    args(){
        return this.options._args.join(',');
    }

    header(){
        return `
            // "use strict'
            var _content;
            var _x = this._x;
        `
    }

    content(){
        let str = ''
        for(let i=0; i< this.options.taps.length; i++){
            str += `
                var _fn${i} = _x[${i}];
                _fn${i}(${this.args()})
            `
        }
        return str;
    }

    create(options){
        let res =  new Function(this.args(), this.header() + this.content());
        return res;
    }
}

module.exports  = SyncHookCodeFactory