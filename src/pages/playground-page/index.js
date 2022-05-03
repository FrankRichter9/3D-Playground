import Vue from 'vue'
import Component from 'vue-class-component'
import { Canvas3d } from '../../components'

@Component({
    components: {
        Canvas3d
    }
})
export class PlaygroundPage extends Vue {
  render () {
    return (
        <Canvas-3d />
    )
  }
}
