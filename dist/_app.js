
    import Record from 'record'
    
    export default {
        vars() {
            return {
                pressing: false,
                status: false,
                start: 0,
                timer: 0,
                interval: null,
                records: [],
                records_reversed() {
                    return Object.assign([], this.vars.records).reverse()
                }
            }
        },
        funcs: {
            trigger() {
                if (! this.vars.status) {
                    let _this = this
                    this.vars.status = true
                    this.vars.start = Date.now()
                    this.vars.interval = setInterval(() => {
                        _this.vars.timer = (Date.now() - this.vars.start) / 1000
                    }, 10)
                } else {
                    clearInterval(this.vars.interval)
                    this.vars.interval = null
                    this.vars.records.push({
                        record: this.vars.timer.toFixed(2),
                        time: (new Date()).toLocaleString()
                    })
                    this.vars.timer = 0
                    this.vars.status = false
                    this.vars.start = 0
                }
            },
            del(i) {
                this.vars.records.splice(i, 1)
            }
        },
        hooks: {
            mounted() {
                let _this = this
                document.onkeydown = (e) => {
                    if (e.keyCode == 32) {
                        _this.vars.pressing = true
                    }
                }
                document.onkeyup = (e) => {
                    if (e.keyCode == 32) {
                        _this.vars.pressing = false
                        _this.funcs.trigger()
                    }
                }
            }
        },
        comps: {
            'record-item': Record
        }
    }
