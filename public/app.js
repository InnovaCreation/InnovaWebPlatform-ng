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
            <p>{{ id }}</p>
            <project v-for="(p, i) in proj.subProjects" v-bind:proj="p" v-bind:id="i"></project>
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
                parent: ""
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
                projParent: this.createNew.parent
            }).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
})