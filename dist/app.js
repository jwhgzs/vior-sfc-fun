
        import origin from './_app.js'
        origin.html = ` <style $ownstyle>
        ul {
            padding-left: 0;
            height: 30rem;
            overflow-y: scroll;
            border: 1px solid gray;
        }
    </style> <center> <span style="color: gray" @click="scramble = genScramble()">Scramble: {{ scramble }}</span> <h1 :style="{ color: pressing ? 'blue' : 'black' }">{{ timer.toFixed(2) }}</h1> <h3>Press \`Space\` to start or stop the timer.</h3> <div $if="records.length"> <ul> <record-item $for="(k, v) in records_reversed" :record="v.record" :time="v.time" :scramble="v.scramble"> <button @click="del(records.length - 1 - k)">delete</button> </record-item> </ul> <div><strong>Statistics:</strong></div> <div>Count: {{ records.length }}</div> <div $if="computed_best">Best: {{ computed_best.toFixed(2) }}</div> <div $if="computed_ao5">Ao 5: {{ computed_ao5.toFixed(2) }}</div> <div $if="computed_ao12">Ao 12: {{ computed_ao12.toFixed(2) }}</div> <div $if="computed_ao100">Ao 100: {{ computed_ao100.toFixed(2) }}</div> <br/> <div $if="computed_mean">Mean: {{ computed_mean.toFixed(2) }}</div> <div $if="computed_mo3">Mo 3: {{ computed_mo3.toFixed(2) }}</div> </div> <span $else>Empty records.</span> </center> `
        export default origin
    