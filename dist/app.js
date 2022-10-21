
    import Record from 'record'
    
    export default { html: ' <center> <h1 :style="{ color: pressing ? \'blue\' : \'black\' }">{{ timer.toFixed(2) }}</h1> <h3>Press space to start or stop the timer.</h3> <hr/> <h3>Records:</h3> <record-item $if="records.length" $for="(k, v) in records_reversed" :record="v.record" :time="v.time"> <button @click="del(k)">del</button> </record-item> <span $else>None.</span> </center> ', vars() {
            return {
                pressing: false,
                status: false,
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
                    this.vars.interval = setInterval(() => {
                        _this.vars.timer += 0.01
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
