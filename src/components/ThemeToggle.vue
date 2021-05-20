
<!--

ThemeToggle.vue

A row of buttons for setting the theme globally, which recomputes the content in Triangles
The active button is centered.

The nuclei appear above and below the button row

-->


<template>
  <!-- div for top nucleus name -->
  <div class="nucleusName top">
    {{ nucleusText[0] }}
  </div>
  <!-- buttons -->
  <button class="btn" id="speaker" v-on:click="changeTheme('speaker')" disabled>Speaker</button>
  <button class="btn" id="family" v-on:click="changeTheme('family')">Family</button>
  <button class="btn" id="belonging" v-on:click="changeTheme('belonging')">Belonging</button>
  <button class="btn" id="heritage" v-on:click="changeTheme('heritage')">Heritage</button>
  <div class="nucleusName bottom">
    {{ nucleusText[1] }}
  </div>
  <!-- div for bottom nucleus name -->

</template>

<script>
import '@fontsource/roboto';
export default {
  name: "ThemeToggle",
  data() {
    return {
        currentTheme: "speaker",
    }
  },
  components: {
  },
  provide() {
    return {
      currentTheme: this.getTheme
    }
  },
  inject: ['themes'],
  computed: {
    nucleusText() {
      let nuclei = this.themes[this.currentTheme]
      return [nuclei[0].name, nuclei[1].name]
    },

    getTheme() {
      return this.currentTheme
    }
  },
  methods: {
    changeTheme(newTheme) {
      this.currentTheme = newTheme
      this.$parent.currentTheme = newTheme

      let els = document.getElementsByTagName("button")
      els.forEach(function(el) {
        el.removeAttribute("disabled")
      });
      document.getElementById(newTheme).setAttribute("disabled", "")

    }
  }
}
</script>

<style scoped>
.btn {
  position: relative;

  display: inline-block;
  margin: 15px;
  padding: 10px 20px 10px ;

  overflow: hidden;

  border-width: 0;
  outline: none;
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .6);

  background-color: darkslateblue;
  color: white;

  transition: background-color .3s;

  font-size: 11pt;
  font-weight: bold ;
}

.btn > * {
  position: relative;
}

.btn span {
  display: block;
  padding: 12px 24px;
}

.nucleusName {
  font-size: 14pt;
  font-weight: bold;
}

.top {
  color: blue;
}

.bottom {
  color: blueviolet;
}

button[disabled] {
  background-color: white;
  box-shadow: 0 0px 0px;
  border: 1px navy solid;
  color: navy;
}

.bottom {
  margin-bottom: 10px;
}

.top {
  margin-top: 10px;
}
</style>