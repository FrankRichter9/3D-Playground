import Vue from 'vue'
import { Canvas3d } from './components'
import Component from 'vue-class-component'

@Component({
  name: 'App',
  components: {
    Canvas3d
  }
})
export default class App extends Vue {
  
  render(){
    return (
      <div id="app">
        <Canvas-3d />
      </div>
    )
  }
}
