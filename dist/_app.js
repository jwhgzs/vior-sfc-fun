
    import Record from 'record'
    
    export default {
        vars() {
            return {
                scramble: this.funcs.genScramble(),
                pressing: false,
                status: false,
                start: 0,
                timer: 0,
                interval: null,
                records: [],
                records_reversed() {
                    return Object.assign([], this.vars.records).reverse()
                },
                
                computed_mean() {
                    let sum = 0
                    for (let k in this.vars.records) {
                        let v = this.vars.records[k]
                        sum += parseFloat(v.record)
                    }
                    return sum / this.vars.records.length
                },
                computed_ao5() {
                    return this.funcs.compute_xox(0, 5)
                },
                computed_ao12() {
                    return this.funcs.compute_xox(0, 12)
                },
                computed_ao100() {
                    return this.funcs.compute_xox(0, 100)
                },
                computed_mo3() {
                    return this.funcs.compute_xox(1, 3)
                },
                computed_best() {
                    let best = 0
                    for (let k in this.vars.records) {
                        let v = parseFloat(this.vars.records[k].record)
                        if (! best || best > v)
                            best = v
                    }
                    return best
                }
            }
        },
        funcs: {
            genScramble(len = 20) {
                let lets = 'URFDLB', res = ''
                let tmp = ''
                
                let doit = () => {
                    let srand = Math.floor(Math.random() * 3),
                        suffix = ''
                    switch (srand) {
                        case 1:
                            suffix = '\''
                            break
                        case 2:
                            suffix = '2'
                            break
                    }
                    return lets[Math.floor(Math.random() * lets.length)] + suffix
                }
                
                for (let k = 0; k < len; k ++) {
                    let v = doit()
                    while (v.substr(0, 1) == tmp.substr(0, 1))
                        v = doit()
                    res += ' ' + v
                    tmp = v
                }
                return res.replace(/^\s/, '')
            },
            compute_xox(y, x) {
                let arr = this.vars.records_reversed.slice(0, x)
                if (arr.length != x)
                    return null
                let sum = 0, max = 0, min = 0
                for (let k in arr) {
                    let v = parseFloat(arr[k].record)
                    sum += v
                    if (! max || max < v)
                        max = v
                    else if (! min || min > v)
                        min = v
                }
                if (max && min && y === 0)
                    sum -= (max + min)
                else if (y !== 1)
                    return null
                return sum / (y === 0 ? x - 2 : x)
            },
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
                        time: (new Date()).toLocaleString(),
                        scramble: this.vars.scramble
                    })
                    this.vars.timer = 0
                    this.vars.status = false
                    this.vars.start = 0
                    this.vars.scramble = this.funcs.genScramble()
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
                    if (e.keyCode == 17) {
                        _this.vars.pressing = true
                    }
                }
                document.onkeyup = (e) => {
                    if (e.keyCode == 17) {
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
