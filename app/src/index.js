import './style.scss';
import AWSIoTData from 'aws-iot-device-sdk';

AWS.config.region = 'ap-northeast-1';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-northeast-1:bba9e20b-8a60-45f1-a721-************', // Fix me
});

const mqttClient = AWSIoTData.device({
    region: AWS.config.region,
    host: '**************.iot.ap-northeast-1.amazonaws.com', // Fix me
    clientId: 'mqtt-client-' + (Math.floor((Math.random() * 100000) + 1)),
    protocol: 'wss',
    maximumReconnectTimeMs: 8000,
    debug: true,
    accessKeyId: '',
    secretKey: '',
    sessionToken: ''
});

const cognitoIdentity = new AWS.CognitoIdentity();
AWS.config.credentials.get(function (err, data) {
    if (!err) {
        console.log('retrieved identity: ' + AWS.config.credentials.identityId);
        var params = {
            IdentityId: AWS.config.credentials.identityId
        };

        cognitoIdentity.getCredentialsForIdentity(params, function (err, data) {
            if (!err) {
                mqttClient.updateWebSocketCredentials(
                    data.Credentials.AccessKeyId,
                    data.Credentials.SecretKey,
                    data.Credentials.SessionToken
                );
            } else {
                console.log('error retrieving credentials: ' + err);
                alert('error retrieving credentials: ' + err);
            }
        });
    } else {
        console.log('error retrieving identity:' + err);
        alert('error retrieving identity: ' + err);
    }
});

Vue.component('score-tile', {
    data() {
        return {
            style: {
                opacity: 1,
                transform: 'scale(1)',
            }
        };
    },
    props: {
        team: Object
    },
    watch: {
        'team.blink': function () {
            this.$data.style.opacity = 0.5;
            setTimeout(() => {
                this.$data.style.opacity = 1;
                this.$emit("blinked", this.team);
            }, 150);
        },
        'team.isOpen': function () {
            console.log(this);
            this.$data.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.$data.style.transform = 'scale(1)';
                this.$emit("blinked", this.team);
            }, 250);
        }
    },
    template:
        `<div class="container" :style="style">
            <span class="team">{{ team.name }}</span>
            <transition name="blink">
                <span class="score" v-show="team.isOpen">{{ team.score }}</span>
            </transition>
        </div>`,
});

const topicName = 'score-board';
Vue.component('score-board', {
    data() {
        return {
            teams: [
                { id: "id-1", name: "チーム1", score: 0, isOpen: false, blink: false},
                { id: "id-2", name: "チーム2", score: 0, isOpen: false, blink: false},
                { id: "id-3", name: "チーム3", score: 0, isOpen: false, blink: false},
                { id: "id-4", name: "チーム4", score: 0, isOpen: false, blink: false},
                { id: "id-5", name: "チーム5", score: 0, isOpen: false, blink: false},
                { id: "id-6", name: "チーム6", score: 0, isOpen: false, blink: false},
                { id: "id-7", name: "チーム7", score: 0, isOpen: false, blink: false},
                { id: "id-8", name: "チーム8", score: 0, isOpen: false, blink: false},
                { id: "id-9", name: "チーム9", score: 0, isOpen: false, blink: false},
                { id: "id-10", name: "チーム10", score: 0, isOpen: false, blink: false},
            ],
            isOpen: false
        }
    },
    computed: {
        sortedTeams() {
            var teamCopy = [];
            for (var i = 0; i < this.$data.teams.length; i++) {
                teamCopy.push(this.$data.teams[i]);
            }
            
            return teamCopy.sort((a, b) => {
                if (a.score > b.score) return 1;
                if (a.score < b.score) return -1;
                if (a.id > b.id) return 1;
                if (a.id < b.id) return -1;
                return 0;
            });
        }
    },
    created() {
        mqttClient.on('connect', () => {
            console.log("connected");
            mqttClient.subscribe(topicName);
        });
        mqttClient.on('reconnect', () => {
            console.log("reconnected");
        });
        mqttClient.on('message', (topic, payload) => {
            console.log(`${topic}: ${payload.toString()}`);
            var message = JSON.parse(payload.toString());
            var score = message.score.N;
            var id = message.id.S;

            var team = this.$data.teams.find((v) => v.id === id);
            if (team != null) {
                team.score = Number.parseInt(score);
                team.blink = true;
            }
        });
    },
    methods: {
        buttonClicked(event) {
            var closedTeam = this.sortedTeams.find((v) => !v.isOpen)
            if (closedTeam != null) {
                closedTeam.isOpen = true;
            }
        },
        blinked(blinkedTeam) {
            var team = this.$data.teams.find((v) => v.id === blinkedTeam.id);
            if (team != null) {
                team.blink = false;
            }
        }
    },
    template: `<div class="main-content">
        <div class="top">
            <span class="title">IoTボタン アイディアソン</span>
            <button class="button" @click="buttonClicked">開票</button>
        </div>
        <div class="score-board">
            <score-tile v-for="team in teams" track-by="team.id" :team="team" @blinked="blinked"></score-tile>
        </div>
    </div>`,
});

new Vue({
    el: "#app"
});
