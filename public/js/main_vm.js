// imports always go first - if we're importing anything
import ChatMessage from "./modules/ChatMessage.js";


const socket = io();


// the packet is whatever data we send through with the connect event
// from the server

// this is data destructuring. Go look it up on MDN https://developer.mozilla.org/en-US/
function setUserId({sID}) {
    //debugger;
    console.log(sID);
    vm.socketID = sID;
}

function showDisconnectMessage() {
    console.log('gee look at that...a user disconnected');
}

function appendMessage(message) {
    vm.messages.push(message);
}

// //emoji picker set up with vue
Vue.use(EmojiPicker)

const vm = new Vue({
    el:'#app',
    data: {
        socketID: "",
        message: "",
        nickname: "",
        messages: [],

    },


    methods: {

        // emit a message event to the server so that it
        // this will send this to anyone who's connected to the application
        dispatchMessage() {
            console.log('handle emit message');

            // the double pipe || means "or" and is an operator
            socket.emit('chat_message', { 
                content: this.message,
                name: this.nickname || "anonymous"
            }),

            this.message = "";
            
        },

        //adding methods that add emojis to messages ( they are appended to the messages )
        append(emoji) {
            this.message += emoji
        },

        //adding directives
        directives: {
                focus: {
                  inserted(el) {
                    el.focus()
                  },
                },
              },
    },

    mounted: function() {
        console.log('vue is done mounting');
    },

    components: {
        newmessage: ChatMessage
    }
}).$mount("#app");


socket.addEventListener('connected', setUserId);
socket.addEventListener('disconnect', showDisconnectMessage);
socket.addEventListener('new_message', appendMessage);
