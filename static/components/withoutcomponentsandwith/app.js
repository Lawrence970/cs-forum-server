
Vue.component('blog-post',{
    props:['post'],
    template:`
    <div class="blog-post"> 
        <h3> {{ post.title }}</h3>
        <div v-html="post.content"></div>
    </div>
    `
})
new Vue({
    el:'#app',
    data:{
        posts:[
            {
                id:1,
                title:'this title'
            },
            {
                id:2,
                title:'this title2'
            },  {
                id:3,
                title:'this title3'
            }
        ]
    }
})
// new Vue ({
//     el:'#app'

// })
