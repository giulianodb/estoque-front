<template>
    <b-card header="Tecnologias Base" class="mb-2">
      <b-row >
        <b-col sm="12" md="4" lg="3" xl="2" class="no-borders base-list" v-for="bt in items" :key="bt.name">
            <a class="brand" :href="bt.href" target="_blank">
                <img class="brand-icon" :src="getIcon(bt.icon)" />
                <div class="align-items-center">
                <div class="text-bold text-center"> {{bt.name}} </div>
                <div class="text-center"> {{bt.href}} </div>
                </div>
            </a>

        </b-col>
      </b-row>
    </b-card>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { name: 'Node.js', href: 'https://vuejs.org/', icon: 'brand-nodejs.svg' },
        { name: 'Vue.js', href: 'https://vuejs.org/', icon: 'brand-vuejs.svg' },
        { name: 'Babel', href: 'https://babeljs.io/', icon: 'brand-babel.svg' },
        { name: 'webpack', href: 'https://webpack.js.org', icon: 'brand-webpack.svg' },
        { name: 'ESLint', href: 'https://eslint.org/', icon: 'brand-eslint.svg' },
        { name: 'Bootstrap', href: 'https://getbootstrap.com/', icon: 'brand-bootstrap.svg' },
        { name: 'BootstrapVue', href: 'https://bootstrap-vue.js.org', icon: 'brand-bootstrap-vue.svg' },
        { name: 'Sass', href: 'https://sass-lang.com', icon: 'brand-sass.svg' },
        { name: 'Font Awesome', href: 'https://fontawesome.com/', icon: 'brand-fontawesome.svg' },
        { name: 'Git', href: 'https://git-scm.com/', icon: 'brand-git.svg' },
        { name: 'Gitlab', href: 'https://gitlab.com/', icon: 'brand-gitlab.svg' },
        { name: 'npm', href: 'https://www.npmjs.com', icon: 'brand-npm.svg' }
      ]
    }
  },
  methods: {
    getIcon (fileName) {
      return require(`@/assets/images/brands/${fileName}`)
    }
  }
}
</script>

<style scoped>
.base-list {
    list-style: none;
}

a.brand{
    color: $body-color;
}
</style>
