import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'App',
})
export default class App extends Vue {
  
  render(){
    return (
      <div id="app">
        <router-view></router-view>
      </div>
    )
  }
}
