
                import origin from './_record.js'
                origin.html = ` <style $ownstyle>
        li {
            list-style-type: none;
        }
        .bottom {
            color: gray;
            padding-bottom: 1rem;
            border-bottom: 1px solid #eee;
        }
    </style> <li> <h3>{{ record }}</h3> <div class="bottom"> <small>{{ time }}</small> <br/> <small>{{ scramble }}</small> <br/> <slot-receiver></slot-receiver> </div> </li> `
                export default origin
            