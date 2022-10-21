
        import origin from './_app.js'
        origin.html = ` <center> <h1 :style="{ color: pressing ? 'blue' : 'black' }">{{ timer.toFixed(2) }}</h1> <h3>Press space to start or stop the timer.</h3> <hr/> <h3>Records:</h3> <record-item $if="records.length" $for="(k, v) in records_reversed" :record="v.record" :time="v.time"> <button @click="del(records.length - 1 - k)">del</button> </record-item> <span $else>None.</span> </center>`
        export default origin
    