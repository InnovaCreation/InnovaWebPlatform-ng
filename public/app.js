Vue.component('project', {
    data: function () {
        return {}
    },
    props: ['proj', 'id'],
    template: `
        <div class="uk-card uk-card-body uk-card-default uk-margin">
            <h3> {{ proj.projName }}</h3>
            {{ proj.projRepo }}
            {{ proj.projDesc }}
            <ul>
                <li v-for="subid in proj.subProjects">Subproject: {{ subid }}</li>
            </ul>
            <p>{{ id }}</p>
        </div>
    `
})

var app = new Vue({
    el: '#app',
    data() {
        return {
            projects: [],
            createNew: {
                name: "",
                repo: "",
                desc: "",
                UUID: ""
            }
        }
    },
    mounted() {
        axios
            .get('/api/getProjects')
            .then(response => {
                this.projects = response.data
            })
    },
    methods: {
        createProject: function(event) {
            axios.post('/api/createProject', {
                projName: this.createNew.name,
                projRepo: this.createNew.repo,
                projDesc: this.createNew.desc,
                projParent: this.createNew.UUID
            }).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
        },
        modifyProject: function (event) {
            axios.post('/api/modifyProject', {
                projName: this.createNew.name,
                projRepo: this.createNew.repo,
                projDesc: this.createNew.desc,
                projUUID: this.createNew.UUID
            }).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
})