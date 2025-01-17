<template>
  <div class="container">
    <div class="app">
      <h3>绘谜扫雷</h3>
      <ul class="toolbar">
        <li class="game" tabindex="1" :class="{open:menu.game}" @click="menu.game=!menu.game" @blur="menu.game=false">
          <span>游戏</span>
          <div class="cancel" />
          <div class="menu">
            <ul>
              <li v-for="item of levels" :key="item.name" :class="{checked:level.name===item.name}" @click="changeLevel(item)">
                <span class="check">✔</span> {{ item.name }}
              </li>
              <hr>
              <li :class="{checked:qmark}" @click="qmark=!qmark">
                <span class="check">✔</span> 显示问号
              </li>
            </ul>
          </div>
        </li>
        <li class="help"><a href="https://github.com/enazo/enazo-minesweeper" target="_blank">Github</a></li>
      </ul>
      <minesweeper :level="level" :qmark="qmark" @dead="playDead"/>
      <div class="dead-gif" v-show="showDead" :style="explosionPos">
        <div ref="dead" class="dead-gif-sprite"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Minesweeper from './Minesweeper/Minesweeper.vue'

export default {
  name: 'App',
  components: { Minesweeper },
  // mixins:[simpleAuthMixin],
  data () {
    return {
      levels: [
        { name: '初级', size: [9, 9], mineTotal: 10 },
        { name: '中级', size: [16, 16], mineTotal: 40 },
        { name: '高级', size: [16, 30], mineTotal: 99 }
      ],
      qmark: false,
      level: { name: '初级', size: [9, 9], mineTotal: 10 },
      menu: { game: false },
      showDead: false,
    }
  },
  created() {
    window.vm = this;
  },
  computed: {
    isMenuOpen () { return !Object.values(this.menu).every(x => !x) },
    explosionPos() {
      const [sizeX, sizeY] = this.level.size;
      const scale = 1.5 * sizeY / 9;
      return {
        left: (sizeX * 10 - 100) + 'px',
        // top: (50 + sizeY * 10) + 'px',
        transform: "scale(" + scale + ')',
      }
    }
  },
  watch: {
    isMenuOpen (v) { this.$emit('menu', v) }
  },
  methods: {
    changeLevel (item) {
      this.level = item
      this.$emit('changeLevel', item)
    },
    playDead() {
      this.showDead = true;
      const el = this.$refs.dead;
      el.style.animationPlayState = 'running'
      setTimeout(() => {
        this.showDead = false;
      }, 800)
    }
  }
}
</script>
<style>
body, html {
  margin: 0!important;
  padding: 0!important;
}
</style>

<style scoped>
h3 {
  margin: 0;
}
.dead-gif {
  position: absolute;
  top: 10px;
  left: -15px;
}
.dead-gif-sprite {
  background-image: url('./Minesweeper/explosion.png');
  width: 200px;
  height: 200px;
  animation: anim 1.0s steps(14) forwards;
}
@keyframes anim {
  100% { background-position: -2800px; }
}
:focus {outline: none;}
.container {
  width: 100vw;
  height: 100vh;
  background-color: silver;
  font-size: 12px;
  font-family: Tahoma,serif;
  display: flex;
}
.app {max-width: 100%;}
ul {list-style: none;}
.toolbar {
  padding: 1px 0;
  margin: 0;
  position: relative;
  user-select: none;
  flex-direction: row;
  display: flex;
}
.toolbar > li {
  display: flex;
  cursor: default;
  position: relative;
}
.toolbar > li > span,.toolbar > li > a {
  display: flex;
  align-items: center;
  border: solid 1px transparent;
  padding: 0 5px;
  height: 16px;
}

.toolbar > li > span:hover:not(.help) {border: outset 1px #eee;}
.toolbar > li.open > span {border: inset 1px #eee;}
.toolbar > li.open .cancel {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.toolbar > li:not(.open) > .menu {display: none;}
.menu {
  position: absolute;
  border: solid 1px silver;
  border-right-color: #000;
  border-bottom-color: #000;
  background-color: silver;
  top: 100%;
  left: 0;
}
.menu hr {
  border-style: inset;
  border-width: 1px;
  margin: 3px 1px 4px 1px;
}
.menu > ul {
  border: outset 1px #eee;
  width: 120px;
  padding: 1px;
}
.menu > ul > li {padding: 4px 6px;}
.menu > ul > li.custom {padding-left: 20px;}
.menu > ul > li.checked > .check {visibility: visible;}
.menu > ul > li > .check {visibility: hidden;}
.menu > ul > li:hover {
  color: white;
  background-color: #0000a8;
}
.check {font-weight: bolder;}
</style>
