var app = new Vue({
    el: '#app',
    data() {
        return {
            projects: [],
            createNew: {
                name: "",
                repo: "",
                desc: ""
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
                projDesc: this.createNew.desc
            }).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
})